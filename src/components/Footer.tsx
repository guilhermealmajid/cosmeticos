"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Heart, ExternalLink, Camera, Users, Play } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full mt-8 px-4 sm:px-6 lg:px-8 pb-6">
      <div className="max-w-7xl mx-auto glass-panel rounded-2xl p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Coluna Sobre */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 via-amber-500 to-violet-600 p-[1.5px]">
                <div className="w-full h-full bg-zinc-950 rounded-[9px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
              </div>
              <span className="font-black text-lg bg-gradient-to-r from-rose-200 via-amber-100 to-violet-200 bg-clip-text text-transparent">
                Éclat Cosméticos
              </span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4 max-w-xs">
              Consultora oficial multimarcas, trazendo o melhor de Natura, Avon e Jequiti até você. Produtos originais, atendimento personalizado e entrega em domicílio.
            </p>
            <div className="flex items-center gap-2">
              {[
                { icon: Camera, label: "Instagram", href: "#" },
                { icon: Users, label: "Facebook", href: "#" },
                { icon: Play, label: "YouTube", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl glass-pill flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Coluna Marcas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
              Marcas
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: "🌿 Natura", url: "https://www.natura.com.br" },
                { name: "💄 Avon", url: "https://www.avon.com.br" },
                { name: "⭐ Jequiti", url: "https://www.jequiti.com.br" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {item.name}
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
              Links Rápidos
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Catálogo", href: "#catalogo" },
                { label: "Nossas Marcas", href: "#marcas" },
                { label: "Revistas Digitais", href: "#revistas" },
                { label: "Sanity Studio (CMS)", href: "/studio", external: true },
              ].map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <Link
                      href={link.href}
                      target="_blank"
                      className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3 opacity-50" />
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Linha separadora */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-500">
            © {year} Éclat Cosméticos — Consultora Multimarcas. Todos os direitos reservados.
          </p>
          <p className="text-xs text-zinc-600 flex items-center gap-1.5">
            Feito com{" "}
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            {" "}usando Next.js · Sanity · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
