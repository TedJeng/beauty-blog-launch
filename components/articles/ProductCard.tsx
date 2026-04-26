"use client";

import Image from "next/image";
import Link from "next/link";
import { trackAffiliateClick } from "@/lib/analytics";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  showArticleLink?: boolean;
}

export default function ProductCard({
  product,
  showArticleLink = true,
}: ProductCardProps) {
  const priceDiff = product.price.tw - product.price.kr;
  const savingPercent = Math.round((priceDiff / product.price.tw) * 100);

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-primary-light/20 hover:shadow-md transition-shadow">
      <div className="relative aspect-square bg-cream">
        <Image
          src={product.image}
          alt={product.nameZh}
          fill
          className="object-contain p-4"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {savingPercent > 0 && (
          <span className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">
            省 {savingPercent}%
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-text-lighter font-medium uppercase tracking-wide">
          {product.brand}
        </p>
        <h3 className="mt-1 font-serif text-sm font-semibold text-text line-clamp-2">
          {product.nameZh}
        </h3>
        <p className="text-xs text-text-lighter mt-0.5 line-clamp-1">
          {product.name}
        </p>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-accent">
            NT${product.price.tw.toLocaleString()}
          </span>
          {priceDiff > 0 && (
            <span className="text-xs text-text-lighter line-through">
              韓國 NT${product.price.kr.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-3.5 h-3.5 ${
                i < Math.round(product.rating)
                  ? "text-primary"
                  : "text-cream-dark"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-text-lighter ml-1">
            ({product.reviewCount})
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          {showArticleLink && product.articleSlug && (
            <Link
              href={`/articles/${product.articleSlug}`}
              className="flex-1 text-center px-3 py-2 border border-primary rounded-lg text-xs font-medium text-primary-dark hover:bg-primary-light/20 transition-colors"
            >
              查看評測
            </Link>
          )}
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() =>
              trackAffiliateClick(product.name, "affiliate", product.articleSlug)
            }
            className="flex-1 text-center px-3 py-2 bg-accent text-white rounded-lg text-xs font-medium hover:bg-accent-dark transition-colors"
          >
            前往購買
          </a>
        </div>
      </div>
    </div>
  );
}
