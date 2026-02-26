/**
 * SectionHeader.tsx — Cabeçalho padrão de seção
 *
 * Componente reutilizável para o título e subtítulo de cada seção.
 * Inclui animação de entrada com Framer Motion (fade + slide up)
 * acionada quando entra na viewport.
 *
 * Props:
 * - tag      → pequena label colorida acima do título (ex: "Nossos Serviços")
 * - title    → título principal da seção
 * - subtitle → texto explicativo opcional
 * - align    → alinhamento do bloco ('center' | 'left')
 * - light    → inverte cores para uso em fundos escuros
 */

'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SectionHeaderProps {
  tag?: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
  light?: boolean  // true = texto branco (para fundos escuros)
  className?: string
}

export default function SectionHeader({
  tag,
  title,
  subtitle,
  align = 'center',
  light = false,
  className = '',
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.4 })

  /* Variantes de animação compartilhadas */
  const variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98], delay },
    }),
  }

  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'
  const textColor  = light ? 'text-white/90' : 'text-[var(--text)]'
  const mutedColor = light ? 'text-white/55' : 'text-[var(--text-muted)]'

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-3 ${alignClass} ${className}`}
    >
      {/* Tag colorida acima do título */}
      {tag && (
        <motion.span
          custom={0}
          variants={variants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="
            inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold
            tracking-widest uppercase
            bg-[var(--brand-glow)] text-[var(--brand)]
            border border-[var(--brand)]/20
          "
        >
          {/* Ponto decorativo */}
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] inline-block" />
          {tag}
        </motion.span>
      )}

      {/* Título principal */}
      <motion.h2
        custom={0.12}
        variants={variants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className={`
          text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight
          font-[family-name:var(--font-display)]
          ${textColor}
        `}
        /* Permite quebra de linha intencional com \n */
        style={{ whiteSpace: 'pre-line' }}
      >
        {title}
      </motion.h2>

      {/* Subtítulo opcional */}
      {subtitle && (
        <motion.p
          custom={0.24}
          variants={variants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className={`
            max-w-2xl text-base sm:text-lg leading-relaxed
            ${mutedColor}
          `}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
