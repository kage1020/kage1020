import type { NextRequest } from "next/server"

export default function middleware(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q")

  if (query === "403") {
    return new Response("Forbidden", { status: 403 })
  }
}
