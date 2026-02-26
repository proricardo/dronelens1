/**
 * Testimonials.tsx — Seção de depoimentos
 *
 * Prova social: 3 depoimentos reais de clientes satisfeitos.
 * Reforça confiança antes da seção de contato (posicionamento estratégico).
 *
 * Layout:
 * - Fundo alternado (bg-[var(--bg)]) para contraste com Coverage
 * - 3 cards em grid: 1 col mobile, 3 col desktop
 * - Cada card tem: foto do cliente, nome, empresa, texto, estrelas
 * - Animação stagger suave ao entrar na viewport
 *
 * Extras de credibilidade:
 * - Estrelas de avaliação (5/5)
 * - Aspas decorativas grandes
 * - Nome da empresa em destaque
 */

'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { TESTIMONIALS } from '@/lib/constants'

/* --------------------------------------------------------------- */

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Avaliação ${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < rating
              ? 'fill-brand-gold text-brand-gold'
              : 'fill-transparent text-[var(--border)]'
          }
        />
      ))}
    </div>
  )
}

/* --------------------------------------------------------------- */

function TestimonialCard({
  testimonial,
  index,
  isInView,
}: {
  testimonial: (typeof TESTIMONIALS)[0]
  index: number
  isInView: boolean
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        ease: [0.21, 0.47, 0.32, 0.98],
        delay: index * 0.12,
      }}
      className="
        relative flex flex-col
        p-7 rounded-2xl
        bg-[var(--bg-card)] border border-[var(--border)]
        shadow-[0_2px_16px_rgba(0,0,0,0.04)]
        dark:shadow-[0_2px_16px_rgba(0,0,0,0.2)]
        hover:border-[var(--brand)]/25 hover:shadow-[0_8px_32px_rgba(0,85,255,0.08)]
        transition-all duration-300
      "
    >
      {/* Aspas decorativas — elemento visual de fundo */}
      <Quote
        size={48}
        className="
          absolute top-5 right-5
          text-[var(--brand)] opacity-[0.06]
          rotate-180
        "
        aria-hidden="true"
      />

      {/* Estrelas de avaliação */}
      <StarRating rating={testimonial.rating} />

      {/* Texto do depoimento */}
      <blockquote className="mt-4 mb-6 text-[var(--text-muted)] text-sm leading-relaxed flex-1">
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>

      {/* Perfil do cliente */}
      <div className="flex items-center gap-3 pt-5 border-t border-[var(--border)]">
        {/* Avatar */}
        <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[var(--brand)]/20">
          <Image
            src={testimonial.avatar}
            alt={`Foto de ${testimonial.name}`}
            fill
            quality={75}
            className="object-cover"
            sizes="44px"
          />
        </div>

        {/* Nome e empresa */}
        <div>
          <p className="text-sm font-semibold text-[var(--text)] leading-tight">
            {testimonial.name}
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
      </div>
    </motion.article>
  )
}

/* --------------------------------------------------------------- */

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section className="py-24 bg-[var(--bg)]">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Cabeçalho */}
        <SectionHeader
          tag="Depoimentos"
          title="O que nossos clientes dizem"
          subtitle="Trabalhamos para que cada projeto supere as expectativas. Veja o que quem voou conosco tem a dizer."
          align="center"
          className="mb-14"
        />

        {/* Grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Indicador de confiança abaixo dos cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="
            mt-12 flex flex-wrap items-center justify-center gap-8
            text-sm text-[var(--text-muted)]
          "
        >
          {/* Avaliação média */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="fill-brand-gold text-brand-gold" />
              ))}
            </div>
            <span className="font-semibold text-[var(--text)]">5.0</span>
            <span>média de avaliação</span>
          </div>

          <span className="w-px h-4 bg-[var(--border)] hidden sm:block" aria-hidden="true" />

          {/* Número de clientes */}
          <span>
            <strong className="text-[var(--text)]">200+</strong> clientes satisfeitos
          </span>

          <span className="w-px h-4 bg-[var(--border)] hidden sm:block" aria-hidden="true" />

          {/* Recomendações */}
          <span>
            <strong className="text-[var(--text)]">97%</strong> de taxa de recomendação
          </span>
        </motion.div>
      </div>
    </section>
  )
}
