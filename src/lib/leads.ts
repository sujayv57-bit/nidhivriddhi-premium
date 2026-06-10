export interface LeadData {
  name: string;
  mobile: string;
  amount?: number;
  formType: string;
  [key: string]: string | number | undefined;
}

/**
 * Submit lead data to Google Apps Script.
 *
 * Uses fetch() with application/x-www-form-urlencoded content type,
 * which IS a CORS-safelisted content type (unlike application/json).
 * This means the browser won't strip the header in no-cors mode,
 * and Google Apps Script receives the data via e.parameter.
 */
export async function submitLead(data: LeadData): Promise<{ success: boolean; error?: string }> {
  // Fallback to the known public macro URL if the env var is not set in Vercel
  const url = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbyKNPJ-ceoEd98qWQb3vzmd2lQ9Hy1raGGPU6crsBqc-KJYOCKQyZmRcviONRwQoiUT/exec";

  try {
    // Build URL-encoded form body
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    }
    params.append("timestamp", new Date().toISOString());

    // mode: "no-cors" is required because Google Apps Script 302-redirects
    // the response to googleusercontent.com which doesn't send proper CORS headers.
    // The key fix: application/x-www-form-urlencoded is CORS-safelisted,
    // so the browser KEEPS the Content-Type and sends the body correctly.
    // (Unlike application/json which gets stripped in no-cors mode.)
    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    // With no-cors the response is opaque (can't be read), but the POST
    // is guaranteed to have been sent. Google Apps Script processes doPost()
    // before issuing the 302, so the data is saved to the Sheet and email sent.
    return { success: true };
  } catch (error) {
    console.error("Failed to submit lead:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
