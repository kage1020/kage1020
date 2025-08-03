import { IconType } from "react-icons"
import {
  FaCode,
  FaDrawPolygon,
  FaFileImage,
  FaJava,
  FaMarkdown,
  FaServer,
} from "react-icons/fa"
import {
  SiAmazonwebservices,
  SiAngular,
  SiCplusplus,
  SiCss3,
  SiCypress,
  SiDjango,
  SiDocker,
  SiEslint,
  SiExpress,
  SiFastapi,
  SiFigma,
  SiFlask,
  SiGithub,
  SiGitlab,
  SiGo,
  SiGooglecloud,
  SiGraphql,
  SiHono,
  SiIconify,
  SiJavascript,
  SiJest,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPrettier,
  SiPython,
  SiReact,
  SiRedis,
  SiRust,
  SiSass,
  SiSocketdotio,
  SiSqlite,
  SiSvelte,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVuedotjs,
  SiWebpack,
} from "react-icons/si"

const techColorMap: Record<string, string> = {
  "Next.js": "bg-black text-white",
  React: "bg-[#61DAFB] text-black",
  "Vue.js": "bg-[#4FC08D] text-white",
  Angular: "bg-[#DD0031] text-white",
  Svelte: "bg-[#FF3E00] text-white",

  TypeScript: "bg-[#3178C6] text-white",
  JavaScript: "bg-[#F7DF1E] text-black",
  Python: "bg-[#3776AB] text-white",
  Java: "bg-[#ED8B00] text-white",
  "C++": "bg-[#00599C] text-white",
  Go: "bg-[#00ADD8] text-white",
  Rust: "bg-[#000000] text-white",
  PHP: "bg-[#777BB4] text-white",

  "Tailwind CSS": "bg-[#06B6D4] text-white",
  CSS: "bg-[#1572B6] text-white",
  SCSS: "bg-[#CF649A] text-white",
  "CSS Modules": "bg-[#000000] text-white",

  "Node.js": "bg-[#339933] text-white",
  Express: "bg-[#000000] text-white",
  FastAPI: "bg-[#009688] text-white",
  Django: "bg-[#092E20] text-white",
  Flask: "bg-[#000000] text-white",
  Hono: "bg-[#FF6600] text-white",

  PostgreSQL: "bg-[#336791] text-white",
  MySQL: "bg-[#4479A1] text-white",
  MongoDB: "bg-[#47A248] text-white",
  Redis: "bg-[#DC382D] text-white",
  SQLite: "bg-[#003B57] text-white",

  Docker: "bg-[#2496ED] text-white",
  Kubernetes: "bg-[#326CE5] text-white",
  AWS: "bg-[#FF9900] text-black",
  GCP: "bg-[#4285F4] text-white",
  Vercel: "bg-[#000000] text-white",
  Netlify: "bg-[#00C7B7] text-white",
  GitHub: "bg-[#181717] text-white",
  GitLab: "bg-[#FC6D26] text-white",

  "VSCode Extension": "bg-[#007ACC] text-white",
  Webpack: "bg-[#8DD6F9] text-black",
  Vite: "bg-[#646CFF] text-white",
  ESLint: "bg-[#4B32C3] text-white",
  Prettier: "bg-[#F7B93E] text-black",

  GraphQL: "bg-[#E10098] text-white",
  "REST API": "bg-[#25D366] text-white",
  "Socket.io": "bg-[#010101] text-white",
  "Three.js": "bg-[#000000] text-white",
  API: "bg-[#0052CC] text-white",

  Jest: "bg-[#C21325] text-white",
  Cypress: "bg-[#17202C] text-white",
  Playwright: "bg-[#2EAD33] text-white",

  "draw.io": "bg-[#F08705] text-white",
  Figma: "bg-[#F24E1E] text-white",

  "react-icons": "bg-[#61DAFB] text-black",
  iconify: "bg-[#1769AA] text-white",

  Marp: "bg-[#67B7D1] text-white",
  Markdown: "bg-[#000000] text-white",
}

const techIconMap: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  React: SiReact,
  "Vue.js": SiVuedotjs,
  Angular: SiAngular,
  Svelte: SiSvelte,

  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Python: SiPython,
  Java: FaJava,
  "C++": SiCplusplus,
  Go: SiGo,
  Rust: SiRust,
  PHP: SiPhp,

  "Tailwind CSS": SiTailwindcss,
  CSS: SiCss3,
  SCSS: SiSass,
  "CSS Modules": SiCss3,

  "Node.js": SiNodedotjs,
  Express: SiExpress,
  FastAPI: SiFastapi,
  Django: SiDjango,
  Flask: SiFlask,
  Hono: SiHono,

  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  SQLite: SiSqlite,

  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  AWS: SiAmazonwebservices,
  GCP: SiGooglecloud,
  Vercel: SiVercel,
  Netlify: SiNetlify,
  GitHub: SiGithub,
  GitLab: SiGitlab,

  "VSCode Extension": FaCode,
  Webpack: SiWebpack,
  Vite: SiVite,
  ESLint: SiEslint,
  Prettier: SiPrettier,

  GraphQL: SiGraphql,
  "Socket.io": SiSocketdotio,
  "Three.js": SiThreedotjs,
  API: FaServer,

  Jest: SiJest,
  Cypress: SiCypress,

  "draw.io": FaDrawPolygon,
  Figma: SiFigma,

  "react-icons": SiReact,
  iconify: SiIconify,

  Marp: FaFileImage,
  Markdown: FaMarkdown,
}

export function getTechColor(tech: string): string {
  return techColorMap[tech] || "bg-gray-600 text-white"
}

export function getTechIcon(tech: string): IconType | null {
  return techIconMap[tech] || null
}

export function getAvailableTechs(): string[] {
  return Object.keys(techColorMap)
}
