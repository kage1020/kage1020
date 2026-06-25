"use client"

const LAND_URL = "https://useland.app"

export default function LandApp() {
  return (
    <div className="space-y-5">
      <p className="text-text-secondary">
        Land is a next-generation knowledge management tool where AI automatically organizes your files. Visualize relationships on a canvas, and what you need naturally finds you.
      </p>
      <ul className="space-y-1.5 font-mono text-sm text-text-secondary">
        <li>• Manage information in 4 dimensions</li>
        <li>• AI organizes automatically</li>
        <li>• Compass — Before you search, it's there</li>
        <li>• Multimodal search</li>
        <li>• An AI agent works on your behalf</li>
      </ul>
      <a
        href={LAND_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center rounded border border-surface-2 bg-surface-1 px-3 py-2 font-mono text-sm text-text-secondary transition-colors hover:border-accent hover:text-accent-bright"
      >
        open {LAND_URL} ↗
      </a>
    </div>
  )
}
