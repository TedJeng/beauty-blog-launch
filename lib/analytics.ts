"use client";

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export function pageview(url: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
}

export function trackEvent(
  action: string,
  category: string,
  label: string,
  value?: number
) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}

export function trackAffiliateClick(
  productName: string,
  platform: string,
  articleSlug?: string
) {
  trackEvent("affiliate_click", "engagement", productName);
  trackEvent("affiliate_click_platform", platform, productName);
  if (articleSlug) {
    trackEvent("affiliate_click_source", "article", articleSlug);
  }
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
