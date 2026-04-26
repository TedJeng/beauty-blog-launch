export interface Article {
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  coverImage: string;
  tags: string[];
  readingTime: string;
  author: string;
  rating?: {
    overall: number;
    moisturizing: number;
    soothing: number;
    texture: number;
    value: number;
  };
  pros?: string[];
  cons?: string[];
  content: string;
}

export interface Product {
  id: string;
  name: string;
  nameZh: string;
  brand: string;
  category: string;
  price: {
    tw: number;
    kr: number;
    currency: string;
  };
  image: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  description: string;
  affiliateUrl: string;
  articleSlug?: string;
  isFeatured?: boolean;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "skincare",
    name: "術後保養",
    description: "醫美術後修護保養品評測與推薦",
    icon: "sparkles",
  },
  {
    slug: "medical-aesthetics",
    name: "醫美筆記",
    description: "醫美療程心得分享與術後護理指南",
    icon: "heart",
  },
  {
    slug: "guides",
    name: "購物攻略",
    description: "韓國美妝代購指南與價差分析",
    icon: "shopping-bag",
  },
];
