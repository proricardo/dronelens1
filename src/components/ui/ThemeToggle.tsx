/**
 * ThemeToggle.tsx — Botão de alternância light/dark mode
 *
 * Utiliza o hook `useTheme` do next-themes para ler e alterar o tema.
 * O estado `mounted` evita flash de conteúdo incorreto (hydration mismatch):
 * no servidor não sabemos qual tema está ativo, então renderizamos um
 * placeholder transparente até o cliente hidratar.
 *
 * Animações:
 * - Rotação suave do ícone ao clicar (Framer Motion)
 * - Transição de scale no press
 * - Tooltip acessível via aria-label
 */

'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

interface ThemeToggleProps {
  /** Variante visual: 'default' para barra de nav, 'outline' para uso em cards */
  variant?: 'default' | 'outline'
  className?: string
}

export default function ThemeToggle({
  variant = 'default',
  className = '',
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  /*
   * Marca como montado após a primeira renderização no cliente.
   * Antes disso, renderizamos um placeholder para evitar layout shift.
   */
  useEffect(() => {
    setMounted(true)
  }, [])

  /* Placeholder com as mesmas dimensões para evitar CLS */
  if (!mounted) {
    return (
      <div
        className={`
          w-10 h-10 rounded-full
          ${variant === 'outline' ? 'border border-[var(--border)]' : ''}
          ${className}
        `}
        aria-hidden="true"
      />
    )
  }

  const isDark = theme === 'dark'

  return (
    <motion.button
      /* Escala suave no clique — feedback tátil visual */
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.05 }}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`
        relative w-10 h-10 rounded-full
        flex items-center justify-center
        transition-colors duration-300
        ${
          variant === 'default'
            ? 'bg-white/10 backdrop-blur border border-white/15 hover:bg-white/20 text-white'
            : 'bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--brand)] text-[var(--text)]'
        }
        ${className}
      `}
      aria-label={isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
      title={isDark ? 'Modo claro' : 'Modo escuro'}
    >
      {/*
       * AnimatePresence permite animação de saída antes do ícone trocar.
       * mode="wait" garante que o ícone antigo sai antes do novo entrar.
       */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'sun' : 'moon'}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0,   scale: 1 }}
          exit={{    opacity: 0, rotate:  90,  scale: 0.5 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="flex items-center justify-center"
        >
          {isDark
            ? <Sun  size={17} strokeWidth={2} />
            : <Moon size={17} strokeWidth={2} />
          }
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
