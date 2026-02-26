/**
 * Footer.tsx — Rodapé do site
 *
 * Estrutura:
 * - Logo + tagline da empresa
 * - Coluna de links rápidos (âncoras)
 * - Coluna de serviços (links)
 * - Coluna de contato (endereço, e-mail, telefone)
 * - Ícones de redes sociais com hover animado
 * - Linha inferior: copyright + ANAC / SARPAS (credencial de pilotos)
 *
 * No Footer, o logo aparece em versão pequena e minimalista
 * (sem o glow volumoso do Navbar), apenas texto + ícone sutil.
 */

import { Instagram, Youtube, Linkedin, MapPin, Mail, Phone } from 'lucide-react'
import { SOCIAL_LINKS, SERVICES, NAV_LINKS } from '@/lib/constants'

/* Ícone TikTok (não está no lucide, feito em SVG inline) */
function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.27 8.27 0 004.83 1.55V6.85a4.85 4.85 0 01-1.06-.16z" />
    </svg>
  )
}

/* Link de rede social animado via CSS (Tailwind group hover) */
function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        group flex items-center justify-center
        w-10 h-10 rounded-full
        bg-[var(--surface)] border border-[var(--border)]
        text-[var(--text-muted)]
        hover:bg-brand-blue hover:border-brand-blue hover:text-white
        transition-all duration-250
        hover:scale-110 hover:shadow-[0_0_16px_rgba(0,85,255,0.4)]
      "
    >
      {children}
    </a>
  )
}

/* --------------------------------------------------------------- */

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="
        bg-[var(--bg-card)] border-t border-[var(--border)]
        pt-16 pb-8
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Grade principal: 4 colunas em desktop, stack em mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* ── Coluna 1: Logo + missão ─────────────────────────── */}
          <div className="lg:col-span-1">
            {/* Logo minimalista (versão pequena para footer) */}
            <a href="#hero" className="inline-flex items-center gap-2 mb-4 group">
              <span
                className="
                  w-7 h-7 rounded-md
                  bg-brand-gradient
                  flex items-center justify-center
                  flex-shrink-0
                "
                aria-hidden="true"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-white/90 ring-1 ring-white/30" />
              </span>
              <span className="font-[family-name:var(--font-display)] text-lg font-bold leading-none">
                <span className="text-[var(--text-muted)] font-light">Drone</span>
                <span className="text-gradient">LENS</span>
              </span>
            </a>

            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">
              Filmagem aérea profissional com drones DJI de última geração.
              Mais de 10 anos elevando perspectivas em toda a América do Sul.
            </p>

            {/* Redes sociais */}
            <div className="flex gap-3">
              <SocialLink href={SOCIAL_LINKS.instagram} label="Instagram DroneLENS">
                <Instagram size={17} />
              </SocialLink>
              <SocialLink href={SOCIAL_LINKS.youtube} label="YouTube DroneLENS">
                <Youtube size={17} />
              </SocialLink>
              <SocialLink href={SOCIAL_LINKS.linkedin} label="LinkedIn DroneLENS">
                <Linkedin size={17} />
              </SocialLink>
              <SocialLink href={SOCIAL_LINKS.tiktok} label="TikTok DroneLENS">
                <TikTokIcon size={17} />
              </SocialLink>
            </div>
          </div>

          {/* ── Coluna 2: Links rápidos ──────────────────────────── */}
          <div>
            <h3 className="text-[var(--text)] font-semibold text-sm tracking-wider uppercase mb-5">
              Navegação
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="
                      text-[var(--text-muted)] text-sm
                      hover:text-[var(--brand)] transition-colors duration-200
                    "
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Coluna 3: Serviços ──────────────────────────────── */}
          <div>
            <h3 className="text-[var(--text)] font-semibold text-sm tracking-wider uppercase mb-5">
              Serviços
            </h3>
            <ul className="space-y-3">
              {SERVICES.map(({ id, title }) => (
                <li key={id}>
                  <a
                    href="#servicos"
                    className="
                      text-[var(--text-muted)] text-sm
                      hover:text-[var(--brand)] transition-colors duration-200
                    "
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Coluna 4: Contato ───────────────────────────────── */}
          <div>
            <h3 className="text-[var(--text)] font-semibold text-sm tracking-wider uppercase mb-5">
              Contato
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                <MapPin size={16} className="text-[var(--brand)] mt-0.5 flex-shrink-0" />
                <span>
                  Curitiba, Paraná — Brasil<br />
                  <span className="text-xs opacity-70">
                    Atendemos toda a América do Sul
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-[var(--brand)] flex-shrink-0" />
                <a
                  href="mailto:contato@dronelens.com.br"
                  className="text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors"
                >
                  contato@dronelens.com.br
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-[var(--brand)] flex-shrink-0" />
                <a
                  href="tel:+5541999999999"
                  className="text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors"
                >
                  +55 (41) 99999-9999
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Linha divisória ──────────────────────────────────── */}
        <div className="border-t border-[var(--border)] pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
            <p>
              © {currentYear} DroneLENS. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              {/* Credencial regulatória — importante para credibilidade */}
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Operador ANAC Habilitado · SARPAS
              </span>
              <span>·</span>
              <a href="#" className="hover:text-[var(--brand)] transition-colors">
                Política de Privacidade
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
