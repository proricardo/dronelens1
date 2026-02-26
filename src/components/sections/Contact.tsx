/**
 * Contact.tsx — Seção de contato e captação de leads
 *
 * Posicionada estrategicamente após os depoimentos (prova social → ação).
 *
 * Layout:
 * - Fundo com gradiente escuro (cria contraste e senso de finalização)
 * - Coluna esquerda: copy persuasivo + informações de contato
 * - Coluna direita: formulário de captação de leads
 *
 * Formulário:
 * - Campos: Nome, E-mail, Telefone, Serviço de interesse (select), Mensagem
 * - Validação client-side com estado React (sem biblioteca externa)
 * - Estado de sucesso: animação de feedback após envio
 * - Em produção: integrar com formspree.io, resend.com ou API própria
 *
 * Anti-spam:
 * - Sem campo de honeypot necessário neste template
 * - Botão submit disabled durante "envio" (estado loading)
 *
 * Acessibilidade:
 * - Labels associados a cada input via htmlFor
 * - aria-required nos campos obrigatórios
 * - Mensagem de erro por campo (se implementado)
 * - Estado de sucesso anuncia via aria-live
 */

'use client'

import { useState, useRef, FormEvent } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Send, Phone, Mail, MapPin,
  CheckCircle2, Loader2,
  Instagram, Youtube, Linkedin,
} from 'lucide-react'
import { SOCIAL_LINKS, SERVICES } from '@/lib/constants'

/* --------------------------------------------------------------- */

/* Estado do formulário */
type FormState = 'idle' | 'loading' | 'success' | 'error'

/* Dados do formulário */
interface FormData {
  name:    string
  email:   string
  phone:   string
  service: string
  message: string
}

const EMPTY_FORM: FormData = {
  name: '', email: '', phone: '', service: '', message: '',
}

/* --------------------------------------------------------------- */

/* Campo de input reutilizável */
function FormField({
  label,
  id,
  required = false,
  children,
}: {
  label: string
  id: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-white/70"
      >
        {label}
        {required && <span className="text-brand-cyan ml-1" aria-hidden="true">*</span>}
      </label>
      {children}
    </div>
  )
}

/* Classes base para inputs e select */
const INPUT_BASE = `
  w-full px-4 py-3 rounded-xl text-sm
  bg-white/[0.06] border border-white/10
  text-white placeholder:text-white/30
  focus:outline-none focus:border-brand-blue/60 focus:bg-white/[0.09]
  transition-all duration-200
`

/* --------------------------------------------------------------- */

/* Estado de sucesso — exibido após envio */
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="
        flex flex-col items-center justify-center
        text-center py-16 gap-5
      "
      aria-live="polite"
      aria-label="Mensagem enviada com sucesso"
    >
      <div className="
        w-20 h-20 rounded-full
        bg-emerald-500/10 border border-emerald-500/30
        flex items-center justify-center
        animate-[glow-pulse_2s_ease-in-out_infinite]
      ">
        <CheckCircle2 size={36} className="text-emerald-400" />
      </div>

      <div>
        <h3 className="text-white text-2xl font-bold font-[family-name:var(--font-display)] mb-2">
          Mensagem enviada!
        </h3>
        <p className="text-white/55 text-sm max-w-xs leading-relaxed">
          Recebemos seu contato e nossa equipe responderá em até 24 horas úteis.
        </p>
      </div>

      <button
        onClick={onReset}
        className="
          mt-2 text-sm text-brand-cyan
          hover:text-white transition-colors
          underline underline-offset-4
        "
      >
        Enviar outra mensagem
      </button>
    </motion.div>
  )
}

/* --------------------------------------------------------------- */

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM)
  const [formState, setFormState] = useState<FormState>('idle')

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  /* Atualiza campo individual do formulário */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  /*
   * Submissão do formulário.
   * Em produção: substituir o setTimeout por uma chamada real à API.
   * Opções sugeridas:
   * - fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
   * - Formspree: fetch('https://formspree.io/f/SEU_ID', { ... })
   * - Resend: via route handler do Next.js em /app/api/contact/route.ts
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormState('loading')

    try {
      /*
       * ── SUBSTITUA AQUI pela integração real ──────────────────────
       * Exemplo com Formspree:
       *
       * const res = await fetch('https://formspree.io/f/SEU_FORM_ID', {
       *   method: 'POST',
       *   headers: { 'Content-Type': 'application/json' },
       *   body: JSON.stringify(formData),
       * })
       * if (!res.ok) throw new Error('Falha no envio')
       * ─────────────────────────────────────────────────────────────
       */

      /* Simulação de delay de rede */
      await new Promise((resolve) => setTimeout(resolve, 1800))

      setFormState('success')
    } catch {
      setFormState('error')
    }
  }

  const handleReset = () => {
    setFormData(EMPTY_FORM)
    setFormState('idle')
  }

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #080D1A 0%, #0D1B2E 60%, #080D1A 100%)',
      }}
    >
      {/* Decoração: efeito de luz no fundo */}
      <div
        className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-[0.12]"
        style={{ background: 'radial-gradient(circle, #0055FF 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-1/4 w-56 h-56 rounded-full blur-3xl opacity-[0.08]"
        style={{ background: 'radial-gradient(circle, #00C2FF 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div
        ref={ref}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Coluna esquerda: copy + contatos ────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Tag */}
            <span className="
              inline-flex items-center gap-2 px-3 py-1 rounded-full
              text-xs font-semibold tracking-widest uppercase mb-5
              text-brand-cyan border border-brand-cyan/20 bg-brand-cyan/5
            ">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
              Fale conosco
            </span>

            {/* Headline */}
            <h2 className="
              text-4xl sm:text-5xl font-bold text-white
              font-[family-name:var(--font-display)] leading-tight mb-5
            ">
              Pronto para{' '}
              <span className="text-gradient">decolar?</span>
            </h2>

            {/* Texto persuasivo */}
            <p className="text-white/55 text-base leading-relaxed mb-10 max-w-md">
              Descreva seu projeto e nossa equipe retorna com um orçamento
              detalhado em até 24 horas. Sem compromisso, sem burocracia.
            </p>

            {/* Informações de contato */}
            <ul className="space-y-5 mb-10">
              {[
                {
                  Icon: Phone,
                  label: 'Telefone',
                  value: '+55 (41) 99999-9999',
                  href: 'tel:+5541999999999',
                },
                {
                  Icon: Mail,
                  label: 'E-mail',
                  value: 'contato@dronelens.com.br',
                  href: 'mailto:contato@dronelens.com.br',
                },
                {
                  Icon: MapPin,
                  label: 'Localização',
                  value: 'Curitiba, PR — Atendemos toda a América do Sul',
                  href: null,
                },
              ].map(({ Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <div className="
                    w-10 h-10 rounded-xl flex-shrink-0
                    bg-white/[0.06] border border-white/10
                    flex items-center justify-center
                  ">
                    <Icon size={16} className="text-brand-cyan" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-xs text-white/35 font-medium uppercase tracking-wider mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm text-white/75 hover:text-white transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-white/75">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Redes sociais */}
            <div>
              <p className="text-xs text-white/35 font-medium uppercase tracking-wider mb-4">
                Portfólio nas redes
              </p>
              <div className="flex gap-3">
                {[
                  { Icon: Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
                  { Icon: Youtube,   href: SOCIAL_LINKS.youtube,   label: 'YouTube' },
                  { Icon: Linkedin,  href: SOCIAL_LINKS.linkedin,  label: 'LinkedIn' },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="
                      w-10 h-10 rounded-xl
                      bg-white/[0.06] border border-white/10
                      flex items-center justify-center
                      text-white/50 hover:text-white
                      hover:bg-brand-blue/20 hover:border-brand-blue/40
                      transition-all duration-200
                    "
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Coluna direita: formulário ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="
              p-8 rounded-3xl
              bg-white/[0.04]
              border border-white/10
              backdrop-blur-sm
            ">
              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <SuccessState key="success" onReset={handleReset} />
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    noValidate
                  >
                    {/* Linha: Nome + Telefone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField label="Nome" id="name" required>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Seu nome"
                          required
                          aria-required="true"
                          className={INPUT_BASE}
                          autoComplete="name"
                        />
                      </FormField>

                      <FormField label="Telefone" id="phone">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+55 (41) 9xxxx-xxxx"
                          className={INPUT_BASE}
                          autoComplete="tel"
                        />
                      </FormField>
                    </div>

                    {/* E-mail */}
                    <FormField label="E-mail" id="email" required>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        required
                        aria-required="true"
                        className={INPUT_BASE}
                        autoComplete="email"
                      />
                    </FormField>

                    {/* Serviço de interesse */}
                    <FormField label="Serviço de interesse" id="service">
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={`${INPUT_BASE} cursor-pointer`}
                      >
                        <option value="" disabled className="bg-dark-900">
                          Selecione um serviço
                        </option>
                        {SERVICES.map(({ id, title }) => (
                          <option key={id} value={id} className="bg-dark-900">
                            {title}
                          </option>
                        ))}
                        <option value="outro" className="bg-dark-900">
                          Outro / Não sei ainda
                        </option>
                      </select>
                    </FormField>

                    {/* Mensagem */}
                    <FormField label="Mensagem" id="message" required>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Conte um pouco sobre seu projeto: local, data, objetivos..."
                        required
                        aria-required="true"
                        rows={4}
                        className={`${INPUT_BASE} resize-none`}
                      />
                    </FormField>

                    {/* Erro de envio */}
                    {formState === 'error' && (
                      <p className="text-red-400 text-sm text-center">
                        Ocorreu um erro ao enviar. Tente novamente ou entre em contato por e-mail.
                      </p>
                    )}

                    {/* Botão de envio */}
                    <button
                      type="submit"
                      disabled={formState === 'loading'}
                      className="
                        w-full flex items-center justify-center gap-2.5
                        py-3.5 rounded-xl text-sm font-semibold
                        bg-brand-gradient text-white
                        shadow-[0_4px_24px_rgba(0,85,255,0.35)]
                        hover:shadow-[0_4px_32px_rgba(0,85,255,0.55)]
                        hover:scale-[1.02] active:scale-[0.98]
                        disabled:opacity-60 disabled:cursor-not-allowed
                        disabled:hover:scale-100 disabled:hover:shadow-none
                        transition-all duration-200
                      "
                      aria-label="Enviar mensagem de contato"
                    >
                      {formState === 'loading' ? (
                        <>
                          <Loader2 size={17} className="animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send size={17} strokeWidth={2} />
                          Solicitar Orçamento Grátis
                        </>
                      )}
                    </button>

                    {/* Disclaimer */}
                    <p className="text-[10px] text-white/25 text-center leading-relaxed">
                      Ao enviar, você concorda com nossa política de privacidade.
                      Não enviamos spam. Seus dados são usados apenas para retorno de contato.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
