"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Eye,
  Sparkles,
  Tag,
  CheckCircle2,
  AlertCircle,
  ZoomIn,
} from "lucide-react";
import { Product } from "../types";
import { useCart } from "../context/CartContext";

const BRAND_COLORS: Record<string, { accent: string; glow: string; pill: string }> = {
  natura: {
    accent: "#EA580C",
    glow: "rgba(234,88,12,0.35)",
    pill: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  },
  avon: {
    accent: "#E11D48",
    glow: "rgba(225,29,72,0.35)",
    pill: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  },
  jequiti: {
    accent: "#7C3AED",
    glow: "rgba(124,58,237,0.35)",
    pill: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
};

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, openProductDetail } = useCart();
  const [currentImg, setCurrentImg] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const brandSlug = product.brand.slug.current as keyof typeof BRAND_COLORS;
  const brandStyle = BRAND_COLORS[brandSlug] ?? BRAND_COLORS.natura;
  const hasDiscount =
    product.salePrice !== undefined && product.salePrice < product.price;
  const displayPrice = product.salePrice ?? product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.price - displayPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1500);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
      onClick={() => openProductDetail(product)}
      className="group glass-card rounded-xl sm:rounded-2xl overflow-hidden flex flex-col relative cursor-pointer hover:border-white/25 transition-all"
    >
      {/* Brilho hover colorido por marca */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-xl sm:rounded-2xl transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${brandStyle.glow} 0%, transparent 65%)`,
        }}
      />

      {/* Imagem */}
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900/60">
        {/* Indicador de zoom ao passar o mouse */}
        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-10">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-semibold shadow-xl border border-white/20 scale-90 group-hover:scale-100 transition-transform duration-300">
            <ZoomIn className="w-3.5 h-3.5 text-amber-300" />
            Ampliar vitrine
          </span>
        </div>
        <motion.div
          key={currentImg}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          {(() => {
            const rawSrc = product.images?.[currentImg];
            const imgSrc =
              rawSrc && rawSrc.trim() !== ""
                ? rawSrc
                : "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80";
            return (
              <Image
                src={imgSrc}
                alt={product.title || "Produto"}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            );
          })()}
        </motion.div>

        {/* Overlay de badges */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 flex flex-col gap-1">
          {hasDiscount && (
            <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg bg-rose-500 text-white shadow-lg">
              <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              -{discountPct}%
            </span>
          )}
          {product.isFeatured && (
            <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg bg-amber-500/90 text-black shadow-lg">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              Destaque
            </span>
          )}
        </div>

        {/* Badge da marca */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10">
          <span
            className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg border backdrop-blur-sm ${brandStyle.pill}`}
          >
            {product.brand.name}
          </span>
        </div>

        {/* Miniatura de troca de imagem */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1">
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImg(i);
                }}
                className={`rounded-full transition-all ${
                  i === currentImg ? "w-4 sm:w-5 h-1.5 sm:h-2" : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40"
                }`}
                style={
                  i === currentImg
                    ? { background: brandStyle.accent }
                    : {}
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex-1 p-3 sm:p-4 flex flex-col gap-1.5 sm:gap-2">
        {/* Categoria */}
        <span className="text-[10px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-wide">
          {product.category.name}
        </span>

        {/* Nome */}
        <h3 className="font-bold text-zinc-100 text-xs sm:text-sm leading-tight line-clamp-2 min-h-[2rem] sm:min-h-[2.25rem]">
          {product.title}
        </h3>

        {/* Notas Olfativas / Ativos */}
        {product.olfactoryNotes && (
          <p className="text-[11px] sm:text-xs text-zinc-400 line-clamp-1">{product.olfactoryNotes}</p>
        )}

        {/* Preço */}
        <div className="flex items-end gap-2 mt-auto pt-1 sm:pt-2">
          <div>
            {hasDiscount && (
              <span className="text-[10px] sm:text-xs text-zinc-500 line-through block leading-none mb-0.5">
                R${" "}
                {product.price.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            )}
            <span className="text-lg sm:text-xl font-black text-white leading-none">
              R${" "}
              {displayPrice.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          {product.volume && (
            <span className="text-[10px] sm:text-xs text-zinc-500 mb-0.5 ml-auto">{product.volume}</span>
          )}
        </div>

        {/* Status de Estoque */}
        <div className="flex items-center gap-1 text-[11px] sm:text-xs">
          {product.inStock ? (
            <>
              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Pronta Entrega</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
              <span className="text-amber-400 font-medium">Consultar Prazo</span>
            </>
          )}
        </div>
      </div>

      {/* Ações */}
      <div className="p-3 sm:p-4 pt-0 flex gap-1.5 sm:gap-2">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleAddToCart}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white transition-all"
          style={{
            background: isAdding
              ? "linear-gradient(135deg, #10b981, #059669)"
              : `linear-gradient(135deg, ${brandStyle.accent}, ${brandStyle.accent}bb)`,
            boxShadow: isAdding
              ? "0 4px 20px rgba(16,185,129,0.4)"
              : `0 4px 20px ${brandStyle.glow}`,
          }}
        >
          {isAdding ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Adicionado!
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Adicionar
            </>
          )}
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.94 }}
          onClick={(e) => {
            e.stopPropagation();
            openProductDetail(product);
          }}
          className="glass-pill px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-zinc-300 hover:text-white transition-colors flex items-center justify-center"
          title="Ver detalhes do produto e fotos ampliadas"
        >
          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </motion.button>
      </div>
    </motion.article>
  );
}
