import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import type { Article } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";

interface ArticleCardProps {
  article: Article;
  variant?: "horizontal" | "vertical" | "featured";
}

export default function ArticleCard({
  article,
  variant = "vertical",
}: ArticleCardProps) {
  const categoryName =
    CATEGORIES.find((c) => c.slug === article.category)?.name || article.category;

  if (variant === "horizontal") {
    return (
      <Link
        href={`/articles/${article.category}/${article.slug}`}
        className="group flex flex-col sm:flex-row gap-4 bg-white rounded-xl overflow-hidden hover:shadow-md transition-shadow"
      >
        <div className="relative w-full sm:w-64 h-48 sm:h-auto shrink-0">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, 256px"
          />
        </div>
        <div className="p-4 sm:p-5 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <Badge>{categoryName}</Badge>
            <span className="text-xs text-text-lighter">{article.readingTime}</span>
          </div>
          <h3 className="font-serif text-lg font-semibold text-text group-hover:text-accent transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="mt-2 text-sm text-text-light line-clamp-2">
            {article.description}
          </p>
          <time className="mt-3 text-xs text-text-lighter">{article.date}</time>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        href={`/articles/${article.category}/${article.slug}`}
        className="group relative block rounded-2xl overflow-hidden"
      >
        <div className="relative aspect-[4/3]">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <Badge variant="accent">{categoryName}</Badge>
          <h3 className="mt-2 font-serif text-xl md:text-2xl font-semibold text-white line-clamp-2">
            {article.title}
          </h3>
          <p className="mt-1 text-sm text-white/80 line-clamp-2">
            {article.description}
          </p>
        </div>
      </Link>
    );
  }

  // Default vertical card
  return (
    <Link
      href={`/articles/${article.category}/${article.slug}`}
      className="group block bg-white rounded-xl overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-[3/2]">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge>{categoryName}</Badge>
          <span className="text-xs text-text-lighter">{article.readingTime}</span>
        </div>
        <h3 className="font-serif text-base font-semibold text-text group-hover:text-accent transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="mt-1.5 text-sm text-text-light line-clamp-2">
          {article.description}
        </p>
        <time className="mt-2 block text-xs text-text-lighter">
          {article.date}
        </time>
      </div>
    </Link>
  );
}
