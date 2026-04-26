"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORIES } from "@/lib/types";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-primary-light/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold text-primary-dark tracking-tight">
              Glow Edit
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/articles/${cat.slug}`}
                className="text-sm font-medium text-text-light hover:text-accent transition-colors"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/products"
              className="text-sm font-medium text-text-light hover:text-accent transition-colors"
            >
              好物推薦
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-text-light hover:text-accent transition-colors"
            >
              關於我
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-text-light"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <nav className="md:hidden pb-4 border-t border-primary-light/20 pt-4 space-y-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/articles/${cat.slug}`}
                className="block text-sm font-medium text-text-light hover:text-accent py-1"
                onClick={() => setIsOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/products"
              className="block text-sm font-medium text-text-light hover:text-accent py-1"
              onClick={() => setIsOpen(false)}
            >
              好物推薦
            </Link>
            <Link
              href="/about"
              className="block text-sm font-medium text-text-light hover:text-accent py-1"
              onClick={() => setIsOpen(false)}
            >
              關於我
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
