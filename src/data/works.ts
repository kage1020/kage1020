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
      "VS Code extension to search icon libraries and copy SVG/Draw.io data quickly.",
    platform: "vscode-marketplace",
    kind: "extension",
    url: "https://marketplace.visualstudio.com/items?itemName=kage1020.icon-collection",
    status: "published",
    technologies: ["VS Code Extension", "TypeScript"],
  },
  {
    id: "vut",
    title: "vut",
    description: "Python package published on PyPI.",
    platform: "pypi",
    kind: "package",
    url: "https://pypi.org/project/vut/0.1.7/",
    status: "published",
    technologies: ["Python", "PyPI"],
  },
  {
    id: "react-component-color",
    title: "React Component Color",
    description:
      "VS Code extension that color-codes React Server/Client components.",
    platform: "vscode-marketplace",
    kind: "extension",
    url: "https://marketplace.visualstudio.com/items?itemName=kage1020.react-component-color",
    status: "published",
    technologies: ["VS Code Extension", "TypeScript", "React"],
  },
]
