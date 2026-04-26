"use client";

import { useState } from "react";
import ProductCard from "@/components/articles/ProductCard";
import type { Product } from "@/lib/types";

const PRODUCT_CATEGORIES = [
  { key: "all", label: "全部" },
  { key: "skincare", label: "護膚保養" },
  { key: "suncare", label: "防曬" },
  { key: "bodycare", label: "身體保養" },
];

// We need to load products on the client side for the tab interaction
// In a real app, this would use server components with searchParams
function ProductsContent({ products }: { products: Product[] }) {
  const [activeTab, setActiveTab] = useState("all");

  const filtered =
    activeTab === "all"
      ? products
      : products.filter((p) => p.category === activeTab);

  return (
    <>
      {/* Category Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {PRODUCT_CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveTab(cat.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === cat.key
                ? "bg-accent text-white"
                : "bg-white text-text-light hover:bg-cream-dark border border-primary-light/30"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-text-lighter py-20">
          這個分類還沒有產品，敬請期待！
        </p>
      )}
    </>
  );
}

export default function ProductsPage() {
  // Load products from JSON - in production this would use a server component
  // For now we import statically
  const products: Product[] = require("@/content/products/products.json");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-serif text-3xl font-bold text-text mb-2">
        好物推薦
      </h1>
      <p className="text-text-light mb-8">
        嚴選韓國美妝好物，每一款都經過親身測試。附台韓價差比較，讓你聰明購物。
      </p>

      <ProductsContent products={products} />
    </div>
  );
}
