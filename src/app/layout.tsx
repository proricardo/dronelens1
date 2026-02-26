/**
 * layout.tsx — Root Layout
 *
 * Responsabilidades:
 * - Carrega as fontes Google (Space Grotesk para títulos, Inter para corpo)
 * - Injeta o ThemeProvider do next-themes para controle light/dark
 * - Define metadata de SEO (title, description, Open Graph)
 * - Aplica as variáveis de fonte como classes CSS no <body>
 *
 * O atributo `suppressHydrationWarning` no <html> evita warning de
 * hidratação causado pela mudança de class (dark/light) pelo next-themes
 * entre server e client render.
 */

import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

/* ------------------------------------------------------------------
   Fontes — carregadas via next/font para performance otimizada
   (font-display: swap, zero layout shift, sem requisição externa no runtime)
   ------------------------------------------------------------------ */
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',  // mapeada no globals.css @theme
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

/* ------------------------------------------------------------------
   Metadata — SEO + Open Graph + redes sociais
   ------------------------------------------------------------------ */
export const metadata: Metadata = {
  title: 'DroneLENS | Filmagem Aérea Profissional com Drones DJI',
  description:
    'Especialistas em filmagem aérea com drones DJI de última geração. ' +
    'Mais de 10 anos de experiência em vistorias técnicas, eventos, imóveis, ' +
    'esportes e vídeos institucionais. Atendemos toda a América do Sul a partir de Curitiba-PR.',
  keywords: [
    'drone', 'filmagem aérea', 'fotografia aérea', 'vistoria técnica',
    'imóveis', 'lançamento imobiliário', 'eventos', 'Curitiba', 'Paraná',
    'DJI', 'drone profissional', 'América do Sul',
  ],
  authors: [{ name: 'DroneLENS' }],
  openGraph: {
    title: 'DroneLENS | Filmagem Aérea Profissional',
    description: 'Imagens aéreas de alta qualidade. Mais de 10 anos de experiência.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'DroneLENS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DroneLENS | Filmagem Aérea Profissional',
    description: 'Filmagem aérea com drones DJI. Curitiba · América do Sul.',
  },
}

/* ------------------------------------------------------------------
   Root Layout
   ------------------------------------------------------------------ */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    /*
     * lang="pt-BR" — idioma correto para SEO e acessibilidade
     * suppressHydrationWarning — necessário para next-themes (evita mismatch)
     */
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`
          ${spaceGrotesk.variable}
          ${inter.variable}
          antialiased
          overflow-x-hidden
        `}
      >
        {/*
         * ThemeProvider (next-themes)
         * attribute="class"  → adiciona classe 'dark' no <html>
         * defaultTheme="light" → padrão light mode conforme requisito
         * enableSystem={false} → não segue preferência do sistema
         * disableTransitionOnChange={false} → permite transição suave CSS
         */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
