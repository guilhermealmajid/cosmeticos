"use client";

import { motion } from "framer-motion";

export default function LiquidBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Orbe 1 - Natura (Laranja / Âmbar) */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.25, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -left-32 w-96 h-96 md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-br from-amber-600/25 via-orange-600/20 to-transparent blur-[110px]"
      />

      {/* Orbe 2 - Avon (Rosa / Magenta) */}
      <motion.div
        animate={{
          x: [0, -70, 50, 0],
          y: [0, 70, -50, 0],
          scale: [1, 1.15, 0.85, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/3 -right-32 w-80 h-80 md:w-[550px] md:h-[550px] rounded-full bg-gradient-to-bl from-rose-600/25 via-pink-600/20 to-fuchsia-900/20 blur-[120px]"
      />

      {/* Orbe 3 - Jequiti (Violeta / Azul) */}
      <motion.div
        animate={{
          x: [0, 60, -60, 0],
          y: [0, -50, 60, 0],
          scale: [0.9, 1.2, 1, 0.9],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute -bottom-32 left-1/4 w-96 h-96 md:w-[700px] md:h-[700px] rounded-full bg-gradient-to-tr from-purple-600/20 via-indigo-600/20 to-violet-950/20 blur-[130px]"
      />

      {/* Grid sutil para textura de vidro líquido */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}
