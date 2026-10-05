"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import { SlideItem } from "../types";

const BRANDS_ACCENTS: Record<string, string> = {
  natura: "#EA580C",
  avon: "#E11D48",
  jequiti: "#7C3AED",
};

interface HeroSliderProps {
  slides: SlideItem[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [isPaused, goNext, slides.length]);

  if (!slides || slides.length === 0) return null;

  const slide = slides[current];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "80%" : "-80%",
      opacity: 0,
      scale: 0.95,
      filter: "blur(12px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-60%" : "60%",
      opacity: 0,
      scale: 0.92,
      filter: "blur(8px)",
    }),
  };

  const textVariants = {
    enter: { y: 32, opacity: 0 },
    center: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  const accentColor = BRANDS_ACCENTS[slide.brandSlug] ?? "#EA580C";

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl"
      style={{ minHeight: "380px", height: "clamp(380px, 68vh, 750px)" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background da imagem com overlay */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={`bg-${slide._id}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          {(() => {
            const heroImg =
              slide.imageUrl && slide.imageUrl.trim() !== ""
                ? slide.imageUrl
                : "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80";
            return (
              <Image
                src={heroImg}
                alt={slide.title || "Slide"}
                fill
                priority={current === 0}
                className="object-cover object-center"
                sizes="100vw"
              />
            );
          })()}
          {/* Overlay gradiente responsivo à marca */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${slide.gradientTheme} to-zinc-950/90`}
          />
          {/* Gradiente de fade no rodapé */}
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-zinc-950/90 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Orbe luminoso animado baseado na marca */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`orb-${slide._id}`}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.35 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute -bottom-32 -left-20 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />
      </AnimatePresence>

      {/* Conteúdo do Slide */}
      <div className="relative z-10 h-full flex items-end md:items-center px-4 sm:px-10 md:px-16 pb-12 sm:pb-16 md:pb-0">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide._id}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              variants={{ enter: {}, center: {}, exit: {} }}
            >
              {/* Tag / Selo da Marca */}
              <motion.div
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ delay: 0.05, duration: 0.5 }}
                className="mb-2.5 sm:mb-4 flex items-center gap-2 flex-wrap"
              >
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold tracking-widest uppercase px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border glass-pill"
                  style={{
                    color: accentColor,
                    borderColor: `${accentColor}50`,
                    boxShadow: `0 0 18px ${accentColor}30`,
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                  {slide.tagline}
                </span>
              </motion.div>

              {/* Título Principal */}
              <motion.h1
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ delay: 0.1, duration: 0.55, ease: "easeOut" }}
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-2 sm:mb-3"
                style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
              >
                {slide.title}
              </motion.h1>

              {/* Subtítulo */}
              <motion.p
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ delay: 0.18, duration: 0.55 }}
                className="text-zinc-200/90 text-xs sm:text-base md:text-xl leading-relaxed mb-4 sm:mb-6 max-w-xl line-clamp-3 sm:line-clamp-none"
                style={{ textShadow: "0 2px 15px rgba(0,0,0,0.5)" }}
              >
                {slide.subtitle}
              </motion.p>

              {/* Preço + CTA */}
              <motion.div
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ delay: 0.25, duration: 0.5 }}
                className="flex flex-wrap items-center gap-2 sm:gap-3"
              >
                {slide.priceNote && (
                  <span className="glass-pill px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-white/90">
                    {slide.priceNote}
                  </span>
                )}
                <motion.a
                  href={slide.ctaLink}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl font-bold text-white text-xs sm:text-base shadow-xl transition-all"
                  style={{
                    backgroundColor: accentColor,
                    boxShadow: `0 8px 25px ${accentColor}60`,
                  }}
                >
                  {slide.ctaText}
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </motion.a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controles de Navegação */}
      <div className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={goPrev}
          className="glass-pill p-2 sm:p-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/15 transition-all"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={goNext}
          className="glass-pill p-2 sm:p-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/15 transition-all"
          aria-label="Próximo slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      </div>

      {/* Indicadores (dots) */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s._id}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`rounded-full transition-all duration-400 ${
              i === current
                ? "w-6 sm:w-7 h-2 sm:h-2.5"
                : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/30 hover:bg-white/50"
            }`}
            style={
              i === current
                ? {
                    background: `linear-gradient(90deg, ${accentColor}, ${accentColor}90)`,
                    boxShadow: `0 0 10px ${accentColor}80`,
                  }
                : {}
            }
            aria-label={`Ir para slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progresso automático */}
      {!isPaused && (
        <motion.div
          key={`progress-${current}`}
          className="absolute bottom-0 left-0 h-[3px] z-20"
          initial={{ width: "0%", opacity: 0.7 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ duration: 6, ease: "linear" }}
          style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}50)` }}
        />
      )}
    </section>
  );
}
