import { client, isSanityConfigured } from "./client";
import { Product, Brand, Category, SlideItem } from "../../types";
import { MOCK_PRODUCTS, MOCK_BRANDS, MOCK_CATEGORIES, MOCK_SLIDES } from "../../data/mockData";

export async function getProducts(): Promise<Product[]> {
  if (!isSanityConfigured) {
    return MOCK_PRODUCTS;
  }
  try {
    const query = `*[_type == "product"]{
      _id,
      title,
      slug,
      price,
      salePrice,
      "images": images[].asset->url,
      description,
      olfactoryNotes,
      volume,
      inStock,
      isFeatured,
      brand->{
        _id,
        name,
        slug,
        accentColor
      },
      category->{
        _id,
        name,
        slug
      }
    }`;
    const products = await client.fetch<Product[]>(query);
    if (!products || products.length === 0) {
      return MOCK_PRODUCTS;
    }
    return products.map((p) => ({
      ...p,
      images:
        p.images && p.images.filter((img) => Boolean(img) && img.trim() !== "").length > 0
          ? p.images.filter((img) => Boolean(img) && img.trim() !== "")
          : ["https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"],
    }));
  } catch (error) {
    console.warn("Aviso ao buscar dados do Sanity. Utilizando catálogo local demonstrativo:", error);
    return MOCK_PRODUCTS;
  }
}

export async function getBrands(): Promise<Brand[]> {
  if (!isSanityConfigured) {
    return MOCK_BRANDS;
  }
  try {
    const query = `*[_type == "brand"]{
      _id,
      name,
      slug,
      slogan,
      accentColor,
      gradient,
      "logoUrl": logo.asset->url,
      catalogUrl,
      description
    }`;
    const brands = await client.fetch<Brand[]>(query);
    if (!brands || brands.length === 0) {
      return MOCK_BRANDS;
    }
    return brands;
  } catch (error) {
    return MOCK_BRANDS;
  }
}

export async function getCategories(): Promise<Category[]> {
  if (!isSanityConfigured) {
    return MOCK_CATEGORIES;
  }
  try {
    const query = `*[_type == "category"]{
      _id,
      name,
      slug,
      iconName
    }`;
    const categories = await client.fetch<Category[]>(query);
    if (!categories || categories.length === 0) {
      return MOCK_CATEGORIES;
    }
    return categories;
  } catch (error) {
    return MOCK_CATEGORIES;
  }
}

export async function getSlides(): Promise<SlideItem[]> {
  if (!isSanityConfigured) {
    return MOCK_SLIDES;
  }
  try {
    const query = `*[_type == "slide"] | order(order asc){
      _id,
      title,
      subtitle,
      tagline,
      "brandName": brand->name,
      "brandSlug": brand->slug.current,
      "imageUrl": image.asset->url,
      gradientTheme,
      accentColor,
      ctaText,
      ctaLink,
      priceNote
    }`;
    const slides = await client.fetch<SlideItem[]>(query);
    if (!slides || slides.length === 0) {
      return MOCK_SLIDES;
    }
    return slides.map((s) => ({
      ...s,
      imageUrl:
        s.imageUrl && s.imageUrl.trim() !== ""
          ? s.imageUrl
          : "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
    }));
  } catch (error) {
    return MOCK_SLIDES;
  }
}
