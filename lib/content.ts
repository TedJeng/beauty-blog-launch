import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Article, Product } from "./types";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");
const PRODUCTS_FILE = path.join(process.cwd(), "content/products/products.json");

export function getArticleSlugs(): { category: string; slug: string }[] {
  const categories = fs.readdirSync(ARTICLES_DIR).filter((f) =>
    fs.statSync(path.join(ARTICLES_DIR, f)).isDirectory()
  );

  const slugs: { category: string; slug: string }[] = [];
  for (const category of categories) {
    const categoryDir = path.join(ARTICLES_DIR, category);
    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      slugs.push({ category, slug: file.replace(/\.mdx$/, "") });
    }
  }
  return slugs;
}

export function getArticleBySlug(
  category: string,
  slug: string
): Article | null {
  const filePath = path.join(ARTICLES_DIR, category, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  return {
    slug,
    category,
    title: data.title,
    description: data.description,
    date: data.date,
    updatedAt: data.updatedAt,
    coverImage: data.coverImage || "/images/placeholder.jpg",
    tags: data.tags || [],
    readingTime: stats.text.replace("min read", "分鐘"),
    author: data.author || "美妝編輯台",
    rating: data.rating,
    pros: data.pros,
    cons: data.cons,
    content,
  };
}

export function getAllArticles(): Article[] {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map(({ category, slug }) => getArticleBySlug(category, slug))
    .filter((a): a is Article => a !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return articles;
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getFeaturedArticles(count = 3): Article[] {
  return getAllArticles().slice(0, count);
}

export function getAllProducts(): Product[] {
  if (!fs.existsSync(PRODUCTS_FILE)) return [];
  const data = fs.readFileSync(PRODUCTS_FILE, "utf8");
  return JSON.parse(data);
}

export function getProductById(id: string): Product | null {
  const products = getAllProducts();
  return products.find((p) => p.id === id) || null;
}

export function getFeaturedProducts(count = 5): Product[] {
  return getAllProducts()
    .filter((p) => p.isFeatured)
    .slice(0, count);
}

export function getProductsByCategory(category: string): Product[] {
  return getAllProducts().filter((p) => p.category === category);
}
