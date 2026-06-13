/**
 * Unified tracking helper that fires BOTH Meta Pixel (client) and
 * Conversions API (server) events with a shared event_id for deduplication.
 *
 * Usage:
 *   import { trackLeadEvent } from "@/lib/meta-tracking";
 *   await trackLeadEvent({ name: "Rohan", mobile: "9876543210", amount: 500000 });
 */

import { generateEventId, trackPixelEvent, META_PIXEL_ID } from "./meta-pixel";
import { sendCapiEvent } from "./api/meta-capi.functions";

/**
 * Reads Meta's _fbc (click ID) and _fbp (browser ID) cookies.
 * These help Meta match server events to ad clicks and browser sessions.
 */
function getMetaCookies(): { fbc?: string; fbp?: string } {
  if (typeof document === "undefined") return {};
  const cookies = document.cookie.split(";").reduce(
    (acc, c) => {
      const [key, val] = c.trim().split("=");
      if (key && val) acc[key] = val;
      return acc;
    },
    {} as Record<string, string>,
  );
  return {
    fbc: cookies._fbc,
    fbp: cookies._fbp,
  };
}

interface LeadTrackingData {
  name: string;
  mobile: string;
  amount?: number;
  formType?: string;
}

/**
 * Fires a "Lead" conversion event to both Meta Pixel and Conversions API.
 * The shared eventId ensures Meta deduplicates them.
 */
export async function trackLeadEvent(data: LeadTrackingData): Promise<void> {
  // Skip tracking if pixel isn't configured
  if (META_PIXEL_ID === "YOUR_PIXEL_ID_HERE") {
    console.info("[Meta Tracking] Skipping — Pixel ID not configured yet.");
    return;
  }

  const eventId = generateEventId();
  const eventTime = Math.floor(Date.now() / 1000);
  const { fbc, fbp } = getMetaCookies();

  const customData: Record<string, unknown> = {};
  if (data.amount) {
    customData.value = data.amount;
    customData.currency = "INR";
  }
  if (data.formType) {
    customData.content_name = data.formType;
  }

  // 1. Fire client-side Pixel event (instant)
  trackPixelEvent("Lead", customData, eventId);

  // 2. Fire server-side CAPI event (async, best-effort)
  try {
    await sendCapiEvent({
      data: {
        eventName: "Lead",
        eventId,
        eventTime,
        userData: {
          phone: data.mobile,
          firstName: data.name.split(" ")[0],
          clientUserAgent:
            typeof navigator !== "undefined" ? navigator.userAgent : undefined,
          fbc,
          fbp,
        },
        customData,
        eventSourceUrl:
          typeof window !== "undefined" ? window.location.href : undefined,
      },
    });
  } catch (error) {
    // CAPI failure should never block the user flow
    console.warn("[Meta CAPI] Failed to send event:", error);
  }
}

/**
 * Fires a "ViewContent" event (e.g., when someone interacts with the EMI calculator).
 * Client-side only — no CAPI needed for browse events.
 */
export function trackViewContent(contentName: string): void {
  if (META_PIXEL_ID === "YOUR_PIXEL_ID_HERE") return;
  trackPixelEvent("ViewContent", { content_name: contentName });
}
