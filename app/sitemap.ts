import type { MetadataRoute } from "next";
import { getAllArticles, getAllProducts } from "@/lib/content";
import { CATEGORIES } from "@/lib/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://glowedit.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const products = getAllProducts();

  const articleUrls = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.category}/${article.slug}`,
    lastModified: new Date(article.updatedAt || article.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryUrls = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/articles/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const productUrls = products.map((product) => ({
    url: `${SITE_URL}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...categoryUrls,
    ...articleUrls,
    ...productUrls,
  ];
}
