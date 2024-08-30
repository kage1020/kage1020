import { NextResponse, type NextRequest } from "next/server"

export default function middleware(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q")

  switch (query) {
    case "400":
      return new NextResponse("Bad Request", { status: 400 })
    case "401":
      return new NextResponse("Unauthorized", { status: 401 })
    case "403":
      return new NextResponse("Forbidden", { status: 403 })
    case "404":
      return new NextResponse("Not Found", { status: 404 })
    case "418":
      return new NextResponse("I'm a teapot", { status: 418 })
    case "500":
      return new NextResponse("Internal Server Error", { status: 500 })
  }
}
