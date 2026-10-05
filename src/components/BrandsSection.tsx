"use client";

import { motion } from "framer-motion";
import { ExternalLink, BookOpen, ArrowRight } from "lucide-react";
import { Brand } from "../types";

interface BrandsSectionProps {
  brands: Brand[];
}

const BRAND_GRADIENTS: Record<string, string> = {
  natura: "from-amber-600/30 via-orange-600/20 to-emerald-900/20",
  avon: "from-rose-600/30 via-pink-600/20 to-fuchsia-900/20",
  jequiti: "from-purple-600/30 via-violet-600/20 to-indigo-900/20",
};

const BRAND_ACCENTS: Record<string, string> = {
  natura: "#EA580C",
  avon: "#E11D48",
  jequiti: "#7C3AED",
};

const BRAND_ICONS: Record<string, string> = {
  natura: "🌿",
  avon: "💄",
  jequiti: "⭐",
};

export default function BrandsSection({ brands }: BrandsSectionProps) {
  return (
    <section id="marcas" className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
          🤝 Parcerias Oficiais
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-1">
          As Marcas que Represento
        </h2>
        <p className="text-zinc-400 max-w-xl">
          Sou consultora oficial das 3 maiores marcas de cosméticos do Brasil. Pedidos diretos, produtos originais.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {brands.map((brand, i) => {
          const slug = brand.slug.current;
          const accent = BRAND_ACCENTS[slug] ?? "#EA580C";
          const gradient = BRAND_GRADIENTS[slug] ?? "";
          const icon = BRAND_ICONS[slug] ?? "✨";

          return (
            <motion.div
              key={brand._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.55, ease: "easeOut" }}
              className="glass-card rounded-2xl p-6 flex flex-col relative overflow-hidden group"
            >
              {/* Gradiente de fundo da marca */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-opacity duration-500 group-hover:opacity-150`} />

              {/* Brilho superior */}
              <div
                className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-[60px] opacity-20 group-hover:opacity-35 transition-opacity duration-500"
                style={{ backgroundColor: accent }}
              />

              <div className="relative z-10">
                {/* Ícone + Nome */}
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg border border-white/15 flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${accent}30, ${accent}15)`,
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">{brand.name}</h3>
                    <p
                      className="text-sm font-medium italic"
                      style={{ color: `${accent}cc` }}
                    >
                      &ldquo;{brand.slogan}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Descrição */}
                <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                  {brand.description}
                </p>

                {/* Ações */}
                <div className="flex flex-col gap-2.5">
                  <a
                    href={brand.catalogUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white transition-all border border-white/10 hover:border-white/25"
                    style={{
                      background: `linear-gradient(135deg, ${accent}30, ${accent}15)`,
                      boxShadow: `0 4px 20px ${accent}20`,
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Ver Revista Digital
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>
                  <a
                    href={`#catalogo`}
                    className="flex items-center justify-between gap-2 py-2.5 px-4 rounded-xl text-sm font-medium text-zinc-300 hover:text-white glass-pill transition-all"
                  >
                    <span>Ver Produtos {brand.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
