/**
 * next.config.ts
 * Configuração principal do Next.js 15.
 * Habilita domínio Unsplash para imagens otimizadas via <Image />.
 */
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
