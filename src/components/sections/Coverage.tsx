/**
 * Coverage.tsx — Cobertura geográfica na América do Sul
 *
 * Comunica o alcance da DroneLENS de forma visual e impactante.
 *
 * Layout:
 * - Fundo claro com mapa SVG estilizado da América do Sul (lado direito)
 * - Lista de países/cidades atendidos (lado esquerdo)
 * - Badge "Sede em Curitiba" em destaque
 * - Pulsação animada sobre Curitiba no mapa
 *
 * O mapa é um SVG simplificado inline (path da América do Sul).
 * Evita dependência de biblioteca de mapas pesada.
 */

'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Plane } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { COVERAGE_LOCATIONS } from '@/lib/constants'

/* --------------------------------------------------------------- */

/*
 * SVG simplificado da América do Sul.
 * Path gerado manualmente com pontos chave para reconhecimento do contorno.
 * Curitiba está posicionada aproximadamente em cx=58%, cy=72% do viewBox.
 */
function SouthAmericaMap() {
  return (
    <div className="relative w-full max-w-sm mx-auto" aria-hidden="true">
      <svg
        viewBox="0 0 300 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Contorno da América do Sul */}
        <path
          d="
            M 120 10
            C 95 12, 75 25, 65 40
            C 52 58, 48 78, 42 95
            C 36 115, 28 130, 22 148
            C 15 168, 18 188, 25 205
            C 32 222, 42 232, 48 248
            C 55 268, 52 290, 58 310
            C 64 330, 75 345, 88 360
            C 100 374, 110 385, 118 395
            C 126 405, 132 410, 140 412
            C 148 414, 155 410, 160 402
            C 168 390, 170 375, 172 360
            C 174 345, 170 330, 168 315
            C 165 298, 165 280, 168 265
            C 172 248, 180 234, 185 218
            C 190 200, 192 182, 192 165
            C 192 148, 186 135, 182 120
            C 178 105, 178 90, 182 75
            C 186 60, 192 48, 195 35
            C 198 22, 192 12, 180 8
            C 168 4, 148 6, 135 8
            Z
          "
          fill="var(--surface)"
          stroke="var(--brand)"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />

        {/* Linhas de longitude/latitude decorativas */}
        {[0.25, 0.5, 0.75].map((ratio) => (
          <line
            key={ratio}
            x1={ratio * 300}
            y1={0}
            x2={ratio * 300}
            y2={420}
            stroke="var(--brand)"
            strokeWidth="0.5"
            strokeOpacity="0.08"
            strokeDasharray="4 6"
          />
        ))}
        {[0.2, 0.4, 0.6, 0.8].map((ratio) => (
          <line
            key={ratio}
            x1={0}
            y1={ratio * 420}
            x2={300}
            y2={ratio * 420}
            stroke="var(--brand)"
            strokeWidth="0.5"
            strokeOpacity="0.08"
            strokeDasharray="4 6"
          />
        ))}

        {/* Pontos de cidades atendidas */}
        {[
          { label: 'Bogotá',       cx: 95,  cy: 90  },
          { label: 'Lima',         cx: 65,  cy: 195 },
          { label: 'La Paz',       cx: 112, cy: 230 },
          { label: 'Santiago',     cx: 90,  cy: 318 },
          { label: 'Buenos Aires', cx: 142, cy: 340 },
          { label: 'Montevidéu',   cx: 155, cy: 325 },
          { label: 'São Paulo',    cx: 170, cy: 270 },
          { label: 'Assunção',     cx: 140, cy: 292 },
        ].map(({ label, cx, cy }) => (
          <g key={label}>
            <circle cx={cx} cy={cy} r={3} fill="var(--brand)" fillOpacity="0.5" />
          </g>
        ))}

        {/* Curitiba — cidade sede, com pulsação */}
        <circle cx={168} cy={285} r={6} fill="var(--brand)" fillOpacity="0.9" />
        {/* Anéis pulsantes (animados via CSS) */}
        <circle
          cx={168} cy={285} r={10}
          fill="none"
          stroke="var(--brand)"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          className="animate-ping"
          style={{ animationDuration: '2s' }}
        />
        <circle
          cx={168} cy={285} r={16}
          fill="none"
          stroke="var(--brand)"
          strokeWidth="1"
          strokeOpacity="0.2"
          className="animate-ping"
          style={{ animationDuration: '2s', animationDelay: '0.4s' }}
        />

        {/* Label Curitiba */}
        <text
          x={178}
          y={285}
          fontSize="9"
          fill="var(--brand)"
          fontWeight="600"
          fontFamily="var(--font-display)"
          dominantBaseline="middle"
        >
          Curitiba
        </text>
        <text
          x={178}
          y={296}
          fontSize="7"
          fill="var(--text-muted)"
          fontFamily="var(--font-body)"
          dominantBaseline="middle"
        >
          sede
        </text>
      </svg>
    </div>
  )
}

/* --------------------------------------------------------------- */

export default function Coverage() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-24 bg-[var(--bg-card)]">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Coluna esquerda: texto + lista ──────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <SectionHeader
              tag="Cobertura"
              title={"Presentes em toda\na América do Sul"}
              subtitle="Nossa sede fica em Curitiba, mas nossos pilotos estão prontos para pousar onde seu projeto precisar."
              align="left"
              className="mb-10"
            />

            {/* Badge da sede */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--brand-glow)] border border-[var(--brand)]/20 mb-8 w-fit">
              <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center flex-shrink-0">
                <MapPin size={14} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--text)]">Sede</p>
                <p className="text-xs text-[var(--text-muted)]">Curitiba, Paraná — Brasil</p>
              </div>
            </div>

            {/* Lista de países */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COVERAGE_LOCATIONS.map((loc, i) => (
                <motion.div
                  key={loc.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.5 }}
                  className="
                    flex items-start gap-3 p-3 rounded-xl
                    bg-[var(--surface)] border border-[var(--border)]
                    hover:border-[var(--brand)]/40
                    transition-colors duration-200
                  "
                >
                  <Plane
                    size={15}
                    className="text-[var(--brand)] mt-0.5 flex-shrink-0"
                    strokeWidth={1.8}
                  />
                  <div>
                    <p className="text-sm font-semibold text-[var(--text)]">
                      {loc.name}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] leading-snug">
                      {loc.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Nota sobre mobilização */}
            <p className="mt-8 text-sm text-[var(--text-muted)] italic">
              * Para projetos em outros países sul-americanos, entre em contato.
              Trabalhamos com planejamento de missão personalizado para cada destino.
            </p>
          </motion.div>

          {/* ── Coluna direita: mapa SVG ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Card container do mapa */}
            <div
              className="
                p-8 rounded-3xl
                bg-[var(--surface)] border border-[var(--border)]
                shadow-[0_8px_40px_rgba(0,0,0,0.06)]
                dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)]
              "
            >
              <SouthAmericaMap />

              {/* Legenda abaixo do mapa */}
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-[var(--text-muted)]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[var(--brand)]" />
                  Sede Curitiba
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--brand)] opacity-50" />
                  Cidades atendidas
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
