import type { Metadata } from "next";
import ArticleCard from "@/components/articles/ArticleCard";
import Badge from "@/components/ui/Badge";
import { getAllArticles } from "@/lib/content";
import { CATEGORIES } from "@/lib/types";
import Link from "next/link";

export const metadata: Metadata = {
  title: "所有文章",
  description: "瀏覽所有醫美術後修護、韓國美妝評測與購物攻略文章。",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-serif text-3xl font-bold text-text mb-2">所有文章</h1>
      <p className="text-text-light mb-8">
        醫美術後修護、韓國美妝評測與購物攻略
      </p>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link href="/articles">
          <Badge variant="accent">全部</Badge>
        </Link>
        {CATEGORIES.map((cat) => (
          <Link key={cat.slug} href={`/articles/${cat.slug}`}>
            <Badge>{cat.name}</Badge>
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
          目前還沒有文章，敬請期待！
        </p>
      )}
    </div>
  );
}
