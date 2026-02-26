/**
 * Portfolio.tsx — Carrossel de portfólio com scroll automático
 *
 * Técnica de carrossel infinito (marquee):
 * - Os itens são duplicados no DOM (original + clone)
 * - CSS animation `marquee` move de translateX(0) → translateX(-50%)
 * - Como o clone é idêntico ao original, o loop é imperceptível
 * - Animação pausa no hover (pause-on-hover class + CSS)
 *
 * Acessibilidade:
 * - aria-label no carrossel
 * - Os clones têm aria-hidden="true"
 * - prefers-reduced-motion: animação desativada para usuários sensíveis
 *
 * Interatividade:
 * - Hover em card: scale + overlay com título e categoria
 * - Badge de categoria no canto
 * - Localização exibida com ícone
 */

'use client'

import Image from 'next/image'
import { MapPin } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { PORTFOLIO_ITEMS, SOCIAL_LINKS } from '@/lib/constants'
import { Instagram, Youtube } from 'lucide-react'

/* --------------------------------------------------------------- */

/* Card individual do portfólio */
function PortfolioCard({
  item,
  isClone = false,
}: {
  item: (typeof PORTFOLIO_ITEMS)[0]
  isClone?: boolean
}) {
  return (
    /*
     * `group` permite CSS Tailwind `group-hover:*` nos filhos.
     * width fixo garante layout consistente no carrossel.
     * `flex-shrink-0` evita que o flex container comprima os cards.
     */
    <div
      className="group relative flex-shrink-0 w-72 sm:w-80 h-52 sm:h-60 rounded-2xl overflow-hidden cursor-pointer"
      aria-hidden={isClone}
    >
      {/* Imagem de fundo */}
      <Image
        src={item.image}
        alt={isClone ? '' : `${item.title} — DroneLENS`}
        fill
        quality={75}
        className="
          object-cover object-center
          scale-100 group-hover:scale-[1.08]
          transition-transform duration-600 ease-out
        "
        sizes="320px"
      />

      {/* Overlay base */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-t from-dark-900/80 via-dark-900/20 to-transparent
          group-hover:from-dark-900/92 group-hover:via-dark-900/50
          transition-all duration-400
        "
        aria-hidden="true"
      />

      {/* Badge de categoria — canto superior esquerdo */}
      <span
        className="
          absolute top-3 left-3
          px-2.5 py-1 rounded-full text-[10px] font-semibold
          bg-[var(--brand)]/80 text-white backdrop-blur-sm
          tracking-wide
        "
      >
        {item.category}
      </span>

      {/* Informações — aparecem no hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white font-bold text-base leading-snug mb-1.5 font-[family-name:var(--font-display)]">
          {item.title}
        </p>
        <div className="flex items-center gap-1.5 text-white/60 text-xs">
          <MapPin size={11} />
          {item.location}
        </div>
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- */

export default function Portfolio() {
  return (
    <section className="py-24 bg-[var(--bg)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">

          {/* Cabeçalho */}
          <SectionHeader
            tag="Portfólio"
            title={"Trabalhos que\nfalam por si"}
            align="left"
          />

          {/* Links para redes sociais — onde o portfólio completo está */}
          <div className="flex flex-col gap-2 flex-shrink-0">
            <p className="text-xs text-[var(--text-muted)] font-medium">
              Portfólio completo nas redes:
            </p>
            <div className="flex gap-3">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold
                  bg-gradient-to-r from-purple-600 to-pink-500 text-white
                  hover:scale-105 active:scale-95 transition-transform
                "
                aria-label="Portfólio no Instagram"
              >
                <Instagram size={14} />
                Instagram
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold
                  bg-red-600 text-white
                  hover:scale-105 active:scale-95 transition-transform
                "
                aria-label="Portfólio no YouTube"
              >
                <Youtube size={14} />
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Carrossel de scroll automático ──────────────────────
          Técnica: duplicate items + CSS marquee animation
          A div externa com overflow-hidden corta o que sai da tela.
          A div interna com animate-marquee se move continuamente.
          pause-on-hover pausa a animação quando o cursor está sobre ela.
       ─────────────────────────────────────────────────────────── */}
      <div
        className="
          relative w-full overflow-hidden
          pause-on-hover
        "
        aria-label="Carrossel de portfólio — projetos realizados pela DroneLENS"
        role="region"
      >
        {/*
         * Fade gradient nas bordas para efeito de profundidade.
         * pointer-events: none para não bloquear interações nos cards.
         */}
        <div
          className="
            absolute left-0 top-0 bottom-0 w-24 z-10
            pointer-events-none
          "
          style={{
            background: 'linear-gradient(to right, var(--bg) 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />
        <div
          className="
            absolute right-0 top-0 bottom-0 w-24 z-10
            pointer-events-none
          "
          style={{
            background: 'linear-gradient(to left, var(--bg) 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/*
         * A track tem `w-max` (width: max-content) para que todos os cards
         * fiquem em linha. Com 2x os items, translateX(-50%) = exatamente
         * a largura do conjunto original → loop infinito perfeito.
         *
         * @media (prefers-reduced-motion): a classe animate-[marquee] só
         * é aplicada quando motion não está reduzido (controlado pelo
         * utilitário motion-safe do Tailwind).
         */}
        <div
          className="
            flex gap-5 py-4 px-8
            w-max
            motion-safe:animate-[marquee_50s_linear_infinite]
          "
        >
          {/* Itens originais */}
          {PORTFOLIO_ITEMS.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}

          {/* Clones para loop seamless */}
          {PORTFOLIO_ITEMS.map((item) => (
            <PortfolioCard key={`clone-${item.id}`} item={item} isClone />
          ))}
        </div>
      </div>
    </section>
  )
}
