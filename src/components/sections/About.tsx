/**
 * About.tsx — Seção "Sobre a DroneLENS"
 *
 * Layout: duas colunas em desktop (texto | imagem + stats)
 *
 * Conteúdo:
 * - Texto narrativo sobre a empresa (história, missão, diferencial)
 * - Destaque dos equipamentos DJI utilizados
 * - Imagem aérea em destaque com efeito de profundidade
 * - 4 cards de estatísticas sobrepostos com AnimatedCounter
 *
 * Animações:
 * - Coluna de texto: fade + slide da esquerda ao entrar na viewport
 * - Coluna de imagem: fade + slide da direita ao entrar na viewport
 * - Contadores: animam do zero ao valor real quando entram na tela
 * - Cards de stats: stagger suave ao aparecer
 */

'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import SectionHeader from '@/components/ui/SectionHeader'
import { STATS } from '@/lib/constants'

/* --------------------------------------------------------------- */

/* Card de estatística individual */
function StatCard({
  stat,
  index,
  isInView,
}: {
  stat: (typeof STATS)[0]
  index: number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        ease: [0.21, 0.47, 0.32, 0.98],
        delay: 0.4 + index * 0.1,
      }}
      className="
        flex flex-col items-center text-center
        p-5 rounded-2xl
        bg-[var(--bg-card)] border border-[var(--border)]
        shadow-[0_4px_24px_rgba(0,0,0,0.06)]
        dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]
        hover:border-[var(--brand)]/40
        transition-colors duration-300
      "
    >
      {/* Valor animado */}
      <span className="text-4xl font-bold font-[family-name:var(--font-display)] text-gradient mb-1">
        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
      </span>

      {/* Label */}
      <span className="text-sm font-semibold text-[var(--text)] mb-1">
        {stat.label}
      </span>

      {/* Descrição curta */}
      <span className="text-xs text-[var(--text-muted)] leading-relaxed">
        {stat.description}
      </span>
    </motion.div>
  )
}

/* --------------------------------------------------------------- */

/* Diferenciais da empresa listados com checkmark */
const DIFFERENTIALS = [
  'Frota exclusiva de drones DJI Matrice, Mavic e Inspire',
  'Pilotos certificados pela ANAC e experientes em rotas complexas',
  'Edição profissional inclusa — entregamos conteúdo pronto',
  'Seguro aeronáutico em todos os voos',
  'Disponibilidade 7 dias por semana, inclusive feriados',
  'Atendimento remoto via transmissão ao vivo em tempo real',
]

/* --------------------------------------------------------------- */

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section className="py-24 bg-[var(--bg-card)]">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >

        {/* Grid principal: texto | visual */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Coluna esquerda: narrativa ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <SectionHeader
              tag="Sobre nós"
              title={"Uma década\nvoando alto"}
              subtitle="Fundada em Curitiba com a missão de democratizar o acesso a imagens aéreas de qualidade cinematográfica."
              align="left"
              className="mb-8"
            />

            {/* Texto narrativo */}
            <div className="space-y-4 text-[var(--text-muted)] text-base leading-relaxed mb-10">
              <p>
                A <strong className="text-[var(--text)] font-semibold">DroneLENS</strong> nasceu
                da paixão por dois mundos: a aviação e a fotografia. Em mais de dez anos de
                operação, construímos uma reputação sólida baseada em imagens que impressionam,
                entregas dentro do prazo e uma relação transparente com cada cliente.
              </p>
              <p>
                Operamos com a mais completa linha de drones profissionais da{' '}
                <strong className="text-[var(--text)] font-semibold">DJI</strong> — desde
                os modelos compactos para ambientes urbanos até os equipamentos Matrice para
                missões técnicas exigentes. Nossa lente viu de tudo: das cataratas do Iguaçu
                às montanhas dos Andes, de lançamentos imobiliários às corridas de Fórmula 3.
              </p>
              <p>
                Com pilotos habilitados distribuídos pela América do Sul, respondemos com
                agilidade e entregamos com excelência — independente de onde seu projeto esteja.
              </p>
            </div>

            {/* Lista de diferenciais */}
            <ul className="space-y-3">
              {DIFFERENTIALS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                  <CheckCircle2
                    size={17}
                    className="text-brand-blue mt-0.5 flex-shrink-0"
                  />
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA de conhecer portfólio */}
            <div className="mt-10 flex gap-4 flex-wrap">
              <a
                href="#portfolio"
                className="
                  px-6 py-3 rounded-full text-sm font-semibold
                  bg-brand-gradient text-white
                  shadow-[0_4px_20px_rgba(0,85,255,0.35)]
                  hover:shadow-[0_4px_28px_rgba(0,85,255,0.5)]
                  hover:scale-105 active:scale-95
                  transition-all duration-200
                "
              >
                Ver nosso portfólio
              </a>
              <a
                href="#contato"
                className="
                  px-6 py-3 rounded-full text-sm font-semibold
                  border border-[var(--border)] text-[var(--text)]
                  hover:border-[var(--brand)] hover:text-[var(--brand)]
                  transition-all duration-200
                "
              >
                Falar com um piloto
              </a>
            </div>
          </motion.div>

          {/* ── Coluna direita: imagem + stats ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.15 }}
            className="relative"
          >
            {/* Imagem principal */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&h=675&q=85&auto=format&fit=crop"
                alt="Drone DJI em voo — DroneLENS"
                fill
                quality={85}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay sutil de profundidade */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(0,85,255,0.08) 0%, transparent 60%)',
                }}
                aria-hidden="true"
              />
            </div>

            {/* Card badge "DJI Certified" sobreposto */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="
                absolute -top-5 -right-5
                px-4 py-3 rounded-2xl
                bg-[var(--bg-card)] border border-[var(--border)]
                shadow-xl
                flex items-center gap-3
              "
            >
              {/* Logo DJI simplificado */}
              <div className="w-10 h-10 rounded-xl bg-brand-dark-900 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold tracking-tighter">DJI</span>
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--text)]">Certified Partner</p>
                <p className="text-[10px] text-[var(--text-muted)]">Equipamentos originais</p>
              </div>
            </motion.div>

            {/* Grid de estatísticas (2x2) */}
            <div className="grid grid-cols-2 gap-4 mt-5">
              {STATS.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} isInView={isInView} />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
