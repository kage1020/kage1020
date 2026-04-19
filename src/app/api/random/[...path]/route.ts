import { NextResponse } from "next/server"

const UPSTREAM = "https://random.kage1020.com"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params
  const upstream = `${UPSTREAM}/${path.join("/")}`
  const res = await fetch(upstream, { cache: "no-store" })

  if (!res.ok) {
    return NextResponse.json(
      { error: `upstream returned ${res.status}` },
      { status: res.status },
    )
  }

  const text = await res.text()
  return new NextResponse(text, {
    status: 200,
    headers: {
      "Content-Type":
        res.headers.get("content-type") ?? "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  })
}
