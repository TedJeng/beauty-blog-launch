"use client";

import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TOCProps {
  content: string;
  variant: "mobile" | "desktop";
}

export default function TableOfContents({ content, variant }: TOCProps) {
  const [activeId, setActiveId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const headings: TOCItem[] = [];
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].trim();
    headings.push({
      id: text
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fff]+/g, "-")
        .replace(/^-|-$/g, ""),
      text,
      level: match[1].length,
    });
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  if (variant === "mobile") {
    return (
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-primary-light/30 text-sm font-medium"
        >
          <span>文章目錄</span>
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isOpen && (
          <nav className="mt-2 px-4 py-3 bg-white rounded-lg border border-primary-light/30">
            <ul className="space-y-2">
              {headings.map((h) => (
                <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 12}px` }}>
                  <a
                    href={`#${h.id}`}
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-text-light hover:text-accent transition-colors"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    );
  }

  // Desktop: sticky sidebar
  return (
    <nav className="hidden lg:block sticky top-24">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-text-lighter mb-3">
        文章目錄
      </h4>
      <ul className="space-y-2 border-l-2 border-primary-light/30">
        {headings.map((h) => (
          <li
            key={h.id}
            style={{ paddingLeft: `${(h.level - 2) * 12 + 12}px` }}
          >
            <a
              href={`#${h.id}`}
              className={`block text-sm transition-colors ${
                activeId === h.id
                  ? "text-accent font-medium"
                  : "text-text-lighter hover:text-text-light"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
