"use client";

import { useState } from "react";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-white rounded-2xl p-8 md:p-12 text-center">
      <h2 className="font-serif text-2xl md:text-3xl font-semibold text-text mb-3">
        每週美妝情報，直送信箱
      </h2>
      <p className="text-text-light mb-6 max-w-md mx-auto">
        訂閱電子報，第一手掌握醫美術後保養新知、韓國美妝好物開箱與獨家優惠。
      </p>

      {status === "success" ? (
        <p className="text-herb font-medium">訂閱成功！感謝你的支持 :)</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-4 py-3 rounded-lg border border-primary-light/50 bg-cream focus:outline-none focus:ring-2 focus:ring-accent/30 text-sm"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium text-sm hover:bg-accent-dark transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "訂閱中..." : "免費訂閱"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-accent">訂閱失敗，請稍後再試。</p>
      )}
    </section>
  );
}
