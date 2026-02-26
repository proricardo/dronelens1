/**
 * Navbar.tsx — Barra de navegação principal
 *
 * Comportamentos:
 * - Fixa no topo (position: fixed) para manter acesso contínuo
 * - Glassmorphism ativado após 60px de scroll (fundo translúcido + blur)
 * - Logo grande/média em destaque
 * - Links de navegação com scroll suave para as seções da página
 * - Botão de alternância de tema (ThemeToggle)
 * - CTA "Solicitar Orçamento" em destaque
 * - Menu mobile com overlay animado (slide-in do topo)
 *
 * Acessibilidade:
 * - aria-label no botão hamburger
 * - role="navigation" no nav
 * - Links com href âncora (#id) para scroll suave via CSS (globals.css)
 */

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Send } from 'lucide-react'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { NAV_LINKS } from '@/lib/constants'

/* Logo DroneLENS como componente reutilizável */
function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  }

  return (
    <a href="#hero" className={`flex items-center gap-2 group ${sizes[size]}`}>
      {/* Ícone hexagonal — representa a lente do drone */}
      <span
        className="
          relative flex items-center justify-center
          w-8 h-8 rounded-lg
          bg-brand-gradient
          shadow-[0_0_16px_rgba(0,85,255,0.5)]
          group-hover:shadow-[0_0_24px_rgba(0,85,255,0.7)]
          transition-shadow duration-300
        "
        aria-hidden="true"
      >
        {/* Círculo interno simulando a lente */}
        <span className="w-3 h-3 rounded-full bg-white/90 ring-2 ring-white/30" />
        {/* Ponto central da lente */}
        <span className="absolute w-1 h-1 rounded-full bg-brand-blue" />
      </span>

      {/* Logotipo textual */}
      <span className="font-[family-name:var(--font-display)] font-bold tracking-tight leading-none">
        <span className="text-white font-light">Drone</span>
        <span className="text-gradient">LENS</span>
      </span>
    </a>
  )
}

/* --------------------------------------------------------------- */

export default function Navbar() {
  /* Controla a opacidade do fundo (glassmorphism ativo após scroll) */
  const [scrolled, setScrolled] = useState(false)
  /* Controla a visibilidade do menu mobile */
  const [menuOpen, setMenuOpen] = useState(false)
  /* Seção ativa para highlight no menu */
  const [activeSection, setActiveSection] = useState('hero')

  /* Detecta scroll para ativar o glassmorphism */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Detecta seção ativa via IntersectionObserver */
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  /* Fecha o menu mobile e navega suavemente */
  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const target = document.querySelector(href)
    target?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500
          ${
            scrolled
              ? 'glass border-b border-white/10 py-3'
              : 'bg-transparent py-5'
          }
        `}
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
          role="navigation"
          aria-label="Navegação principal"
        >
          {/* Logo — média e impactante */}
          <Logo size="md" />

          {/* Links desktop — ocultos em mobile */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const sectionId = href.replace('#', '')
              const isActive = activeSection === sectionId

              return (
                <li key={href}>
                  <button
                    onClick={() => handleNavClick(href)}
                    className={`
                      relative px-4 py-2 text-sm font-medium rounded-lg
                      transition-colors duration-200
                      ${
                        isActive
                          ? 'text-white'
                          : 'text-white/70 hover:text-white'
                      }
                    `}
                  >
                    {label}
                    {/* Underline animado na seção ativa */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="
                          absolute bottom-0 left-3 right-3 h-0.5
                          bg-brand-gradient rounded-full
                        "
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Controles à direita */}
          <div className="flex items-center gap-3">
            {/* Botão tema */}
            <ThemeToggle variant="default" />

            {/* CTA — oculto em telas muito pequenas */}
            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('#contato')
              }}
              className="
                hidden sm:flex items-center gap-2
                px-4 py-2 rounded-full text-sm font-semibold
                bg-brand-gradient text-white
                shadow-[0_4px_20px_rgba(0,85,255,0.35)]
                hover:shadow-[0_4px_28px_rgba(0,85,255,0.55)]
                hover:scale-105 active:scale-95
                transition-all duration-200
              "
            >
              <Send size={14} strokeWidth={2.5} />
              Solicitar Orçamento
            </a>

            {/* Hamburger — visível apenas em mobile */}
            <button
              className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Menu mobile — overlay fullscreen ───────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="
              fixed inset-0 z-40 pt-24
              bg-dark-900/97 backdrop-blur-xl
              flex flex-col items-center justify-start gap-2
              lg:hidden
            "
          >
            {/* Links mobile */}
            {NAV_LINKS.map(({ label, href }, i) => (
              <motion.button
                key={href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => handleNavClick(href)}
                className="
                  w-64 py-4 text-xl font-medium text-white/80
                  hover:text-white border-b border-white/8
                  transition-colors text-left px-6
                "
              >
                {label}
              </motion.button>
            ))}

            {/* CTA mobile */}
            <motion.a
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              href="#contato"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('#contato')
              }}
              className="
                mt-8 flex items-center gap-2
                px-8 py-3 rounded-full text-base font-semibold
                bg-brand-gradient text-white
                shadow-[0_4px_24px_rgba(0,85,255,0.4)]
              "
            >
              <Send size={16} />
              Solicitar Orçamento
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
