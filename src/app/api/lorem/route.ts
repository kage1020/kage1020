import { NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const endpoint = searchParams.get("endpoint")
  const length = searchParams.get("length")

  if (!endpoint) {
    return NextResponse.json(
      { error: "Missing endpoint parameter" },
      { status: 400 }
    )
  }

  try {
    const baseUrl = "https://random.kage1020.com"
    const url =
      length && length !== "null"
        ? `${baseUrl}${endpoint}/${length}`
        : `${baseUrl}${endpoint}`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.text()

    return new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    })
  } catch (error) {
    console.error("Error fetching from Lorem API:", error)
    return NextResponse.json(
      { error: "Failed to fetch data from Lorem API" },
      { status: 500 }
    )
  }
}
