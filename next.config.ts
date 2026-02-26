import type { NextConfig } from 'next'

const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
const repository = process.env.GITHUB_REPOSITORY ?? ''
const repositoryName = repository.split('/')[1] ?? ''
const isUserOrOrgPage = repositoryName.endsWith('.github.io')
const basePath = isGithubActions && !isUserOrOrgPage ? `/${repositoryName}` : ''

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  ...(basePath
    ? {
        basePath,
        assetPrefix: `${basePath}/`,
      }
    : {}),
}

export default nextConfig
