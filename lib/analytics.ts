// Privacy-conscious analytics abstractions for GA4, GTM, Meta Pixel, and LinkedIn Insight Tag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    lintrk?: (action: string, data: Record<string, unknown>) => void;
  }
}

export type EventName =
  | "book_strategy_call_click"
  | "whatsapp_click"
  | "contact_form_start"
  | "contact_form_submit"
  | "service_card_click"
  | "audit_request_click"
  | "download_cv_click"
  | "linkedin_profile_click"
  | "generate_lead";

export function trackEvent(eventName: EventName, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const eventPayload = {
    page_location: window.location.href,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
    ...(params || {})
  };

  // Google Analytics 4
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, eventPayload);

    // Standard GA4 conversion mappings
    if (eventName === "contact_form_submit") {
      window.gtag("event", "generate_lead", {
        lead_source: "contact_form",
        ...eventPayload
      });
    } else if (eventName === "whatsapp_click") {
      window.gtag("event", "contact", {
        method: "whatsapp",
        ...eventPayload
      });
    }
  }

  // Google Tag Manager
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...eventPayload
    });

    if (eventName === "contact_form_submit") {
      window.dataLayer.push({
        event: "generate_lead",
        lead_source: "contact_form",
        ...eventPayload
      });
    }
  }

  // Meta Pixel
  if (typeof window.fbq === "function") {
    if (eventName === "contact_form_submit") {
      window.fbq("track", "Lead", eventPayload);
    } else if (eventName === "whatsapp_click") {
      window.fbq("track", "Contact", eventPayload);
    } else {
      window.fbq("trackCustom", eventName, eventPayload);
    }
  }

  // LinkedIn Tag
  if (typeof window.lintrk === "function") {
    window.lintrk("track", { conversion_id: eventName, ...eventPayload });
  }

  // Safe development log
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics Event]: ${eventName}`, eventPayload);
  }
}
