"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/cn"

/** Upstream API origin — shown to the user as a link. */
const UPSTREAM = "https://random.kage1020.com"
/** Internal proxy route that forwards to the upstream (avoids CORS). */
const PROXY = "/api/random"

type Param =
  | {
      name: string
      type: "number"
      default: number
      min?: number
      max?: number
    }
  | { name: string; type: "string"; default: string; placeholder?: string }

type Endpoint = {
  id: string
  label: string
  /** Base path, e.g. "/cuid" or "/person". Params are appended as `/value` segments. */
  path: string
  params?: Param[]
  /** If true, the output is JSON-like and should render monospace with pre. */
  json?: boolean
}

type Category = {
  id: string
  label: string
  items: Endpoint[]
}

const lengthParam = (dflt: number, max: number): Param => ({
  name: "length",
  type: "number",
  default: dflt,
  min: 1,
  max,
})

const categories: Category[] = [
  {
    id: "id",
    label: "Identifier",
    items: [
      { id: "cuid", label: "CUID", path: "/cuid" },
      { id: "cuid2", label: "CUID2", path: "/cuid2" },
      { id: "uuidv4", label: "UUID v4", path: "/uuidv4" },
      { id: "uuidv7", label: "UUID v7", path: "/uuidv7" },
      { id: "ulid", label: "ULID", path: "/ulid" },
    ],
  },
  {
    id: "random",
    label: "Random String",
    items: [
      { id: "hex", label: "Hex", path: "/hex", params: [lengthParam(16, 256)] },
      {
        id: "number",
        label: "Number",
        path: "/number",
        params: [lengthParam(10, 256)],
      },
      {
        id: "alphabet",
        label: "Alphabet",
        path: "/alphabet",
        params: [lengthParam(16, 256)],
      },
      {
        id: "alphaUpper",
        label: "Alphabet (upper)",
        path: "/alphaUpper",
        params: [lengthParam(16, 256)],
      },
      {
        id: "alphaLower",
        label: "Alphabet (lower)",
        path: "/alphaLower",
        params: [lengthParam(16, 256)],
      },
      {
        id: "alphaNumeric",
        label: "Alphanumeric",
        path: "/alphaNumeric",
        params: [lengthParam(16, 256)],
      },
      {
        id: "alphaNumericUpper",
        label: "Alphanumeric (upper)",
        path: "/alphaNumericUpper",
        params: [lengthParam(16, 256)],
      },
      {
        id: "alphaNumericLower",
        label: "Alphanumeric (lower)",
        path: "/alphaNumericLower",
        params: [lengthParam(16, 256)],
      },
      {
        id: "symbol",
        label: "Symbol",
        path: "/symbol",
        params: [lengthParam(16, 256)],
      },
      {
        id: "alphaNumericSymbol",
        label: "Alphanumeric + Symbol",
        path: "/alphaNumericSymbol",
        params: [lengthParam(16, 256)],
      },
      {
        id: "alphaNumericSymbolUpper",
        label: "Alphanumeric + Symbol (upper)",
        path: "/alphaNumericSymbolUpper",
        params: [lengthParam(16, 256)],
      },
      {
        id: "alphaNumericSymbolLower",
        label: "Alphanumeric + Symbol (lower)",
        path: "/alphaNumericSymbolLower",
        params: [lengthParam(16, 256)],
      },
    ],
  },
  {
    id: "japanese",
    label: "Japanese",
    items: [
      {
        id: "hiragana",
        label: "Hiragana",
        path: "/hiragana",
        params: [lengthParam(20, 1000)],
      },
      {
        id: "katakana",
        label: "Katakana",
        path: "/katakana",
        params: [lengthParam(20, 1000)],
      },
      {
        id: "kanji",
        label: "Kanji",
        path: "/kanji",
        params: [lengthParam(20, 1000)],
      },
      {
        id: "kanji2",
        label: "Kanji (rare)",
        path: "/kanji2",
        params: [lengthParam(20, 1000)],
      },
      {
        id: "japanese",
        label: "Japanese (mixed)",
        path: "/japanese",
        params: [lengthParam(100, 2000)],
      },
    ],
  },
  {
    id: "text",
    label: "Text",
    items: [
      {
        id: "lorem",
        label: "Lorem Ipsum",
        path: "/lorem",
        params: [lengthParam(200, 5000)],
      },
    ],
  },
  {
    id: "author",
    label: "Author (Japanese)",
    items: [
      {
        id: "author-natsume",
        label: "Natsume Soseki",
        path: "/natsume",
        params: [lengthParam(200, 2000)],
      },
      {
        id: "author-akutagawa",
        label: "Akutagawa Ryunosuke",
        path: "/akutagawa",
        params: [lengthParam(200, 2000)],
      },
      {
        id: "author-dazai",
        label: "Dazai Osamu",
        path: "/dazai",
        params: [lengthParam(200, 2000)],
      },
      {
        id: "author-mori",
        label: "Mori Ogai",
        path: "/mori",
        params: [lengthParam(200, 2000)],
      },
      {
        id: "author-miyazawa",
        label: "Miyazawa Kenji",
        path: "/miyazawa",
        params: [lengthParam(200, 2000)],
      },
    ],
  },
  {
    id: "structured",
    label: "Structured",
    items: [
      {
        id: "person",
        label: "Person",
        path: "/person",
        params: [
          {
            name: "keys",
            type: "string",
            default: "first,last",
            placeholder: "comma-separated keys",
          },
          { name: "length", type: "number", default: 3, min: 1, max: 100 },
        ],
        json: true,
      },
    ],
  },
  {
    id: "crypto",
    label: "Crypto",
    items: [
      { id: "rsa-jwk", label: "RSA (JWK)", path: "/rsa/jwk", json: true },
      { id: "rsa-pem", label: "RSA (PEM)", path: "/rsa/pem", json: true },
    ],
  },
]

function findEndpoint(id: string): Endpoint | undefined {
  for (const c of categories) {
    const match = c.items.find((i) => i.id === id)
    if (match) return match
  }
}

type ParamValues = Record<string, string | number>

function initialValues(endpoint: Endpoint | undefined): ParamValues {
  if (!endpoint?.params) return {}
  return Object.fromEntries(endpoint.params.map((p) => [p.name, p.default]))
}

function buildPath(endpoint: Endpoint, values: ParamValues): string {
  const parts = (endpoint.params ?? [])
    .map((p) => encodeURIComponent(String(values[p.name] ?? p.default)))
    .join("/")
  return parts ? `${endpoint.path}/${parts}` : endpoint.path
}

export default function LoremTextApp() {
  const [endpointId, setEndpointId] = useState("lorem")
  const [values, setValues] = useState<ParamValues>(() =>
    initialValues(findEndpoint("lorem")),
  )
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const endpoint = findEndpoint(endpointId)

  const fetchResult = useCallback(async (ep: Endpoint, v: ParamValues) => {
    setLoading(true)
    setError(null)
    setCopied(false)
    try {
      const res = await fetch(`${PROXY}${buildPath(ep, v)}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const raw = await res.text()
      if (ep.json) {
        try {
          setResult(JSON.stringify(JSON.parse(raw), null, 2))
          return
        } catch {
          // fall through — upstream wasn't valid JSON
        }
      }
      setResult(raw)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed")
      setResult("")
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial fetch on mount so users see output immediately.
  const didInit = useRef(false)
  useEffect(() => {
    if (didInit.current || !endpoint) return
    didInit.current = true
    fetchResult(endpoint, values)
  }, [endpoint, values, fetchResult])

  const generate = useCallback(() => {
    if (endpoint) fetchResult(endpoint, values)
  }, [endpoint, values, fetchResult])

  const selectEndpoint = useCallback(
    (id: string) => {
      const ep = findEndpoint(id)
      if (!ep) return
      const next = initialValues(ep)
      setEndpointId(id)
      setValues(next)
      fetchResult(ep, next)
    },
    [fetchResult],
  )

  const updateParam = useCallback((name: string, raw: string | number) => {
    setValues((prev) => ({ ...prev, [name]: raw }))
  }, [])

  const copy = useCallback(async () => {
    if (!result) return
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [result])

  return (
    <div className="space-y-6">
      {/* Category + endpoint picker */}
      <div className="space-y-4 sm:space-y-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-3"
          >
            <span className="shrink-0 text-xs uppercase tracking-widest text-text-muted sm:w-32">
              {category.label}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {category.items.map((item) => {
                const active = item.id === endpointId
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => selectEndpoint(item.id)}
                    className={cn(
                      "rounded border px-2 py-0.5 font-mono text-xs transition-colors",
                      active
                        ? "border-accent/50 bg-accent/10 text-accent-bright"
                        : "border-surface-2 text-text-secondary hover:border-surface-3 hover:text-text-primary",
                    )}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 border-t border-surface-2 pt-4">
        {endpoint?.params?.map((param) => {
          const inputId = `lorem-param-${endpointId}-${param.name}`
          return (
            <div
              key={param.name}
              className="flex items-center gap-2 font-mono text-sm text-text-secondary"
            >
              <label htmlFor={inputId} className="text-text-muted">
                {param.name}:
              </label>
              {param.type === "number" && (
                <input
                  id={inputId}
                  type="number"
                  min={param.min ?? 1}
                  max={param.max ?? 1000}
                  value={Number(values[param.name] ?? param.default)}
                  onChange={(e) =>
                    updateParam(
                      param.name,
                      Math.max(param.min ?? 1, Number(e.target.value) || 1),
                    )
                  }
                  className="w-20 rounded border border-surface-2 bg-surface-1 px-2 py-1 font-mono text-sm text-text-primary outline-none focus:border-accent"
                />
              )}
              {param.type !== "number" && (
                <input
                  id={inputId}
                  type="text"
                  value={String(values[param.name] ?? param.default)}
                  placeholder={param.placeholder}
                  onChange={(e) => updateParam(param.name, e.target.value)}
                  className="w-48 rounded border border-surface-2 bg-surface-1 px-2 py-1 font-mono text-sm text-text-primary outline-none focus:border-accent"
                />
              )}
            </div>
          )
        })}

        <button
          type="button"
          onClick={generate}
          disabled={loading}
          className="rounded bg-surface-2 px-3 py-1.5 font-mono text-sm text-text-secondary transition-colors hover:bg-surface-3 disabled:opacity-50"
        >
          {loading ? "…" : "↻"} generate
        </button>

        <button
          type="button"
          onClick={copy}
          disabled={!result || loading}
          className="rounded bg-surface-2 px-3 py-1.5 font-mono text-sm transition-colors hover:bg-surface-3 disabled:opacity-50"
        >
          {copied && <span className="text-success">✓ copied</span>}
          {!copied && <span className="text-text-secondary">⎘ copy</span>}
        </button>

        <a
          href={
            endpoint ? `${UPSTREAM}${buildPath(endpoint, values)}` : UPSTREAM
          }
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto font-mono text-xs text-text-muted hover:text-accent-bright"
        >
          {endpoint ? buildPath(endpoint, values) : ""} ↗
        </a>
      </div>

      {/* Output */}
      <div className="rounded-lg border border-surface-2 bg-surface-1 p-6">
        {error && (
          <p className="font-mono text-sm text-error">error: {error}</p>
        )}
        {!error && !result && (
          <p className="font-mono text-sm text-text-muted">
            {loading ? "fetching…" : "click generate"}
          </p>
        )}
        {!error && result && (
          <pre className="max-h-96 overflow-auto whitespace-pre-wrap break-all font-mono text-sm leading-relaxed text-text-secondary">
            {result}
          </pre>
        )}
      </div>

      {/* Stats */}
      {result && !error && (
        <div className="flex gap-6 font-mono text-xs text-text-muted">
          <span>{result.length} chars</span>
          <span>{[...result].length} code points</span>
          <span>{new Blob([result]).size} bytes</span>
        </div>
      )}
    </div>
  )
}
