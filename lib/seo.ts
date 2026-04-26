import type { Metadata } from "next";
import type { Article, Product } from "./types";

const SITE_NAME = "Glow Edit | 醫美術後修護 x 韓國美妝";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://glowedit.com";
const SITE_DESCRIPTION =
  "專注醫美術後修護與韓國美妝的專業評測平台。從 Ulthera 到 ONDA，從 Aestura 到 COSRX，給你最真實的產品體驗分享。";

export function getBaseMetadata(): Metadata {
  return {
    title: {
      default: SITE_NAME,
      template: `%s | Glow Edit`,
    },
    description: SITE_DESCRIPTION,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      type: "website",
      locale: "zh_TW",
      siteName: SITE_NAME,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: SITE_URL,
    },
  };
}

export function getArticleMetadata(article: Article): Metadata {
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      images: [article.coverImage],
      publishedTime: article.date,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      tags: article.tags,
    },
    alternates: {
      canonical: `${SITE_URL}/articles/${article.category}/${article.slug}`,
    },
  };
}

export function generateArticleSchema(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.coverImage,
    datePublished: article.date,
    dateModified: article.updatedAt || article.date,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Glow Edit",
    },
  };
}

export function generateProductSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      price: product.price.tw,
      priceCurrency: "TWD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };
}

export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
