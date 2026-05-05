"use client";

import { trackAffiliateClick } from "@/lib/analytics";

interface AffiliateLinkProps {
  href: string;
  productName: string;
  platform?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "inline" | "block";
  subtitle?: string;
}

const ExternalIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

export default function AffiliateLink({
  href,
  productName,
  platform = "affiliate",
  children,
  className = "",
  variant = "inline",
  subtitle,
}: AffiliateLinkProps) {
  const onClick = () => trackAffiliateClick(productName, platform);

  if (variant === "block") {
    return (
      <span className="not-prose block w-full sm:max-w-md sm:mx-auto my-6">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={onClick}
          className={`group flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-accent text-white rounded-xl text-base font-semibold shadow-sm hover:bg-accent-dark hover:shadow-md hover:-translate-y-0.5 transition-all ${className}`}
        >
          <span aria-hidden="true">🛒</span>
          <span>{children}</span>
          <ExternalIcon className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition-transform" />
        </a>
        {subtitle && (
          <span className="block text-xs text-text-lighter text-center mt-2">{subtitle}</span>
        )}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={onClick}
      className={`not-prose inline-flex items-center gap-1.5 px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium no-underline hover:bg-accent-dark transition-colors ${className}`}
    >
      {children}
      <ExternalIcon />
    </a>
  );
}
