/**
 * constants.ts — Dados e configurações globais do site
 *
 * Centraliza todos os dados estáticos utilizados pelos componentes:
 * serviços, portfólio, depoimentos, estatísticas e links sociais.
 *
 * Em produção, estes dados podem ser migrados para um CMS (Contentful,
 * Sanity, Notion API, etc.) sem alterar os componentes que os consomem.
 */

import {
  ScanSearch,
  Clapperboard,
  Building2,
  Trophy,
  Home,
  Aperture,
  LucideIcon,
} from 'lucide-react'

/* ------------------------------------------------------------------
   Tipos
   ------------------------------------------------------------------ */

export interface Service {
  id: string
  title: string
  description: string
  longDescription: string
  Icon: LucideIcon
  image: string     // URL Unsplash placeholder — substituir por imagens reais
  tag: string
  color: string     // gradiente de destaque no hover
}

export interface PortfolioItem {
  id: string
  title: string
  category: string
  image: string
  location: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  text: string
  avatar: string
  rating: number
}

export interface Stat {
  value: number
  suffix: string
  label: string
  description: string
}

/* ------------------------------------------------------------------
   Navegação
   ------------------------------------------------------------------ */

export const NAV_LINKS = [
  { label: 'Início',      href: '#hero' },
  { label: 'Serviços',    href: '#servicos' },
  { label: 'Portfólio',   href: '#portfolio' },
  { label: 'Sobre',       href: '#sobre' },
  { label: 'Cobertura',   href: '#cobertura' },
  { label: 'Contato',     href: '#contato' },
] as const

/* ------------------------------------------------------------------
   Links para redes sociais
   Substituir pelos handles reais da DroneLENS.
   ------------------------------------------------------------------ */

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/dronelens',
  youtube:   'https://youtube.com/@dronelens',
  linkedin:  'https://linkedin.com/company/dronelens',
  tiktok:    'https://tiktok.com/@dronelens',
} as const

/* ------------------------------------------------------------------
   Serviços oferecidos
   Cada serviço tem imagem de placeholder do Unsplash (aerial/drone themed).
   ------------------------------------------------------------------ */

export const SERVICES: Service[] = [
  {
    id: 'vistorias',
    title: 'Vistorias Técnicas',
    description: 'Inspeção de estruturas e edificações com câmeras de alta resolução.',
    longDescription:
      'Acesse qualquer estrutura com segurança e precisão. ' +
      'Inspecionamos torres de energia, pontes, coberturas, fachadas e ' +
      'estruturas industriais de difícil acesso, gerando relatórios visuais detalhados.',
    Icon: ScanSearch,
    image:
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=85&auto=format&fit=crop',
    tag: 'Engenharia',
    color: 'from-blue-600 to-cyan-500',
  },
  {
    id: 'eventos',
    title: 'Filmagem de Eventos',
    description: 'Casamentos, shows, festivais e celebrações capturados do alto.',
    longDescription:
      'Transforme qualquer evento em memória cinematográfica. ' +
      'Cobrimos casamentos, formaturas, shows e festivais com ângulos únicos ' +
      'que cameras convencionais não alcançam.',
    Icon: Clapperboard,
    image:
      'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=85&auto=format&fit=crop',
    tag: 'Entretenimento',
    color: 'from-violet-600 to-pink-500',
  },
  {
    id: 'institucional',
    title: 'Vídeos Institucionais',
    description: 'Conteúdo aéreo para marcas, órgãos públicos e grandes empresas.',
    longDescription:
      'Eleve a comunicação da sua organização com imagens aéreas impactantes. ' +
      'Produzimos vídeos institucionais para empresas privadas, prefeituras, ' +
      'órgãos governamentais e organizações do terceiro setor.',
    Icon: Building2,
    image:
      'https://images.unsplash.com/photo-1486406869267-3f6a0f7d3a4c?w=800&q=85&auto=format&fit=crop',
    tag: 'Corporativo',
    color: 'from-slate-600 to-blue-600',
  },
  {
    id: 'esportes',
    title: 'Eventos Esportivos',
    description: 'Corridas, jogos e competições com a dinâmica do movimento aéreo.',
    longDescription:
      'A energia dos esportes vista de cima. Cobrimos maratonas, ' +
      'campeonatos de futebol, automobilismo, ciclismo e esportes radicais ' +
      'com drones de alta velocidade e câmeras de última geração.',
    Icon: Trophy,
    image:
      'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=85&auto=format&fit=crop',
    tag: 'Esportes',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'imoveis',
    title: 'Lançamentos Imobiliários',
    description: 'Imagens aéreas que valorizam empreendimentos e aceleram vendas.',
    longDescription:
      'Destaque seu empreendimento no mercado com imagens que mostram o melhor ' +
      'da localização, do entorno e da arquitetura. Atendemos construtoras, ' +
      'incorporadoras e imobiliárias em toda a América do Sul.',
    Icon: Home,
    image:
      'https://images.unsplash.com/photo-1512917774080-9991b1c3602a?w=800&q=85&auto=format&fit=crop',
    tag: 'Imobiliário',
    color: 'from-emerald-600 to-teal-500',
  },
  {
    id: 'fotografia',
    title: 'Fotografia Aérea',
    description: 'Fotografia de alta fidelidade para turismo, urbanismo e arte.',
    longDescription:
      'Do pôr do sol sobre Curitiba às paisagens da Patagônia. ' +
      'Nossa fotografia aérea captura a beleza do Brasil e da América do Sul ' +
      'com resolução e qualidade de publicação internacional.',
    Icon: Aperture,
    image:
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=85&auto=format&fit=crop',
    tag: 'Arte & Turismo',
    color: 'from-amber-500 to-orange-500',
  },
]

/* ------------------------------------------------------------------
   Portfólio — itens para o carrossel de destaque
   10 imagens de projetos realizados (placeholders Unsplash)
   ------------------------------------------------------------------ */

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'p01',
    title: 'Skyline de Curitiba',
    category: 'Fotografia Aérea',
    image:
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=700&h=480&q=85&auto=format&fit=crop',
    location: 'Curitiba, PR',
  },
  {
    id: 'p02',
    title: 'Vistoria de Torre Industrial',
    category: 'Vistoria Técnica',
    image:
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=700&h=480&q=85&auto=format&fit=crop',
    location: 'São Paulo, SP',
  },
  {
    id: 'p03',
    title: 'Lançamento Residencial Alto do Iguaçu',
    category: 'Lançamento Imobiliário',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991b1c3602a?w=700&h=480&q=85&auto=format&fit=crop',
    location: 'Curitiba, PR',
  },
  {
    id: 'p04',
    title: 'Festival Gastronômico Curitiba',
    category: 'Eventos',
    image:
      'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=700&h=480&q=85&auto=format&fit=crop',
    location: 'Curitiba, PR',
  },
  {
    id: 'p05',
    title: 'Maratona Internacional de Buenos Aires',
    category: 'Eventos Esportivos',
    image:
      'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=700&h=480&q=85&auto=format&fit=crop',
    location: 'Buenos Aires, ARG',
  },
  {
    id: 'p06',
    title: 'Serra Gaúcha Vista do Alto',
    category: 'Fotografia Aérea',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=480&q=85&auto=format&fit=crop',
    location: 'Bento Gonçalves, RS',
  },
  {
    id: 'p07',
    title: 'Inspeção de Usina Solar',
    category: 'Vistoria Técnica',
    image:
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&h=480&q=85&auto=format&fit=crop',
    location: 'Pernambuco, PE',
  },
  {
    id: 'p08',
    title: 'Vídeo Institucional Prefeitura de Curitiba',
    category: 'Institucional',
    image:
      'https://images.unsplash.com/photo-1486406869267-3f6a0f7d3a4c?w=700&h=480&q=85&auto=format&fit=crop',
    location: 'Curitiba, PR',
  },
  {
    id: 'p09',
    title: 'Campeonato de Motocross',
    category: 'Eventos Esportivos',
    image:
      'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=700&h=480&q=85&auto=format&fit=crop',
    location: 'Florianópolis, SC',
  },
  {
    id: 'p10',
    title: 'Condomínio Horizontal Vista Verde',
    category: 'Lançamento Imobiliário',
    image:
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=700&h=480&q=85&auto=format&fit=crop',
    location: 'Londrina, PR',
  },
]

/* ------------------------------------------------------------------
   Estatísticas da empresa — usadas na seção "Sobre"
   ------------------------------------------------------------------ */

export const STATS: Stat[] = [
  {
    value: 10,
    suffix: '+',
    label: 'Anos de Experiência',
    description: 'Uma década pioneirando a filmagem aérea no Sul do Brasil',
  },
  {
    value: 600,
    suffix: '+',
    label: 'Projetos Concluídos',
    description: 'De vistorias a grandes produções audiovisuais',
  },
  {
    value: 9,
    suffix: '',
    label: 'Países Atendidos',
    description: 'Operações em toda a América do Sul',
  },
  {
    value: 200,
    suffix: '+',
    label: 'Clientes Fidelizados',
    description: 'Empresas e pessoas que voltam e recomendam',
  },
]

/* ------------------------------------------------------------------
   Depoimentos de clientes
   ------------------------------------------------------------------ */

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't01',
    name: 'Rodrigo Cavalcanti',
    role: 'Diretor de Marketing',
    company: 'Grupo Construsul',
    text:
      'A DroneLENS transformou completamente nossas campanhas de lançamento imobiliário. ' +
      'As imagens aéreas são de uma qualidade impressionante e o material foi entregue ' +
      'dentro do prazo, com toda a profissionalidade que precisávamos.',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&q=80&auto=format&fit=crop&crop=face',
    rating: 5,
  },
  {
    id: 't02',
    name: 'Ana Paula Ferreira',
    role: 'Coordenadora de Eventos',
    company: 'Curitiba Eventos',
    text:
      'Contratamos para cobrir o Festival Gastronômico e ficamos impressionados. ' +
      'Além da qualidade técnica impecável, a equipe é extremamente discreta e profissional, ' +
      'não interferiu em nada durante o evento. Super recomendo!',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b2d0a5a0?w=100&h=100&q=80&auto=format&fit=crop&crop=face',
    rating: 5,
  },
  {
    id: 't03',
    name: 'Eng. Marcos Vieira',
    role: 'Gerente de Infraestrutura',
    company: 'Energética Paraná',
    text:
      'Usamos os serviços de vistoria técnica em torres de transmissão. ' +
      'O relatório visual gerado com as imagens do drone economizou semanas de trabalho ' +
      'em campo e foi decisivo para o nosso plano de manutenção preventiva.',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&q=80&auto=format&fit=crop&crop=face',
    rating: 5,
  },
]

/* ------------------------------------------------------------------
   Etapas do processo de trabalho
   ------------------------------------------------------------------ */

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Briefing',
    description:
      'Entendemos seus objetivos, o ambiente de voo e as expectativas de entrega. ' +
      'Cada projeto começa com uma conversa honesta.',
  },
  {
    step: '02',
    title: 'Planejamento de Voo',
    description:
      'Nossa equipe elabora o roteiro de captação, verifica as regras da ANAC ' +
      'para o espaço aéreo e prepara o equipamento DJI ideal para o projeto.',
  },
  {
    step: '03',
    title: 'Captação e Edição',
    description:
      'Voamos, capturamos e editamos com maestria. Você recebe o material ' +
      'em alta resolução, pronto para publicação ou uso profissional.',
  },
]

/* ------------------------------------------------------------------
   Países / estados atendidos (para a seção de cobertura)
   ------------------------------------------------------------------ */

export const COVERAGE_LOCATIONS = [
  { name: 'Brasil',    detail: 'Sede em Curitiba · Pilotos em SP, RJ, RS, SC, PR, MG' },
  { name: 'Argentina', detail: 'Buenos Aires · Mendoza · Córdoba' },
  { name: 'Uruguai',   detail: 'Montevidéu · Punta del Este' },
  { name: 'Paraguai',  detail: 'Assunção' },
  { name: 'Chile',     detail: 'Santiago · Valparaíso' },
  { name: 'Bolívia',   detail: 'La Paz · Santa Cruz de la Sierra' },
  { name: 'Peru',      detail: 'Lima · Cusco' },
  { name: 'Colômbia',  detail: 'Bogotá · Medellín' },
  { name: 'Equador',   detail: 'Quito · Guayaquil' },
]
