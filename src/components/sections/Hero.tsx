/**
 * Hero.tsx — Seção principal (above the fold)
 *
 * Objetivo: máximo impacto visual na primeira tela.
 *
 * Estrutura visual:
 * - Fundo: imagem aérea de alta qualidade com overlay gradiente
 * - Partícula decorativa animada (drone SVG flutuante)
 * - Badge de localização (Curitiba · América do Sul)
 * - Headline principal com animação word-by-word
 * - Subtítulo com fade in
 * - Dois CTAs: "Ver Portfólio" e "Solicitar Orçamento"
 * - Linha de trust: tecnologia DJI + anos de experiência
 * - Indicador de scroll animado
 *
 * Animações (Framer Motion):
 * - Stagger container → cada filho anima em sequência
 * - Fade + slide up em todos os elementos
 * - Blur → clear na headline (efeito premium)
 * - Float no ícone de drone (CSS keyframe via Tailwind custom)
 *
 * Performance:
 * - Next.js <Image> com priority=true para LCP otimizado
 * - Overlay via CSS (sem JS extra)
 */

'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDown, Play, ArrowRight, MapPin } from 'lucide-react'

/* --------------------------------------------------------------- */

/* Variantes de animação reutilizadas dentro da Hero */
const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98],
      delay,
    },
  }),
}

/* Palavras da headline, animadas individualmente */
const HEADLINE_WORDS = ['Voe', 'além', 'do', 'convencional.']

/* Ícone SVG de drone decorativo */
function DroneIcon() {
  return (
    <svg
      viewBox="0 0 64 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Braços */}
      <line x1="12" y1="20" x2="52" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="8"  x2="32" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round" />
      {/* Hélices */}
      <ellipse cx="12" cy="14" rx="9" ry="4" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" />
      <ellipse cx="52" cy="14" rx="9" ry="4" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" />
      <ellipse cx="12" cy="26" rx="9" ry="4" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" />
      <ellipse cx="52" cy="26" rx="9" ry="4" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" />
      {/* Corpo central */}
      <rect x="26" y="16" width="12" height="8" rx="3" fill="white" fillOpacity="0.9" />
      {/* Lente */}
      <circle cx="32" cy="20" r="2.5" fill="#0055FF" />
    </svg>
  )
}

/* --------------------------------------------------------------- */

export default function Hero() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">

      {/* ── Background: imagem aérea ─────────────────────────────
          priority=true garante carregamento antes de qualquer JS.
          Placeholder blur evita CLS durante o carregamento.
       ─────────────────────────────────────────────────────────── */}
      <Image
        src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&h=1080&q=90&auto=format&fit=crop"
        alt="Vista aérea de cidade ao entardecer — DroneLENS"
        fill
        priority
        quality={90}
        className="object-cover object-center scale-105"  // scale para suavizar border ao animar
        sizes="100vw"
      />

      {/* ── Overlay multicamadas para legibilidade e drama ────── */}
      {/*  Gradiente escuro + vinheta nas bordas                  */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(8, 13, 26, 0.55) 0%,
              rgba(8, 13, 26, 0.35) 40%,
              rgba(8, 13, 26, 0.70) 80%,
              rgba(8, 13, 26, 0.92) 100%
            )
          `,
        }}
        aria-hidden="true"
      />
      {/* Leve gradiente lateral para profundidade */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(ellipse at 70% 50%, transparent 40%, rgba(8,13,26,0.4) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Drone decorativo flutuante ───────────────────────── */}
      <motion.div
        animate={{ y: [-8, 8, -8], rotate: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="
          absolute top-1/4 right-[8%] z-20
          w-28 h-16 opacity-25
          hidden lg:block
        "
        aria-hidden="true"
      >
        <DroneIcon />
      </motion.div>

      {/* ── Conteúdo principal ──────────────────────────────── */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="max-w-3xl">

          {/* Badge de localização */}
          <motion.div
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 mb-8"
          >
            <span
              className="
                flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium
                glass text-white/80
                border border-white/15
              "
            >
              <MapPin size={12} className="text-brand-cyan" />
              Curitiba, PR · América do Sul
            </span>
            <span
              className="
                px-3 py-1.5 rounded-full text-xs font-semibold
                bg-brand-gradient text-white
              "
            >
              10+ anos de experiência
            </span>
          </motion.div>

          {/* Headline — palavra por palavra */}
          <h1
            className="
              font-[family-name:var(--font-display)]
              text-5xl sm:text-6xl lg:text-7xl xl:text-8xl
              font-bold leading-[1.05] tracking-tight
              text-white mb-7
            "
          >
            <span className="flex flex-wrap gap-x-[0.3em] gap-y-2">
              {HEADLINE_WORDS.map((word, i) => (
                <motion.span
                  key={word}
                  custom={0.3 + i * 0.12}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className={
                    /* Última palavra com gradiente de marca */
                    i === HEADLINE_WORDS.length - 1
                      ? 'text-gradient'
                      : 'text-white'
                  }
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Subtítulo */}
          <motion.p
            custom={0.7}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="
              text-lg sm:text-xl text-white/65 leading-relaxed
              max-w-2xl mb-10
            "
          >
            Filmagem aérea profissional com drones DJI de última geração.
            Transformamos perspectivas únicas em histórias poderosas —
            para sua marca, evento, empreendimento ou estrutura.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={0.85}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4 mb-16"
          >
            {/* CTA primário — âncora portfólio */}
            <a
              href="#portfolio"
              className="
                flex items-center gap-2.5
                px-7 py-3.5 rounded-full
                bg-brand-gradient text-white font-semibold text-sm
                shadow-[0_8px_32px_rgba(0,85,255,0.45)]
                hover:shadow-[0_8px_40px_rgba(0,85,255,0.65)]
                hover:scale-105 active:scale-95
                transition-all duration-200
              "
            >
              <Play size={16} fill="white" strokeWidth={0} />
              Ver Portfólio
            </a>

            {/* CTA secundário — âncora contato */}
            <a
              href="#contato"
              className="
                flex items-center gap-2.5
                px-7 py-3.5 rounded-full
                glass text-white font-semibold text-sm
                border border-white/20
                hover:bg-white/15 hover:border-white/35
                hover:scale-105 active:scale-95
                transition-all duration-200
              "
            >
              Solicitar Orçamento
              <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Linha de trust: tecnologia + credencial */}
          <motion.div
            custom={1.0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center gap-6"
          >
            {[
              { label: 'Drones DJI Pro', icon: '🚁' },
              { label: '4K · 6K · RAW', icon: '🎬' },
              { label: 'ANAC Habilitado', icon: '✅' },
              { label: 'Seguro Aeronáutico', icon: '🛡️' },
            ].map(({ label, icon }) => (
              <span key={label} className="flex items-center gap-2 text-xs text-white/50 font-medium">
                <span aria-hidden="true">{icon}</span>
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Indicador de scroll ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs text-white/40 tracking-widest uppercase font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-white/40" />
        </motion.div>
      </motion.div>

    </div>
  )
}
