"use client";

import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Sparkles } from "lucide-react";
import { Brand } from "../types";

interface MagazinesSectionProps {
  brands: Brand[];
}

const BRAND_ICONS: Record<string, string> = {
  natura: "🌿",
  avon: "💄",
  jequiti: "⭐",
};

const BRAND_BADGES: Record<string, string> = {
  natura: "Sustentável & Vegano",
  avon: "Cruelty Free",
  jequiti: "Artistas do SBT",
};

const BRAND_CYCLE_LABELS: Record<string, string> = {
  natura: "Ciclo Atual",
  avon: "Folheto Digital",
  jequiti: "Revista Atual",
};

export default function MagazinesSection({ brands }: MagazinesSectionProps) {
  // Filtra apenas marcas que possuem catalogUrl
  const magazineBrands = brands.filter((b) => b.catalogUrl);

  return (
    <section id="revistas" className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
          📚 Explore Online
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
          Revistas & Folhetos Digitais
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Folheie os catálogos completos das marcas e descubra todas as ofertas e lançamentos da temporada.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {magazineBrands.map((brand, i) => {
          const slug = brand.slug.current;
          const icon = BRAND_ICONS[slug] ?? "✨";
          const badge = BRAND_BADGES[slug] ?? "";
          const cycle = BRAND_CYCLE_LABELS[slug] ?? "Catálogo";
          const accent = brand.accentColor ?? "#EA580C";
          const gradient = brand.gradient
            ? `from-${brand.gradient.split(" ").find((c: string) => c.startsWith("from-"))?.replace("from-", "") ?? "zinc-500/25"} to-${brand.gradient.split(" ").find((c: string) => c.startsWith("to-"))?.replace("to-", "") ?? "zinc-700/15"}`
            : "from-zinc-500/25 to-zinc-700/15";

          return (
            <motion.a
              key={brand._id}
              href={brand.catalogUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="glass-card rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden group cursor-pointer"
            >
              {/* Brilho */}
              <div
                className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-[50px] opacity-30 group-hover:opacity-50 transition-opacity"
                style={{ backgroundColor: accent }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-lg border border-white/15"
                    style={{ background: `linear-gradient(135deg, ${accent}35, ${accent}15)` }}
                  >
                    {icon}
                  </div>
                  {badge && (
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg border"
                      style={{
                        color: accent,
                        borderColor: `${accent}50`,
                        background: `${accent}15`,
                      }}
                    >
                      {badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-black text-white mb-0.5">{brand.name}</h3>
                <p
                  className="text-xs font-semibold mb-2"
                  style={{ color: `${accent}cc` }}
                >
                  {cycle}
                </p>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  {brand.description}
                </p>

                <div
                  className="flex items-center justify-between py-2.5 px-4 rounded-xl text-sm font-semibold text-white border border-white/10"
                  style={{
                    background: `linear-gradient(135deg, ${accent}30, ${accent}15)`,
                  }}
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Abrir Revista
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* CTA WhatsApp Centralizado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8 glass-panel rounded-2xl p-6 sm:p-8 text-center"
      >
        <div className="flex justify-center mb-3">
          <span className="text-4xl">📱</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
          Encontrou algo que gostou?
        </h3>
        <p className="text-zinc-400 mb-5 max-w-md mx-auto text-sm sm:text-base">
          Me envie uma mensagem com o nome e código do produto diretamente pelo WhatsApp! Faço pedidos de todas as 3 marcas.
        </p>
        <motion.a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999"}?text=${encodeURIComponent("Olá! Gostaria de fazer um pedido de cosméticos. Pode me ajudar? 😊")}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg hover:shadow-emerald-500/40 transition-all text-sm sm:text-base"
        >
          <Sparkles className="w-4 h-4" />
          Falar com a Consultora
        </motion.a>
      </motion.div>
    </section>
  );
}
