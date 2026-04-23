export type Work = {
  id: string
  title: string
  description: string
  platform: "vscode-marketplace" | "pypi"
  kind: "extension" | "package"
  url: string
  status: "published" | "active"
  technologies: string[]
}

export const works: Work[] = [
  {
    id: "icon-collection",
    title: "Icon Collection",
    description:
      "VS Code extension for exploring icon libraries inside the editor. Search by keyword, then copy SVG snippets or Draw.io-ready diagram data directly to the clipboard for fast prototyping and documentation.",
    platform: "vscode-marketplace",
    kind: "extension",
    url: "https://marketplace.visualstudio.com/items?itemName=kage1020.icon-collection",
    status: "published",
    technologies: ["VS Code Extension", "TypeScript"],
  },
  {
    id: "vut",
    title: "vut",
    description:
      "Video Understanding Toolkit (Python). A modular library for video understanding tasks such as video classification and action recognition, designed to be extensible for additional models and datasets.",
    platform: "pypi",
    kind: "package",
    url: "https://pypi.org/project/vut/",
    status: "published",
    technologies: ["Python", "PyPI"],
  },
  {
    id: "react-component-color",
    title: "React Component Color",
    description:
      "VS Code extension that visually distinguishes React Server and Client Components in JSX/TSX. It detects `use client` boundaries and client-only usage patterns so component roles are easier to understand in large codebases.",
    platform: "vscode-marketplace",
    kind: "extension",
    url: "https://marketplace.visualstudio.com/items?itemName=kage1020.react-component-color",
    status: "published",
    technologies: ["VS Code Extension", "TypeScript", "React"],
  },
]
