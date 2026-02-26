/**
 * page.tsx — Landing Page principal da DroneLENS
 *
 * Estrutura das seções (em ordem de rolagem):
 *  1. Navbar     — Navegação fixa com glassmorphism
 *  2. Hero       — Tela cheia com impacto visual máximo
 *  3. Services   — Grade dos serviços oferecidos
 *  4. About      — Quem somos + contadores de estatísticas
 *  5. Portfolio  — Carrossel horizontal com scroll automático
 *  6. Process    — Como trabalhamos em 3 etapas
 *  7. Coverage   — Cobertura na América do Sul
 *  8. Testimonials — Depoimentos de clientes reais
 *  9. Contact    — Formulário de captação de leads
 * 10. Footer     — Links, redes sociais, informações
 *
 * Padrão de performance:
 * - Seções são Server Components por padrão (sem 'use client')
 * - Animações e interatividade ficam nos componentes filhos (Client)
 * - A página em si não tem estado nem efeitos
 */

import Navbar        from '@/components/layout/Navbar'
import Footer        from '@/components/layout/Footer'
import Hero          from '@/components/sections/Hero'
import Services      from '@/components/sections/Services'
import About         from '@/components/sections/About'
import Portfolio     from '@/components/sections/Portfolio'
import Process       from '@/components/sections/Process'
import Coverage      from '@/components/sections/Coverage'
import Testimonials  from '@/components/sections/Testimonials'
import Contact       from '@/components/sections/Contact'

export default function HomePage() {
  return (
    /*
     * overflow-x-hidden previne scroll horizontal indesejado
     * causado por animações que temporariamente saem da tela.
     */
    <main className="overflow-x-hidden">

      {/* Barra de navegação fixa — sempre visível */}
      <Navbar />

      {/* ── Seções da landing page ─────────────────────────── */}

      {/* Herói: primeira impressão, máximo impacto visual */}
      <section id="hero">
        <Hero />
      </section>

      {/* Serviços: o que a DroneLENS faz */}
      <section id="servicos">
        <Services />
      </section>

      {/* Sobre: história, missão e estatísticas */}
      <section id="sobre">
        <About />
      </section>

      {/* Portfólio: carrossel de projetos realizados */}
      <section id="portfolio">
        <Portfolio />
      </section>

      {/* Processo: como trabalhamos */}
      <Process />

      {/* Cobertura: América do Sul */}
      <section id="cobertura">
        <Coverage />
      </section>

      {/* Depoimentos: prova social */}
      <Testimonials />

      {/* Contato: captação de leads */}
      <section id="contato">
        <Contact />
      </section>

      {/* Rodapé */}
      <Footer />

    </main>
  )
}
