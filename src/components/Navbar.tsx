"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Sparkles, BookOpen, Menu, X, Database } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full px-2 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-2 transition-all">
      <div className="max-w-7xl mx-auto glass-panel rounded-xl sm:rounded-2xl px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between shadow-2xl">
        {/* Logo / Marca */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-tr from-rose-500 via-amber-500 to-violet-600 p-[1.5px] transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
            <div className="w-full h-full bg-zinc-950 rounded-[7px] sm:rounded-[10px] flex items-center justify-center backdrop-blur-md">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-extrabold text-sm sm:text-xl tracking-tight bg-gradient-to-r from-rose-200 via-amber-100 to-violet-200 bg-clip-text text-transparent">
                Éclat Cosméticos
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Multimarcas
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-zinc-400 font-medium hidden sm:block">
              Consultora Oficial • Natura • Avon • Jequiti
            </p>
          </div>
        </Link>

        {/* Links Desktop */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <Link
            href="#catalogo"
            className="px-3 py-1.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
          >
            Catálogo
          </Link>
          <Link
            href="#marcas"
            className="px-3 py-1.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
          >
            Marcas
          </Link>
          <Link
            href="#revistas"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Revistas Virtuais</span>
          </Link>
          <Link
            href="/studio"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-colors border border-white/10"
            title="Acessar Sanity CMS Studio"
          >
            <Database className="w-3.5 h-3.5 text-violet-400" />
            <span>Sanity Studio</span>
          </Link>
        </nav>

        {/* Ações (Carrinho + Mobile Menu Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Botão da Sacola */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="relative glass-button px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl flex items-center gap-1.5 sm:gap-2 text-zinc-100 hover:text-white group"
            aria-label="Abrir Sacola de Pedidos"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 min-w-[18px] h-4.5 px-1 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[10px] sm:text-[11px] font-bold rounded-full flex items-center justify-center shadow-lg border border-black/30"
                >
                  {totalItems}
                </motion.span>
              )}
            </div>
            <span className="text-xs font-semibold hidden xs:inline-block">
              Sacola
            </span>
          </motion.button>

          {/* Toggle Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden glass-pill p-2 rounded-xl text-zinc-300 hover:text-white"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 glass-panel rounded-2xl p-4 shadow-xl flex flex-col gap-2"
          >
            <Link
              href="#catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-200 hover:bg-white/10 transition-colors"
            >
              Catálogo de Produtos
            </Link>
            <Link
              href="#marcas"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-200 hover:bg-white/10 transition-colors"
            >
              Nossas Marcas (Natura, Avon, Jequiti)
            </Link>
            <Link
              href="#revistas"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-200 hover:bg-white/10 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Revistas e Folhetos Digitais</span>
            </Link>
            <div className="pt-2 border-t border-white/10 flex justify-between items-center px-1">
              <span className="text-xs text-zinc-400">Gerenciador CMS:</span>
              <Link
                href="/studio"
                target="_blank"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 text-xs font-semibold text-violet-300 hover:underline"
              >
                <Database className="w-3.5 h-3.5" />
                Sanity Studio
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
