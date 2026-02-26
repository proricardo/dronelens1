/**
 * AnimatedCounter.tsx — Contador numérico animado
 *
 * Anima um número de 0 até `target` quando o elemento entra na viewport.
 * Usa `useInView` do Framer Motion para detectar visibilidade e
 * `requestAnimationFrame` para a animação suave com easing cúbico.
 *
 * Características:
 * - Animação dispara apenas uma vez (once: true)
 * - Easing "ease out cubic" para desaceleração natural
 * - Suporte a sufixo ('+', '%', etc.)
 * - Acessível: o valor final é lido por screen readers via aria-live
 */

'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  /** Valor final do contador */
  target: number
  /** Sufixo exibido após o número (ex: '+', '%', 'k') */
  suffix?: string
  /** Duração total da animação em milissegundos */
  duration?: number
  /** Classes CSS adicionais */
  className?: string
}

export default function AnimatedCounter({
  target,
  suffix = '',
  duration = 2200,
  className = '',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  /* Referência ao elemento DOM para detectar visibilidade */
  const ref = useRef<HTMLSpanElement>(null)

  /*
   * `once: true` garante que a animação não repita ao rolar de volta.
   * `amount: 0.5` inicia quando pelo menos 50% do elemento está visível.
   */
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isInView) return

    let startTimestamp: number | null = null

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp

      /* Progresso linear de 0 a 1 */
      const linearProgress = Math.min(
        (timestamp - startTimestamp) / duration,
        1
      )

      /*
       * Easing "ease-out cubic": desacelera no final para parecer natural.
       * Fórmula: 1 - (1 - progress)^3
       */
      const easedProgress = 1 - Math.pow(1 - linearProgress, 3)

      setCount(Math.floor(easedProgress * target))

      /* Continua animando até atingir o alvo */
      if (linearProgress < 1) {
        requestAnimationFrame(step)
      } else {
        setCount(target) // garante valor exato no final
      }
    }

    const frameId = requestAnimationFrame(step)

    /* Limpeza caso o componente desmonte durante a animação */
    return () => cancelAnimationFrame(frameId)
  }, [isInView, target, duration])

  return (
    <span
      ref={ref}
      className={className}
      /* Anuncia o valor final para leitores de tela */
      aria-label={`${target}${suffix}`}
    >
      {count}
      {suffix}
    </span>
  )
}
