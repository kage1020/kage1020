import type { Route } from "next"

export interface Article {
  title: string
  url: string
  type?: "blog" | "tech" | "external"
}

export interface Gallery {
  id: string
  title: string
  description: string
  technologies: string[]
  thumbnail: string
  screenshots: string[]
  links: {
    demo?: string
    github?: string
  }
  articles?: Article[]
  date: string
}

export interface App {
  id: string
  title: string
  description: string
  url: Route
  status: "active" | "maintenance" | "development"
  technologies: string[]
  category: string
  screenshot: string
  articles?: Article[]
  lastUpdated: string
  github?: string
}
