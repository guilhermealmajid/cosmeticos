"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ShoppingBag,
  Tag,
} from "lucide-react";
import { Product } from "../types";
import { useCart } from "../context/CartContext";

const BRAND_ACCENTS: Record<string, string> = {
  natura: "#EA580C",
  avon: "#E11D48",
  jequiti: "#7C3AED",
};

interface FeaturedBannerProps {
  products: Product[];
}

export default function FeaturedBanner({ products }: FeaturedBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { addToCart, openProductDetail } = useCart();
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  if (!products || products.length === 0) return null;

  // Mostra todos os produtos em destaque da lista
  const featured = products;

  // Atualiza estado de scroll e índice ativo
  const updateScrollState = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      const ratio = scrollLeft / maxScroll;
      const idx = Math.min(
        featured.length - 1,
        Math.max(0, Math.round(ratio * (featured.length - 1)))
      );
      setActiveIndex(idx);
    }
  }, [featured.length]);

  // Função de rolagem manual pelas setas
  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const cardWidth = containerRef.current.clientWidth > 640 ? 320 : 280;
    containerRef.current.scrollBy({
      left: direction === "right" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

  // Rola até um item específico pelo indicador (dot)
  const scrollToItem = (idx: number) => {
    if (!containerRef.current) return;
    const items = containerRef.current.children;
    if (items[idx]) {
      (items[idx] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  // Carrossel Automático: Roda sozinho a cada 3.5 segundos quando o mouse não estiver em cima
  useEffect(() => {
    if (isPaused || featured.length <= 1) return;

    const timer = setInterval(() => {
      if (!containerRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

      // Se atingir o final, reinicia suavemente para o começo
      if (scrollLeft + clientWidth >= scrollWidth - 15) {
        containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const cardWidth = containerRef.current.clientWidth > 640 ? 320 : 280;
        containerRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, featured.length]);

  // Listener para acompanhar o scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  return (
    <section
      className="w-full relative group/section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Header com Título e Controles de Navegação */}
      <div className="mb-4 sm:mb-6 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              ⭐ Seleção Especial
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              Giro Automático
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Destaques da Vitrine
          </h2>
        </div>

        {/* Setas no Cabeçalho e Link Ver Todos */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="p-2 rounded-xl glass-pill text-white/80 hover:text-white hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-md active:scale-95"
              aria-label="Voltar destaques"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="p-2 rounded-xl glass-pill text-white/80 hover:text-white hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-md active:scale-95"
              aria-label="Avançar destaques"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <a
            href="#catalogo"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-zinc-400 hover:text-white transition-colors group"
          >
            Ver todos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Container do Carrossel */}
      <div className="relative">
        {/* Botão Flutuante Esquerda */}
        <button
          onClick={() => scroll("left")}
          className={`absolute left-1 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/15 transition-all shadow-2xl active:scale-95 hidden md:flex items-center justify-center ${
            canScrollLeft ? "opacity-90 hover:opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-label="Rolar para esquerda"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Botão Flutuante Direita */}
        <button
          onClick={() => scroll("right")}
          className={`absolute right-1 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/15 transition-all shadow-2xl active:scale-95 hidden md:flex items-center justify-center ${
            canScrollRight ? "opacity-90 hover:opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-label="Rolar para direita"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Degrade lateral para profundidade visual */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none rounded-l-2xl hidden sm:block" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none rounded-r-2xl hidden sm:block" />

        {/* Trilho dos Cards com Rolagem Suave */}
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto pb-4 pt-2 px-1 snap-x snap-mandatory scrollbar-hide scroll-smooth"
        >
          {featured.map((product, i) => {
            const slug = product.brand.slug.current;
            const accent = BRAND_ACCENTS[slug] ?? "#EA580C";
            const displayPrice = product.salePrice ?? product.price;
            const hasDiscount =
              product.salePrice !== undefined && product.salePrice < product.price;
            const discountPct = hasDiscount
              ? Math.round(((product.price - displayPrice) / product.price) * 100)
              : 0;

            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                onClick={() => openProductDetail(product)}
                className="glass-card rounded-2xl overflow-hidden flex-shrink-0 w-[260px] sm:w-[300px] snap-center relative group cursor-pointer border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Brilho temático da marca no hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${accent}35 0%, transparent 65%)`,
                  }}
                />

                {/* Imagem do Produto */}
                <div className="relative h-48 overflow-hidden bg-zinc-900/70">
                  {/* Indicador de clique para zoom */}
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-10">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-semibold shadow-xl border border-white/20 scale-90 group-hover:scale-100 transition-transform duration-300">
                      <ZoomIn className="w-3.5 h-3.5 text-amber-300" />
                      Ampliar vitrine
                    </span>
                  </div>

                  {(() => {
                    const rawSrc = product.images?.[0];
                    const imgSrc =
                      rawSrc && rawSrc.trim() !== ""
                        ? rawSrc
                        : "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80";
                    return (
                      <Image
                        src={imgSrc}
                        alt={product.title || "Produto"}
                        fill
                        className="object-cover object-center group-hover:scale-108 transition-transform duration-700"
                        sizes="300px"
                      />
                    );
                  })()}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent pointer-events-none" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
                    {hasDiscount && (
                      <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-rose-500 text-white shadow-lg flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        -{discountPct}%
                      </span>
                    )}
                    <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-500/90 text-black shadow-lg flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Destaque
                    </span>
                  </div>

                  <span
                    className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-0.5 rounded-md border backdrop-blur-sm z-10"
                    style={{
                      color: accent,
                      borderColor: `${accent}60`,
                      background: `${accent}25`,
                    }}
                  >
                    {product.brand.name}
                  </span>
                </div>

                {/* Conteúdo Informativo */}
                <div className="p-4 relative z-10 flex flex-col flex-1 justify-between gap-2">
                  <div>
                    <span className="text-[10px] sm:text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                      {product.category.name}
                    </span>
                    <h3 className="font-bold text-zinc-100 text-sm leading-snug line-clamp-2 mt-0.5 mb-1 group-hover:text-white transition-colors">
                      {product.title}
                    </h3>

                    {product.olfactoryNotes && (
                      <p className="text-xs text-zinc-400 line-clamp-1">
                        {product.olfactoryNotes}
                      </p>
                    )}
                  </div>

                  {/* Preço e Botão de Ação */}
                  <div className="flex items-end justify-between gap-2 pt-2 border-t border-white/5 mt-auto">
                    <div>
                      {hasDiscount && (
                        <span className="text-xs text-zinc-500 line-through block">
                          R${" "}
                          {product.price.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      )}
                      <span className="text-lg font-black text-white">
                        R${" "}
                        {displayPrice.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.94 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="text-xs font-bold px-3 py-2 rounded-xl text-white transition-all flex items-center gap-1 shadow-md hover:brightness-110"
                      style={{
                        background: `linear-gradient(135deg, ${accent}, ${accent}bb)`,
                        boxShadow: `0 4px 15px ${accent}40`,
                      }}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      + Sacola
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Indicadores de bolinhas (Dots) interativos */}
      {featured.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {featured.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => scrollToItem(dotIdx)}
              className={`rounded-full transition-all duration-300 ${
                dotIdx === activeIndex
                  ? "w-6 h-1.5 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                  : "w-1.5 h-1.5 bg-white/25 hover:bg-white/50"
              }`}
              aria-label={`Ir para destaque ${dotIdx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
