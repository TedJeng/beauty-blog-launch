import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ReadingProgress from "@/components/articles/ReadingProgress";
import TableOfContents from "@/components/articles/TableOfContents";
import RatingBar from "@/components/ui/RatingBar";
import Badge from "@/components/ui/Badge";
import { getArticleBySlug, getArticleSlugs } from "@/lib/content";
import { getArticleMetadata, generateArticleSchema } from "@/lib/seo";
import { CATEGORIES } from "@/lib/types";

export const revalidate = 86400; // 24 hours

export async function generateStaticParams() {
  return getArticleSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticleBySlug(category, slug);
  if (!article) return {};
  return getArticleMetadata(article);
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const article = getArticleBySlug(category, slug);
  if (!article) notFound();

  const categoryName =
    CATEGORIES.find((c) => c.slug === article.category)?.name || article.category;

  const schema = generateArticleSchema(article);

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <article className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: "文章", href: "/articles" },
            { label: categoryName, href: `/articles/${article.category}` },
            { label: article.title },
          ]}
        />

        {/* Article Header */}
        <header className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="accent">{categoryName}</Badge>
            <span className="text-sm text-text-lighter">
              {article.readingTime}
            </span>
          </div>
          <h1 className="font-serif text-2xl md:text-4xl font-bold text-text leading-tight">
            {article.title}
          </h1>
          <p className="mt-3 text-text-light leading-relaxed">
            {article.description}
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm text-text-lighter">
            <span>{article.author}</span>
            <span>|</span>
            <time>{article.date}</time>
            {article.updatedAt && (
              <>
                <span>|</span>
                <span>更新於 {article.updatedAt}</span>
              </>
            )}
          </div>
        </header>

        {/* Quick Summary (if rating exists) */}
        {article.rating && (
          <div className="mt-8 bg-white rounded-xl p-6 border border-primary-light/20 max-w-3xl">
            <h2 className="font-serif text-lg font-semibold mb-4">
              懶人包評分
            </h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl font-bold text-accent">
                {article.rating.overall.toFixed(1)}
              </div>
              <div className="text-sm text-text-light">/ 5.0 綜合評分</div>
            </div>
            <div className="space-y-2">
              <RatingBar label="保濕力" value={article.rating.moisturizing} />
              <RatingBar label="舒緩度" value={article.rating.soothing} />
              <RatingBar label="質地" value={article.rating.texture} />
              <RatingBar label="性價比" value={article.rating.value} />
            </div>

            {/* Pros & Cons */}
            {(article.pros || article.cons) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {article.pros && (
                  <div>
                    <h3 className="text-sm font-semibold text-herb mb-2">
                      優點
                    </h3>
                    <ul className="space-y-1">
                      {article.pros.map((pro, i) => (
                        <li
                          key={i}
                          className="text-sm text-text-light flex items-start gap-1.5"
                        >
                          <span className="text-herb mt-0.5">+</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {article.cons && (
                  <div>
                    <h3 className="text-sm font-semibold text-accent mb-2">
                      缺點
                    </h3>
                    <ul className="space-y-1">
                      {article.cons.map((con, i) => (
                        <li
                          key={i}
                          className="text-sm text-text-light flex items-start gap-1.5"
                        >
                          <span className="text-accent mt-0.5">-</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Content + TOC Layout */}
        <div className="mt-10 flex gap-10">
          {/* Main Content */}
          <div className="flex-1 min-w-0 max-w-3xl">
            <TableOfContents content={article.content} variant="mobile" />
            <div className="prose prose-lg max-w-none">
              <MDXRemote
                source={article.content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
                  },
                }}
              />
            </div>
          </div>

          {/* Desktop TOC Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <TableOfContents content={article.content} variant="desktop" />
          </aside>
        </div>

        {/* Affiliate Disclosure */}
        <div className="mt-12 p-4 bg-cream-dark/50 rounded-lg text-xs text-text-lighter max-w-3xl">
          本文部分連結為聯盟行銷分潤連結，透過連結購買不影響您的購買價格，但本站將獲得小額佣金。感謝您的支持！
        </div>
      </article>
    </>
  );
}
