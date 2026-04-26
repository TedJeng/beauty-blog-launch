import Link from "next/link";
import { CATEGORIES } from "@/lib/types";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-primary-light/30 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <span className="font-display text-xl font-bold text-primary-dark">
              Glow Edit
            </span>
            <p className="mt-3 text-sm text-text-light leading-relaxed">
              專注醫美術後修護與韓國美妝的專業評測平台。
              <br />
              真實體驗，誠實推薦。
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-serif text-sm font-semibold text-text mb-4">
              內容分類
            </h3>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/articles/${cat.slug}`}
                    className="text-sm text-text-light hover:text-accent transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="text-sm text-text-light hover:text-accent transition-colors"
                >
                  好物推薦
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-serif text-sm font-semibold text-text mb-4">
              關於本站
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-text-light hover:text-accent transition-colors"
                >
                  關於我
                </Link>
              </li>
            </ul>
            <p className="mt-6 text-xs text-text-lighter">
              本站部分連結為聯盟行銷分潤連結，
              <br />
              透過連結購買不影響您的價格。
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-light/20 text-center">
          <p className="text-xs text-text-lighter">
            &copy; {new Date().getFullYear()} Glow Edit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
