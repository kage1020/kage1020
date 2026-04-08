import { NextResponse } from "next/server"
import { principles } from "@/data/philosophy"

export function GET() {
	const data = {
		$schema: "https://kage1020.com/schemas/philosophy.json",
		version: "1.0.0",
		principles: principles.map((p) => ({
			id: p.id,
			number: p.number,
			category: p.category,
			title: p.title,
			title_ja: p.titleJa,
			description: p.description,
			description_ja: p.descriptionJa,
			checkpoints: p.checkpoints,
		})),
		meta: {
			author: "kage1020",
			site: "https://kage1020.com",
			last_updated: "2026-04-08",
		},
	}

	return NextResponse.json(data, {
		headers: {
			"Cache-Control": "public, max-age=86400",
		},
	})
}
