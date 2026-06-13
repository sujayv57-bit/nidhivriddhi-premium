/**
 * Meta Conversions API (CAPI) server function.
 *
 * Sends events to Facebook's Conversions API endpoint from the server.
 * This runs server-side only — the access token is never exposed to the browser.
 *
 * Replace the env vars in your .env file:
 *   META_PIXEL_ID=your_pixel_id
 *   META_CAPI_ACCESS_TOKEN=your_access_token
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import process from "node:process";

const capiEventSchema = z.object({
  eventName: z.string().min(1),
  eventId: z.string().min(1),
  eventTime: z.number(),
  userData: z.object({
    phone: z.string().optional(),
    firstName: z.string().optional(),
    clientIpAddress: z.string().optional(),
    clientUserAgent: z.string().optional(),
    fbc: z.string().optional(),
    fbp: z.string().optional(),
  }),
  customData: z
    .record(z.unknown())
    .optional()
    .default({}),
  eventSourceUrl: z.string().url().optional(),
});

/**
 * Hashes a value using SHA-256 (required by Meta CAPI for user data).
 * Returns lowercase hex string.
 */
async function sha256(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(value.trim().toLowerCase());

  // Use Web Crypto API (available in Node 18+, Vercel Edge, Cloudflare Workers)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Server function to send a conversion event to Meta CAPI.
 * Called from the client after a form submission or other conversion.
 */
export const sendCapiEvent = createServerFn({ method: "POST" })
  .inputValidator(capiEventSchema)
  .handler(async ({ data }) => {
    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

    if (!pixelId || !accessToken) {
      console.warn(
        "[Meta CAPI] Missing META_PIXEL_ID or META_CAPI_ACCESS_TOKEN env vars. Skipping.",
      );
      return { success: false, error: "CAPI not configured" };
    }

    // Build the user_data object with hashed PII
    const userData: Record<string, string> = {};

    if (data.userData.phone) {
      // Meta expects phone in E.164 format, hashed
      const normalized = data.userData.phone.replace(/\D/g, "");
      const e164 = normalized.startsWith("91")
        ? normalized
        : `91${normalized}`;
      userData.ph = await sha256(e164);
    }

    if (data.userData.firstName) {
      userData.fn = await sha256(data.userData.firstName);
    }

    if (data.userData.clientIpAddress) {
      userData.client_ip_address = data.userData.clientIpAddress;
    }

    if (data.userData.clientUserAgent) {
      userData.client_user_agent = data.userData.clientUserAgent;
    }

    // Pass through click ID and browser ID cookies for matching
    if (data.userData.fbc) {
      userData.fbc = data.userData.fbc;
    }
    if (data.userData.fbp) {
      userData.fbp = data.userData.fbp;
    }

    const payload = {
      data: [
        {
          event_name: data.eventName,
          event_time: data.eventTime,
          event_id: data.eventId,
          event_source_url: data.eventSourceUrl,
          action_source: "website",
          user_data: userData,
          custom_data: data.customData,
        },
      ],
    };

    const url = `https://graph.facebook.com/v22.0/${pixelId}/events?access_token=${accessToken}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("[Meta CAPI] Error:", JSON.stringify(result));
        return { success: false, error: result?.error?.message ?? "API error" };
      }

      console.info(
        `[Meta CAPI] ${data.eventName} event sent successfully (event_id: ${data.eventId})`,
      );
      return { success: true };
    } catch (error) {
      console.error("[Meta CAPI] Network error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Network error",
      };
    }
  });
