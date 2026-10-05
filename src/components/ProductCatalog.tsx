"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, SlidersHorizontal, X } from "lucide-react";
import { Product, Brand, Category } from "../types";
import ProductCard from "./ProductCard";

interface ProductCatalogProps {
  products: Product[];
  brands: Brand[];
  categories: Category[];
}

type SortOption = "default" | "price-asc" | "price-desc" | "discount";

export default function ProductCatalog({ products, brands, categories }: ProductCatalogProps) {
  const [activeBrand, setActiveBrand] = useState<string>("all");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (activeBrand !== "all") {
      result = result.filter((p) => p.brand.slug.current === activeBrand);
    }
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category.slug.current === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.name.toLowerCase().includes(q) ||
          (p.description?.toLowerCase().includes(q)) ||
          (p.olfactoryNotes?.toLowerCase().includes(q))
      );
    }
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case "price-desc":
        result.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      case "discount":
        result.sort((a, b) => {
          const discA = a.salePrice ? ((a.price - a.salePrice) / a.price) : 0;
          const discB = b.salePrice ? ((b.price - b.salePrice) / b.price) : 0;
          return discB - discA;
        });
        break;
    }

    return result;
  }, [products, activeBrand, activeCategory, searchQuery, sortBy]);

  const BRAND_ACCENTS: Record<string, string> = {
    natura: "#EA580C",
    avon: "#E11D48",
    jequiti: "#7C3AED",
  };

  return (
    <section id="catalogo" className="w-full">
      {/* Header da seção */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-6 sm:mb-8"
      >
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1 sm:mb-2">
          🌸 Catálogo Completo
        </p>
        <h2 className="text-2xl sm:text-4xl font-black text-white mb-1">
          Vitrine de Produtos
        </h2>
        <p className="text-xs sm:text-base text-zinc-400 max-w-xl">
          Encontre perfumes, cosméticos e kits presenteáveis das melhores marcas do Brasil.
        </p>
      </motion.div>

      {/* Barra de Pesquisa + Filtros */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-panel rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 flex flex-col gap-3"
      >
        {/* Linha 1: Pesquisa + toggle filtros */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar produto ou marca..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 sm:py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-white/25 focus:bg-white/8 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              showFilters ? "glass-pill-active text-white" : "glass-pill text-zinc-300 hover:text-white"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filtros</span>
            {(activeBrand !== "all" || activeCategory !== "all" || sortBy !== "default") && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>
        </div>

        {/* Filtros expandidos */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-3 border-t border-white/10 space-y-3">
                {/* Ordenação */}
                <div>
                  <label className="text-[10px] sm:text-xs text-zinc-500 font-semibold uppercase tracking-wide mb-1.5 block">
                    Ordenar por
                  </label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {(
                      [
                        { value: "default", label: "Padrão" },
                        { value: "price-asc", label: "Menor Preço" },
                        { value: "price-desc", label: "Maior Preço" },
                        { value: "discount", label: "Maior Desconto" },
                      ] as { value: SortOption; label: string }[]
                    ).map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setSortBy(opt.value)}
                        className={`text-xs px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg font-medium transition-all ${
                          sortBy === opt.value
                            ? "bg-white/20 text-white border border-white/30"
                            : "glass-pill text-zinc-400 hover:text-white"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categorias */}
                <div>
                  <label className="text-[10px] sm:text-xs text-zinc-500 font-semibold uppercase tracking-wide mb-1.5 block">
                    Categoria
                  </label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <button
                      onClick={() => setActiveCategory("all")}
                      className={`text-xs px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg font-medium transition-all ${
                        activeCategory === "all"
                          ? "bg-white/20 text-white border border-white/30"
                          : "glass-pill text-zinc-400 hover:text-white"
                      }`}
                    >
                      Todas
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat._id}
                        onClick={() => setActiveCategory(cat.slug.current)}
                        className={`text-xs px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg font-medium transition-all ${
                          activeCategory === cat.slug.current
                            ? "bg-white/20 text-white border border-white/30"
                            : "glass-pill text-zinc-400 hover:text-white"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Filtros por Marca (sempre visíveis com scroll suave no mobile) */}
      <div className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 scrollbar-hide flex-nowrap -mx-4 px-4 sm:mx-0 sm:px-0">
        <Filter className="w-4 h-4 text-zinc-500 flex-shrink-0" />
        <button
          onClick={() => setActiveBrand("all")}
          className={`flex-shrink-0 text-xs sm:text-sm font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl transition-all ${
            activeBrand === "all"
              ? "glass-pill-active text-white"
              : "glass-pill text-zinc-400 hover:text-white"
          }`}
        >
          Todas as Marcas
        </button>
        {brands.map((brand) => {
          const accent = BRAND_ACCENTS[brand.slug.current] ?? "#EA580C";
          const isActive = activeBrand === brand.slug.current;
          return (
            <button
              key={brand._id}
              onClick={() => setActiveBrand(brand.slug.current)}
              className={`flex-shrink-0 text-xs sm:text-sm font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border transition-all ${
                isActive ? "text-white" : "glass-pill text-zinc-400 hover:text-white"
              }`}
              style={
                isActive
                  ? {
                      background: `linear-gradient(135deg, ${accent}40, ${accent}20)`,
                      borderColor: `${accent}70`,
                      boxShadow: `0 0 20px ${accent}30`,
                      color: "white",
                    }
                  : {}
              }
            >
              {brand.name}
            </button>
          );
        })}
      </div>

      {/* Contador de resultados */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <p className="text-xs sm:text-sm text-zinc-400">
          <span className="font-bold text-zinc-200">{filtered.length}</span>{" "}
          produto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </p>
        {(activeBrand !== "all" || activeCategory !== "all" || searchQuery || sortBy !== "default") && (
          <button
            onClick={() => {
              setActiveBrand("all");
              setActiveCategory("all");
              setSearchQuery("");
              setSortBy("default");
            }}
            className="text-xs text-zinc-500 hover:text-zinc-200 flex items-center gap-1 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Limpar filtros
          </button>
        )}
      </div>

      {/* Grid de Produtos (1 col no mobile vertical, 2 col a partir de 480px, 3/4 col no desktop) */}
      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={`grid-${activeBrand}-${activeCategory}-${sortBy}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6"
          >
            {filtered.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel rounded-2xl p-8 sm:p-12 text-center"
          >
            <p className="text-3xl sm:text-4xl mb-3">🔍</p>
            <p className="text-zinc-300 font-semibold mb-1">Nenhum produto encontrado</p>
            <p className="text-zinc-500 text-xs sm:text-sm">Tente outros filtros ou termos de busca</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
