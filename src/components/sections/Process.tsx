/**
 * Process.tsx — Seção "Como trabalhamos"
 *
 * Explica o processo de trabalho da DroneLENS em 3 etapas simples.
 * Reduz atrito na jornada do lead ao mostrar que contratar é simples.
 *
 * Layout:
 * - Fundo com gradiente escuro (destaque visual entre seções claras)
 * - 3 cards horizontais com número da etapa, título e descrição
 * - Linha conectora entre os cards (desktop)
 * - Animação stagger ao entrar na viewport
 *
 * Seção sem ID próprio (aparece entre Portfolio e Coverage)
 * mas com CTA para #contato.
 */

'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageSquare, Navigation, Package } from 'lucide-react'
import { PROCESS_STEPS } from '@/lib/constants'

/* Ícones mapeados por índice para cada etapa */
const STEP_ICONS = [MessageSquare, Navigation, Package]

/* --------------------------------------------------------------- */

function StepCard({
  step,
  index,
  isInView,
}: {
  step: (typeof PROCESS_STEPS)[0]
  index: number
  isInView: boolean
}) {
  const Icon = STEP_ICONS[index]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98],
        delay: index * 0.15,
      }}
      className="
        relative flex flex-col items-center text-center
        px-6 py-8
      "
    >
      {/* Número da etapa — flutuante acima do ícone */}
      <span
        className="
          absolute -top-3 left-1/2 -translate-x-1/2
          text-[80px] font-black leading-none
          text-white/[0.03]
          font-[family-name:var(--font-display)]
          select-none pointer-events-none
        "
        aria-hidden="true"
      >
        {step.step}
      </span>

      {/* Ícone em círculo com glow */}
      <div
        className="
          relative w-16 h-16 rounded-2xl mb-6
          flex items-center justify-center
          bg-white/[0.06]
          border border-white/10
          shadow-[0_0_24px_rgba(0,85,255,0.2)]
          animate-[glow-pulse_3s_ease-in-out_infinite]
        "
        style={{ animationDelay: `${index * 0.8}s` }}
      >
        {/* Badge de número */}
        <span
          className="
            absolute -top-2 -right-2
            w-6 h-6 rounded-full
            bg-brand-gradient
            text-white text-[10px] font-bold
            flex items-center justify-center
          "
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <Icon size={26} strokeWidth={1.5} className="text-white/80" />
      </div>

      {/* Título da etapa */}
      <h3 className="text-white text-xl font-bold font-[family-name:var(--font-display)] mb-3">
        {step.title}
      </h3>

      {/* Descrição */}
      <p className="text-white/55 text-sm leading-relaxed max-w-xs">
        {step.description}
      </p>
    </motion.div>
  )
}

/* --------------------------------------------------------------- */

export default function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #080D1A 0%, #0D1B2E 50%, #0A1020 100%)',
      }}
    >
      {/* Decoração de fundo: grade sutil */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Glow decorativo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #0055FF 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>

        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="
              inline-flex items-center gap-2 px-3 py-1 rounded-full
              text-xs font-semibold tracking-widest uppercase mb-4
              text-brand-cyan border border-brand-cyan/20 bg-brand-cyan/5
            "
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan inline-block" />
            Como funciona
          </span>
          <h2
            className="
              text-3xl sm:text-4xl lg:text-5xl font-bold text-white
              font-[family-name:var(--font-display)] leading-tight
            "
          >
            Simples,{' '}
            <span className="text-gradient">do início ao fim</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto text-base">
            Cuidamos de toda a burocracia e logística para que você foque no que importa:
            o resultado final.
          </p>
        </motion.div>

        {/* Cards das etapas com linha conectora */}
        <div className="relative">
          {/* Linha conectora — visível apenas em desktop */}
          <div
            className="
              hidden lg:block
              absolute top-[52px] left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)]
              h-px bg-gradient-to-r from-transparent via-white/15 to-transparent
            "
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-4">
            {PROCESS_STEPS.map((step, i) => (
              <StepCard key={step.step} step={step} index={i} isInView={isInView} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center mt-14"
        >
          <a
            href="#contato"
            className="
              inline-flex items-center gap-2.5
              px-8 py-4 rounded-full
              bg-brand-gradient text-white font-semibold
              shadow-[0_8px_32px_rgba(0,85,255,0.4)]
              hover:shadow-[0_8px_40px_rgba(0,85,255,0.6)]
              hover:scale-105 active:scale-95
              transition-all duration-200
            "
          >
            Iniciar meu projeto
          </a>
        </motion.div>

      </div>
    </section>
  )
}
