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

## 內容寫作工作流（重要）

### 寫評測一律使用 skill

**任何新增/編輯文章都必須先呼叫 `beauty-mdx-writer` skill**，不可憑記憶直接寫 MDX。skill 內含最新的 frontmatter schema、結構模板、合規用詞表，避免遺漏欄位或誤觸法規字眼。

- 產品評測 / 術後保養：`beauty-mdx-writer`
- 新增/更新產品 catalog：`beauty-product-curator`

兩個 skill 會自動讀對應規範，工作流程也由 skill 定義，不要在主對話中重寫流程。

### 評測文寫作慣例（本專案累積的決策）

- **tags 控制在 3-5 個**（skill 預設規則，超過會被審稿打回）
- **合規用詞**：避開「治療 / 療效 / 醫療級 / 美白 / 抗老 / 100% / 最佳」，即便是反向提及（「不主打美白」）也建議改用替代詞（「不主打提亮」）
- **價格寫成區間 + 撰文日期**，避免檔期/匯率變動造成失準：
  - 表頭用「售價區間（NT$）」而非「售價」
  - 寫法：`約 320-360`、`約 560-600`
  - 結論段用比例描述（「貴 1-2 成」）取代精確金額（「貴 100 元」）
  - 表格下方加註：`> ⚠️ 以上為 YYYY 年 M 月撰文時參考區間，價格隨檔期與匯率浮動，實際請以連結頁面即時顯示為準。`
  - 修改價格區間時記得同步更新 frontmatter 的 `updatedAt`

### 評測 ↔ 產品 catalog 連動

每篇新評測上線後：
1. 把產品加進 `content/products/products.json`（用 `beauty-product-curator`）
2. 設定 `articleSlug: "{category}/{slug}"`（不含 `articles/` 前綴與副檔名）
3. 文章封面圖放 `public/images/articles/{slug}.{ext}`
4. 產品圖放 `public/images/products/{id}.{ext}`
5. `isFeatured: true` 的產品數量留意首頁 TOP 5 是否爆量

### 連結管理

- 蝦皮聯盟連結會週期性更新，更新時 grep `s.shopee.tw` 全域批次替換，文章內 + products.json 的 `affiliateUrl` 都要動到
- 文章末段固定保留聯盟揭露聲明：「本文部分連結為聯盟行銷分潤連結⋯⋯」
