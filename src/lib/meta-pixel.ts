/**
 * Meta Pixel (client-side) helper.
 *
 * Provides typed wrappers around the global `fbq()` function injected by
 * the Meta Pixel base code in __root.tsx.
 *
 * Replace PIXEL_ID with your real Meta Pixel ID from Events Manager.
 */

// ──────────────────────────────────────────────
// 🔧 REPLACE THIS with your real Meta Pixel ID
// ──────────────────────────────────────────────
export const META_PIXEL_ID = "1009525434683863";

// Minimal type declaration for the fbq global
declare global {
  interface Window {
    fbq: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[] };
    _fbq: Window["fbq"];
  }
}

/**
 * Generate a unique event ID for deduplication between Pixel + CAPI.
 * Meta uses this to ensure duplicate events from both sources are counted once.
 */
export function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Returns the Meta Pixel base code <script> snippet as a string.
 * This is injected into the <head> via __root.tsx.
 */
export function getPixelBaseCode(): string {
  return `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${META_PIXEL_ID}');
    fbq('track', 'PageView');
  `;
}

/**
 * Fire a standard or custom event via the client-side Pixel.
 * Only runs in browser; no-ops silently during SSR.
 */
export function trackPixelEvent(
  eventName: string,
  params?: Record<string, unknown>,
  eventId?: string,
) {
  if (typeof window === "undefined" || !window.fbq) return;
  if (eventId) {
    window.fbq("track", eventName, params ?? {}, { eventID: eventId });
  } else {
    window.fbq("track", eventName, params ?? {});
  }
}
