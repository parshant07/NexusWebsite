// TypeScript type definitions

export interface HeroContent {
  title: string
  subtitle: string
  stats: {
    number: string
    label: string
  }[]
}

export interface Service {
  id: number
  title: string
  description: string
  features: string[]
  icon: string
}

export interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  category: string
}

export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  image: string
}

export interface FAQ {
  id: number
  question: string
  answer: string
}

export interface ContentStore {
  hero: HeroContent
  services: Service[]
  projects: Project[]
  testimonials: Testimonial[]
  faqs: FAQ[]
}

export interface ContactFormData {
  name: string
  email: string
  company?: string
  projectType?: string
  budget?: string
  message: string
}

export interface NewsletterFormData {
  email: string
}