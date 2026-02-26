/**
 * Services.tsx — Seção de serviços
 *
 * Exibe os 6 serviços da DroneLENS em cards responsivos com:
 * - Imagem de fundo (Unsplash, fotorrealista)
 * - Overlay escuro que revela descrição completa no hover
 * - Ícone + tag do segmento
 * - Animação stagger quando entra na viewport
 *
 * Layout:
 * - 3 colunas em desktop
 * - 2 colunas em tablet
 * - 1 coluna em mobile
 *
 * Interatividade (CSS + Framer):
 * - hover: imagem amplia ligeiramente (scale 1.06)
 * - hover: overlay opacifica
 * - hover: descrição completa desliza de baixo para cima
 * - hover: borda inferior com cor do serviço aparece
 */

'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SERVICES } from '@/lib/constants'
import SectionHeader from '@/components/ui/SectionHeader'

/* --------------------------------------------------------------- */

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { Icon } = service

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98],
        delay: index * 0.08,  // stagger por índice
      }}
      /* group: ativa pseudo-states nos filhos via Tailwind group-hover */
      className="group relative rounded-2xl overflow-hidden cursor-pointer card-glow transition-all duration-300"
      style={{ minHeight: '360px' }}
    >
      {/* ── Imagem de fundo ──────────────────────────────────── */}
      <Image
        src={service.image}
        alt={`${service.title} — DroneLENS`}
        fill
        quality={80}
        className="
          object-cover object-center
          scale-100 group-hover:scale-[1.06]
          transition-transform duration-700 ease-out
        "
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* ── Overlay base: gradiente permanente (legibilidade) ── */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-t from-dark-900/90 via-dark-900/40 to-transparent
          group-hover:from-dark-900/97 group-hover:via-dark-900/60
          transition-all duration-400
        "
        aria-hidden="true"
      />

      {/* ── Conteúdo do card ─────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">

        {/* Tag do segmento — canto superior direito */}
        <span
          className="
            absolute top-5 right-5
            px-2.5 py-1 rounded-full text-[10px] font-bold
            tracking-wider uppercase
            bg-white/10 backdrop-blur-sm text-white/80
            border border-white/15
          "
        >
          {service.tag}
        </span>

        {/* Ícone do serviço */}
        <div
          className={`
            w-11 h-11 rounded-xl mb-4 flex items-center justify-center
            bg-gradient-to-br ${service.color}
            shadow-[0_4px_20px_rgba(0,0,0,0.3)]
            group-hover:scale-110
            transition-transform duration-300
          `}
        >
          <Icon size={20} strokeWidth={1.8} className="text-white" />
        </div>

        {/* Título */}
        <h3 className="text-white text-xl font-bold font-[family-name:var(--font-display)] mb-2 leading-snug">
          {service.title}
        </h3>

        {/* Descrição curta — sempre visível */}
        <p className="text-white/65 text-sm leading-relaxed mb-0">
          {service.description}
        </p>

        {/*
         * Descrição longa — oculta por padrão, aparece no hover.
         * Usamos max-height + opacity para transição suave.
         */}
        <div
          className="
            overflow-hidden
            max-h-0 opacity-0
            group-hover:max-h-32 group-hover:opacity-100 group-hover:mt-3
            transition-all duration-400 ease-out
          "
        >
          <p className="text-white/80 text-sm leading-relaxed">
            {service.longDescription}
          </p>
          {/* Link de ação sutil */}
          <button className="mt-3 text-xs font-semibold text-brand-cyan flex items-center gap-1 hover:gap-2 transition-all">
            Saiba mais →
          </button>
        </div>

        {/* Borda colorida inferior — aparece no hover */}
        <div
          className={`
            absolute bottom-0 left-0 right-0 h-0.5
            bg-gradient-to-r ${service.color}
            scale-x-0 group-hover:scale-x-100
            origin-left transition-transform duration-400
          `}
          aria-hidden="true"
        />
      </div>
    </motion.div>
  )
}

/* --------------------------------------------------------------- */

export default function Services() {
  return (
    <section className="py-24 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabeçalho da seção */}
        <SectionHeader
          tag="Nossos Serviços"
          title={"O que fazemos\nmelhor"}
          subtitle="Soluções aéreas completas para os mais diversos segmentos. Cada projeto é único — e assim tratamos cada voo."
          align="center"
          className="mb-14"
        />

        {/* Grade de cards de serviços */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA após a grade */}
        <div className="text-center mt-12">
          <p className="text-[var(--text-muted)] text-sm mb-4">
            Não encontrou o que procura?
          </p>
          <a
            href="#contato"
            className="
              inline-flex items-center gap-2
              px-6 py-3 rounded-full text-sm font-semibold
              border border-[var(--brand)] text-[var(--brand)]
              hover:bg-[var(--brand)] hover:text-white
              transition-all duration-200
            "
          >
            Fale com nossa equipe
          </a>
        </div>

      </div>
    </section>
  )
}
