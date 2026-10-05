import { getProducts, getBrands, getCategories, getSlides } from "../sanity/lib/fetchData";
import HeroSlider from "../components/HeroSlider";
import ProductCatalog from "../components/ProductCatalog";
import BrandsSection from "../components/BrandsSection";
import MagazinesSection from "../components/MagazinesSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LiquidBackground from "../components/LiquidBackground";
import CartDrawer from "../components/CartDrawer";
import FeaturedBanner from "../components/FeaturedBanner";
import ProductDetailModal from "../components/ProductDetailModal";

// Revalidação em segundo plano a cada 60s como fallback de segurança (o webhook revalida na hora)
export const revalidate = 60;

export default async function HomePage() {
  const [products, brands, categories, slides] = await Promise.all([
    getProducts(),
    getBrands(),
    getCategories(),
    getSlides(),
  ]);

  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <>
      <LiquidBackground />
      <CartDrawer />
      <ProductDetailModal />

      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-10 sm:space-y-20 pb-4 pt-20 sm:pt-24">
          {/* Hero Slider */}
          <section className="pt-2 sm:pt-4">
            <HeroSlider slides={slides} />
          </section>

          {/* Destaques em Destaque */}
          {featuredProducts.length > 0 && (
            <FeaturedBanner products={featuredProducts} />
          )}

          {/* Catálogo Principal */}
          <ProductCatalog
            products={products}
            brands={brands}
            categories={categories}
          />

          {/* Seção de Marcas */}
          <BrandsSection brands={brands} />

          {/* Revistas Digitais */}
          <MagazinesSection brands={brands} />
        </main>

        <Footer />
      </div>
    </>
  );
}
