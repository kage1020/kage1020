import { Fragment } from "react"
import { cn } from "@/lib/cn"

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue }

const MAX_DEPTH = 6

/**
 * Json — pretty-prints a JSON-serializable value with TUI syntax colors.
 * Server-component compatible.
 */
export function Json({
  value,
  className,
  indent = "  ",
}: {
  value: JsonValue
  className?: string
  indent?: string
}) {
  return (
    <pre
      className={cn(
        "whitespace-pre-wrap break-all font-mono leading-relaxed text-text-secondary",
        className,
      )}
    >
      {render(value, 0, indent, "$")}
    </pre>
  )
}

function render(
  value: JsonValue,
  depth: number,
  indent: string,
  path: string,
): React.ReactNode {
  if (depth > MAX_DEPTH) {
    return <span className="text-text-muted">…</span>
  }
  if (value === null) {
    return <span className="text-text-muted">null</span>
  }
  if (typeof value === "boolean") {
    return <span className="text-warning">{String(value)}</span>
  }
  if (typeof value === "number") {
    return <span className="text-accent-bright">{value}</span>
  }
  if (typeof value === "string") {
    return <span className="text-success">"{value}"</span>
  }
  if (Array.isArray(value)) {
    return renderArray(value, depth, indent, path)
  }
  return renderObject(value, depth, indent, path)
}

function renderArray(
  arr: JsonValue[],
  depth: number,
  indent: string,
  path: string,
): React.ReactNode {
  if (arr.length === 0) {
    return <span className="text-text-muted">[]</span>
  }
  const pad = indent.repeat(depth + 1)
  const closePad = indent.repeat(depth)
  const items: React.ReactNode[] = []
  for (let i = 0; i < arr.length; i++) {
    const childPath = `${path}[${i}]`
    const isLast = i === arr.length - 1
    items.push(
      <Fragment key={childPath}>
        {"\n"}
        {pad}
        {render(arr[i], depth + 1, indent, childPath)}
        {!isLast && <span className="text-text-muted">,</span>}
      </Fragment>,
    )
  }
  return (
    <>
      <span className="text-text-muted">[</span>
      {items}
      {"\n"}
      {closePad}
      <span className="text-text-muted">]</span>
    </>
  )
}

function renderObject(
  obj: { [key: string]: JsonValue },
  depth: number,
  indent: string,
  path: string,
): React.ReactNode {
  const entries = Object.entries(obj)
  if (entries.length === 0) {
    return <span className="text-text-muted">{`{}`}</span>
  }
  const pad = indent.repeat(depth + 1)
  const closePad = indent.repeat(depth)
  const items: React.ReactNode[] = []
  for (const [key, val] of entries) {
    const childPath = `${path}.${key}`
    const isLast = key === entries[entries.length - 1][0]
    items.push(
      <Fragment key={childPath}>
        {"\n"}
        {pad}
        <span className="text-text-primary">"{key}"</span>
        <span className="text-text-muted">: </span>
        {render(val, depth + 1, indent, childPath)}
        {!isLast && <span className="text-text-muted">,</span>}
      </Fragment>,
    )
  }
  return (
    <>
      <span className="text-text-muted">{`{`}</span>
      {items}
      {"\n"}
      {closePad}
      <span className="text-text-muted">{`}`}</span>
    </>
  )
}
