export type BrandId = "natura" | "avon" | "jequiti";

export interface Brand {
  _id: string;
  name: string;
  slug: { current: string };
  slogan: string;
  accentColor: string;
  gradient: string;
  logoUrl?: string;
  catalogUrl: string;
  description: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: { current: string };
  iconName: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: { current: string };
  brand: {
    _id: string;
    name: string;
    slug: { current: BrandId };
    accentColor?: string;
  };
  category: {
    _id: string;
    name: string;
    slug: { current: string };
  };
  price: number;
  salePrice?: number;
  images: string[];
  description: string;
  olfactoryNotes?: string;
  volume?: string;
  inStock: boolean;
  isFeatured?: boolean;
}

export interface SlideItem {
  _id: string;
  title: string;
  subtitle: string;
  tagline: string;
  brandName: string;
  brandSlug: BrandId;
  imageUrl: string;
  gradientTheme: string;
  accentColor?: string;
  ctaText: string;
  ctaLink: string;
  priceNote?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
