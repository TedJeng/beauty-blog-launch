import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="font-serif text-6xl font-bold text-primary-light">404</h1>
      <h2 className="mt-4 font-serif text-xl font-semibold text-text">
        找不到這個頁面
      </h2>
      <p className="mt-2 text-text-light">
        你要找的頁面可能已經移除或不存在。
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-dark transition-colors"
      >
        回到首頁
      </Link>
    </div>
  );
}
