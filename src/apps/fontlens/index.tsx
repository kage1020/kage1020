"use client"

const FONTLENS_URL = "https://fontlens.kage1020.com"

export default function FontLensApp() {
  return (
    <div className="space-y-5">
      <p className="text-text-secondary">
        Font Lens is a web font comparator focused on real usage checks, not
        isolated specimen views.
      </p>
      <ul className="space-y-1.5 font-mono text-sm text-text-secondary">
        <li>• Compare Google Fonts, custom CDN URLs, and system fonts</li>
        <li>
          • Validate typography in body, headings, UI labels, and code blocks
        </li>
        <li>• Check multilingual rendering under the same visual conditions</li>
      </ul>
      <a
        href={FONTLENS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center rounded border border-surface-2 bg-surface-1 px-3 py-2 font-mono text-sm text-text-secondary transition-colors hover:border-accent hover:text-accent-bright"
      >
        open {FONTLENS_URL} ↗
      </a>
    </div>
  )
}
