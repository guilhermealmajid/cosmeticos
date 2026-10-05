"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Sparkles,
  Tag,
  CheckCircle2,
  AlertCircle,
  Droplets,
  MessageCircle,
  Plus,
  Minus,
  ZoomIn,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "../context/CartContext";

const BRAND_COLORS: Record<
  string,
  { accent: string; glow: string; pill: string; border: string }
> = {
  natura: {
    accent: "#EA580C",
    glow: "rgba(234,88,12,0.35)",
    pill: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    border: "border-orange-500/40",
  },
  avon: {
    accent: "#E11D48",
    glow: "rgba(225,29,72,0.35)",
    pill: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    border: "border-rose-500/40",
  },
  jequiti: {
    accent: "#7C3AED",
    glow: "rgba(124,58,237,0.35)",
    pill: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    border: "border-purple-500/40",
  },
};

export default function ProductDetailModal() {
  const { viewedProduct, closeProductDetail, addToCart } = useCart();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Resetar ao abrir novo produto
  useEffect(() => {
    if (viewedProduct) {
      setCurrentImgIndex(0);
      setQuantity(1);
      setIsZoomed(false);
      // Travar rolagem do body quando modal estiver aberto
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [viewedProduct]);

  // Fechar com ESC e navegar carrossel com teclas de seta
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!viewedProduct) return;
      if (e.key === "Escape") {
        closeProductDetail();
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewedProduct, currentImgIndex]);

  if (!viewedProduct) return null;

  const images =
    viewedProduct.images && viewedProduct.images.length > 0
      ? viewedProduct.images.filter((img) => Boolean(img) && img.trim() !== "")
      : ["https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"];

  const brandSlug = viewedProduct.brand.slug.current as keyof typeof BRAND_COLORS;
  const brandStyle = BRAND_COLORS[brandSlug] ?? BRAND_COLORS.natura;
  const hasDiscount =
    viewedProduct.salePrice !== undefined && viewedProduct.salePrice < viewedProduct.price;
  const displayPrice = viewedProduct.salePrice ?? viewedProduct.price;
  const discountPct = hasDiscount
    ? Math.round(((viewedProduct.price - displayPrice) / viewedProduct.price) * 100)
    : 0;
  const unitSavings = hasDiscount ? viewedProduct.price - displayPrice : 0;

  const handlePrevImage = () => {
    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(viewedProduct, quantity);
    setTimeout(() => {
      setIsAdding(false);
      closeProductDetail();
    }, 1200);
  };

  const sellerWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999";
  const whatsappMessage = `Olá! Estava olhando o produto *${viewedProduct.title}* (${viewedProduct.brand.name}) na sua vitrine virtual e gostaria de mais informações! 🌸`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop escurecido com desfoque */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeProductDetail}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        />

        {/* Card Modal Ampliado (Vitrine Destaque) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-zinc-950/95 border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col md:flex-row max-h-[92vh]"
          style={{
            boxShadow: `0 25px 60px -15px ${brandStyle.glow}, 0 0 0 1px rgba(255,255,255,0.08)`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Brilho radial de fundo baseado na marca */}
          <div
            className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-30 blur-3xl -z-10"
            style={{
              background: `radial-gradient(circle, ${brandStyle.accent} 0%, transparent 70%)`,
            }}
          />

          {/* Botão Fechar (X) */}
          <button
            onClick={closeProductDetail}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors shadow-lg"
            aria-label="Fechar detalhes"
          >
            <X className="w-5 h-5" />
          </button>

          {/* COLUNA ESQUERDA: CARROSSEL DE IMAGENS COM ZOOM */}
          <div className="w-full md:w-1/2 flex flex-col bg-zinc-900/50 p-4 sm:p-6 border-b md:border-b-0 md:border-r border-white/10">
            {/* Visualizador Principal de Imagem */}
            <div className="relative aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 group select-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImgIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`w-full h-full relative cursor-pointer ${
                    isZoomed ? "overflow-hidden" : ""
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <Image
                    src={images[currentImgIndex]}
                    alt={viewedProduct.title}
                    fill
                    priority
                    className={`object-cover object-center transition-transform duration-300 ${
                      isZoomed ? "scale-150 cursor-zoom-out" : "group-hover:scale-105 cursor-zoom-in"
                    }`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Botão de Toggle Zoom */}
              <button
                type="button"
                onClick={() => setIsZoomed(!isZoomed)}
                className="absolute top-3 left-3 z-20 flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/15 transition-all shadow-md"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>{isZoomed ? "Zoom -100%" : "Zoom +150%"}</span>
              </button>

              {/* Badges na Imagem */}
              <div className="absolute bottom-3 left-3 z-20 flex flex-wrap gap-1.5 pointer-events-none">
                {hasDiscount && (
                  <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg bg-rose-500 text-white shadow-lg">
                    <Tag className="w-3 h-3" />
                    -{discountPct}% OFF
                  </span>
                )}
                {viewedProduct.isFeatured && (
                  <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg bg-amber-500 text-black shadow-lg">
                    <Sparkles className="w-3 h-3" />
                    Destaque
                  </span>
                )}
              </div>

              {/* Setas de navegação do carrossel (quando há mais de 1 imagem) */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/15 backdrop-blur-md transition-all hover:scale-110 shadow-lg"
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/15 backdrop-blur-md transition-all hover:scale-110 shadow-lg"
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Indicador numérico de imagem */}
              {images.length > 1 && (
                <div className="absolute bottom-3 right-3 z-20 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-[11px] font-medium text-white border border-white/10 pointer-events-none">
                  {currentImgIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Miniaturas do Carrossel */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentImgIndex(idx);
                      setIsZoomed(false);
                    }}
                    className={`relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      idx === currentImgIndex
                        ? "border-white scale-105 shadow-md"
                        : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${viewedProduct.title} - foto ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Dica de interação */}
            <p className="text-[11px] text-zinc-500 mt-2 text-center hidden sm:block">
              Clique na foto para ativar o zoom detalhado ou navegue nas miniaturas
            </p>
          </div>

          {/* COLUNA DIREITA: DETALHES COMPLETOS, ESPECIFICAÇÕES E COMPRA */}
          <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col overflow-y-auto">
            {/* Header: Marcas e Categoria */}
            <div className="flex items-center justify-between gap-2 mb-2 pr-8">
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-lg border backdrop-blur-sm ${brandStyle.pill}`}
              >
                {viewedProduct.brand.name}
              </span>
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                {viewedProduct.category.name}
              </span>
            </div>

            {/* Título Principal */}
            <h2 className="text-xl sm:text-2xl font-black text-white leading-snug mb-2">
              {viewedProduct.title}
            </h2>

            {/* Bloco de Preços e Economia */}
            <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 mb-4">
              <div className="flex items-baseline gap-2.5">
                {hasDiscount && (
                  <span className="text-xs sm:text-sm text-zinc-400 line-through">
                    R${" "}
                    {viewedProduct.price.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                )}
                <span className="text-2xl sm:text-3xl font-black text-white">
                  R${" "}
                  {displayPrice.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
                {viewedProduct.volume && (
                  <span className="text-xs text-zinc-400 ml-auto font-medium">
                    {viewedProduct.volume}
                  </span>
                )}
              </div>

              {hasDiscount && (
                <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  Economia de R${" "}
                  {unitSavings.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  ({discountPct}% de desconto)
                </div>
              )}
            </div>

            {/* Informações de Disponibilidade */}
            <div className="flex items-center gap-4 text-xs mb-4">
              <div className="flex items-center gap-1.5">
                {viewedProduct.inStock ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Produto à Pronta Entrega</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-400 font-semibold">Sob Encomenda (Consulte prazo)</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-1 text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>Original Garantido</span>
              </div>
            </div>

            {/* Pirâmide / Notas Olfativas / Destaques do produto */}
            {viewedProduct.olfactoryNotes && (
              <div className="mb-4 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300 mb-1">
                  <Droplets className="w-3.5 h-3.5 text-purple-400" />
                  Pirâmide Olfativa / Ativos Principais
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {viewedProduct.olfactoryNotes}
                </p>
              </div>
            )}

            {/* Descrição Completa do Produto */}
            <div className="mb-6 flex-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Descrição do Produto
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                {viewedProduct.description ||
                  "Produto oficial e lacrado com garantia de procedência. Ideal para uso diário ou para presentear com sofisticação."}
              </p>
            </div>

            {/* Ações: Seletor de Quantidade + Botão de Adicionar à Sacola */}
            <div className="mt-auto pt-3 border-t border-white/10 space-y-2.5">
              <div className="flex items-center gap-3">
                {/* Seletor de Quantidade */}
                <div className="flex items-center bg-white/5 border border-white/15 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-300 disabled:opacity-30 disabled:hover:bg-transparent"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-300"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Botão de Adicionar à Sacola */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-white transition-all shadow-lg"
                  style={{
                    background: isAdding
                      ? "linear-gradient(135deg, #10b981, #059669)"
                      : `linear-gradient(135deg, ${brandStyle.accent}, ${brandStyle.accent}cc)`,
                    boxShadow: isAdding
                      ? "0 4px 20px rgba(16,185,129,0.4)"
                      : `0 4px 25px ${brandStyle.glow}`,
                  }}
                >
                  {isAdding ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Adicionado com sucesso!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      Adicionar à Sacola • R${" "}
                      {(displayPrice * quantity).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </>
                  )}
                </motion.button>
              </div>

              {/* Botão Direto para Pedido / Dúvidas no WhatsApp */}
              <a
                href={`https://wa.me/${sellerWhatsApp.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-semibold text-xs sm:text-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                Pedir ou Tirar Dúvidas pelo WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
