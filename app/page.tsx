import Link from "next/link";
import ArticleCard from "@/components/articles/ArticleCard";
import ProductCard from "@/components/articles/ProductCard";
import NewsletterCTA from "@/components/layout/NewsletterCTA";
import Badge from "@/components/ui/Badge";
import { getFeaturedArticles, getAllArticles, getFeaturedProducts } from "@/lib/content";
import { CATEGORIES } from "@/lib/types";

export const revalidate = 21600; // 6 hours

export default function HomePage() {
  const featuredArticles = getFeaturedArticles(3);
  const latestArticles = getAllArticles().slice(0, 6);
  const featuredProducts = getFeaturedProducts(5);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <Badge variant="accent">醫美術後修護 x 韓國美妝</Badge>
          <h1 className="mt-4 font-serif text-3xl md:text-5xl font-bold text-text leading-tight">
            真實體驗，
            <br className="sm:hidden" />
            誠實推薦
          </h1>
          <p className="mt-4 text-text-light max-w-xl mx-auto leading-relaxed">
            從 Ulthera 到 ONDA，從 Aestura 到 COSRX。
            <br />
            站長親身體驗醫美療程，為你嚴選術後修護好物。
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/articles"
              className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-dark transition-colors"
            >
              瀏覽文章
            </Link>
            <Link
              href="/products"
              className="px-6 py-3 border border-primary text-primary-dark rounded-lg font-medium hover:bg-primary-light/20 transition-colors"
            >
              好物推薦
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Articles (1 large + 2 small grid) */}
      {featuredArticles.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="font-serif text-2xl font-semibold text-text mb-6">
            編輯精選
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:row-span-2">
              <ArticleCard article={featuredArticles[0]} variant="featured" />
            </div>
            {featuredArticles.slice(1, 3).map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                variant="featured"
              />
            ))}
          </div>
        </section>
      )}

      {/* Category Navigation */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="font-serif text-2xl font-semibold text-text mb-6">
          探索分類
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/articles/${cat.slug}`}
              className="group block bg-white rounded-xl p-6 hover:shadow-md transition-shadow border border-primary-light/20"
            >
              <h3 className="font-serif text-lg font-semibold text-text group-hover:text-accent transition-colors">
                {cat.name}
              </h3>
              <p className="mt-2 text-sm text-text-light">{cat.description}</p>
              <span className="mt-3 inline-block text-sm text-accent font-medium">
                查看文章 &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      {latestArticles.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-semibold text-text">
              最新文章
            </h2>
            <Link
              href="/articles"
              className="text-sm text-accent font-medium hover:text-accent-dark"
            >
              查看全部 &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* TOP 5 Products */}
      {featuredProducts.length > 0 && (
        <section className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-text">
                TOP 5 好物推薦
              </h2>
              <Link
                href="/products"
                className="text-sm text-accent font-medium hover:text-accent-dark"
              >
                查看全部 &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <NewsletterCTA />
      </section>
    </div>
  );
}
