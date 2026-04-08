import { type NextRequest, NextResponse } from "next/server"

const statusEasterEggs: Record<number, string> = {
	418: "I'm a teapot. And proud of it.",
	451: "Unavailable for legal reasons. Blame the lawyers.",
	508: "Loop detected. The call is coming from inside the house.",
}

export function proxy(request: NextRequest) {
	const q = request.nextUrl.searchParams.get("q")
	if (q && statusEasterEggs[Number(q)]) {
		const code = Number(q)
		return new NextResponse(
			JSON.stringify({
				status: code,
				message: statusEasterEggs[code],
				hint: "You found an easter egg!",
			}),
			{
				status: code,
				headers: { "content-type": "application/json" },
			},
		)
	}

	return NextResponse.next()
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico|icons|llms).*)"],
}
