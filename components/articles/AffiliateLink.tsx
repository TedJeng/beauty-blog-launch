"use client";

import { trackAffiliateClick } from "@/lib/analytics";

interface AffiliateLinkProps {
  href: string;
  productName: string;
  platform?: string;
  children: React.ReactNode;
  className?: string;
}

export default function AffiliateLink({
  href,
  productName,
  platform = "affiliate",
  children,
  className = "",
}: AffiliateLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={() => trackAffiliateClick(productName, platform)}
      className={`inline-flex items-center gap-1.5 px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-dark transition-colors ${className}`}
    >
      {children}
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  );
}
