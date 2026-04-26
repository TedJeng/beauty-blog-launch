import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ArticleCard from "@/components/articles/ArticleCard";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Badge from "@/components/ui/Badge";
import { getArticlesByCategory } from "@/lib/content";
import { CATEGORIES } from "@/lib/types";

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const articles = getArticlesByCategory(category);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumb
        items={[
          { label: "文章", href: "/articles" },
          { label: cat.name },
        ]}
      />

      <h1 className="font-serif text-3xl font-bold text-text mb-2">
        {cat.name}
      </h1>
      <p className="text-text-light mb-8">{cat.description}</p>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link href="/articles">
          <Badge>全部</Badge>
        </Link>
        {CATEGORIES.map((c) => (
          <Link key={c.slug} href={`/articles/${c.slug}`}>
            <Badge variant={c.slug === category ? "accent" : "default"}>
              {c.name}
            </Badge>
          </Link>
        ))}
      </div>

      {/* Article list */}
      <div className="space-y-6">
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            article={article}
            variant="horizontal"
          />
        ))}
      </div>

      {articles.length === 0 && (
        <p className="text-center text-text-lighter py-20">
          這個分類還沒有文章，敬請期待！
        </p>
      )}
    </div>
  );
}
