@AGENTS.md

# Glow Edit - 醫美術後修護 x 韓國美妝 Blog

## 專案概述

以「醫美術後修護 x 韓國美妝」為核心定位的美妝產品介紹 Blog。目標市場為台灣 25-40 歲都會女性。分三階段演進：分潤網站 → 私域流量 → 代購平台。

## 技術棧

- **框架**: Next.js 16 (App Router, Turbopack)
- **CSS**: Tailwind CSS 4 + `@tailwindcss/typography`
- **內容**: MDX (`next-mdx-remote/rsc`) + `gray-matter` + `reading-time`
- **語言**: TypeScript
- **部署**: Vercel (目標)

## Next.js 16 注意事項

- `params` 和 `searchParams` 是 **async Promise**，必須 `await`
- Turbopack 為預設 bundler
- `middleware.ts` 已改名為 `proxy.ts`
- 新的 `cacheComponents` 模型（本專案尚未啟用，使用傳統 `revalidate` export）

## 目錄結構

```
app/
  layout.tsx              # 根 layout（Noto Sans/Serif TC + Playfair Display 字體）
  page.tsx                # 首頁（ISR 6h）
  not-found.tsx
  globals.css             # Tailwind 主題色、字體、prose 客製化
  sitemap.ts / robots.ts
  articles/
    page.tsx              # 文章列表
    [category]/
      page.tsx            # 分類頁（SSG）
      [slug]/page.tsx     # 文章詳情（ISR 24h）
  products/page.tsx       # 產品推薦（客戶端 tab 篩選）
  about/page.tsx
  api/subscribe/route.ts  # Newsletter 訂閱（待接 email 服務）
  api/track/route.ts      # 事件追蹤（待接資料庫）
components/
  layout/   → Header, Footer, Breadcrumb, NewsletterCTA
  articles/ → ArticleCard, ProductCard, AffiliateLink, TableOfContents, ReadingProgress
  ui/       → Badge, RatingBar
content/
  articles/{skincare,medical-aesthetics,guides}/*.mdx
  products/products.json
lib/
  types.ts      # Article, Product, Category 型別 + CATEGORIES 常數
  content.ts    # MDX 讀取與解析
  seo.ts        # Metadata 與 Structured Data（Article/Product/FAQ Schema）
  analytics.ts  # GA4 事件追蹤工具（客戶端）
```

## 設計規範

### 色彩
| 用途 | 色碼 | Tailwind class |
|------|------|----------------|
| 主色（暖金杏） | `#C4A882` | `primary` |
| 強調色（乾燥玫瑰） | `#D4726A` | `accent` |
| 背景（奶油白） | `#F7F3EF` | `cream` |
| 安全標示（草本綠） | `#7BAE7F` | `herb` |
| 文字 | `#2D2D2D` | `text` |

每色皆有 `-light` 和 `-dark` 變體。

### 字體
- 標題: `font-serif`（Noto Serif TC）
- 內文: `font-sans`（Noto Sans TC）
- 品牌/英文: `font-display`（Playfair Display）

### 響應式斷點
Mobile-first。文章 Grid：手機 1 欄 → 平板 2 欄 → 桌面 3 欄。TOC：手機頂部摺疊 → 桌面右側 sticky。

## 內容格式

### MDX Frontmatter 範例
```yaml
title: "文章標題"
description: "SEO 描述"
date: "2026-04-20"
coverImage: "/images/articles/xxx.jpg"
tags: ["tag1", "tag2"]
author: "美妝編輯台"
rating:                    # 選填，產品評測文適用
  overall: 4.5
  moisturizing: 4.8
  soothing: 4.7
  texture: 4.2
  value: 4.3
pros: ["優點1", "優點2"]   # 選填
cons: ["缺點1"]            # 選填
```

### 產品資料 (products.json)
每筆產品包含 `id`, `name`, `nameZh`, `brand`, `category`, `price.tw/kr`, `image`, `rating`, `reviewCount`, `tags`, `description`, `affiliateUrl`, `articleSlug`(選填), `isFeatured`。

## 開發指令

```bash
npm run dev    # 啟動開發伺服器
npm run build  # 建置生產版本
npm run start  # 啟動生產伺服器
```

## 待完成項目

- [ ] 補齊 `public/images/` 下的實際圖片資源
- [ ] 串接 GA4 (`NEXT_PUBLIC_GA_ID` 環境變數)
- [ ] Newsletter API 接 email 服務 (Resend/Mailchimp)
- [ ] 產品詳情頁 `app/products/[id]/page.tsx`
- [ ] 搜尋功能
- [ ] 產品對比功能
- [ ] Google Search Console 驗證

## 合規注意

- 不得宣稱療效，定位為「個人體驗分享」
- 分潤連結須加 `rel="noopener noreferrer sponsored"` 並揭露利益關係
- 代購規模擴大後注意食藥署登記與關稅門檻（完稅價 > NT$2,000）
