import { ImageResponse } from "next/og"
import { parseCitySlugs, type TimezoneCity } from "@/data/timezone-cities"

export const runtime = "edge"

const SIZE = { width: 1200, height: 630 } as const

const BG = "#0a0a0a"
const SURFACE_1 = "#141414"
const SURFACE_2 = "#1f1f1f"
const TEXT_PRIMARY = "#e6e6e6"
const TEXT_SECONDARY = "#a0a0a0"
const TEXT_MUTED = "#525252"
const ACCENT_BRIGHT = "#5b9bd5"

function getTimezoneOffsetMinutes(date: Date, timezone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date)
  const v: Record<string, string> = {}
  for (const p of parts) v[p.type] = p.value
  const asUTC = Date.UTC(
    Number(v.year),
    Number(v.month) - 1,
    Number(v.day),
    Number(v.hour) % 24,
    Number(v.minute),
    Number(v.second),
  )
  return Math.round((asUTC - date.getTime()) / 60000)
}

function isDST(timezone: string): boolean {
  const now = new Date()
  const jan = new Date(now.getFullYear(), 0, 1)
  const jul = new Date(now.getFullYear(), 6, 1)
  const a = getTimezoneOffsetMinutes(jan, timezone)
  const b = getTimezoneOffsetMinutes(jul, timezone)
  if (a === b) return false
  return getTimezoneOffsetMinutes(now, timezone) === Math.max(a, b)
}

function formatTime(timezone: string): string {
  return new Date().toLocaleTimeString("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

function formatOffset(timezone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    timeZoneName: "shortOffset",
  }).formatToParts(new Date())
  return parts.find((p) => p.type === "timeZoneName")?.value ?? ""
}

type Scale = {
  headerFontSize: number
  headerCodeOffsetFontSize: number
  timeFontSize: number
  flagWidth: number
  flagHeight: number
  padding: number
  gap: number
  cardGap: number
  /** If true, stack the city name above the code+offset to avoid horizontal
   *  truncation on narrow cards. */
  stackHeader: boolean
}

function scaleFor(count: number): Scale {
  // Flag aspect is 3:2 (the most common international convention) — matches
  // flagcdn's flat `w{N}` URL format which preserves natural proportions.
  if (count <= 2) {
    return {
      headerFontSize: 36,
      headerCodeOffsetFontSize: 28,
      timeFontSize: 140,
      flagWidth: 48,
      flagHeight: 32,
      padding: 40,
      gap: 24,
      cardGap: 32,
      stackHeader: false,
    }
  }
  if (count === 3) {
    return {
      headerFontSize: 28,
      headerCodeOffsetFontSize: 22,
      timeFontSize: 96,
      flagWidth: 40,
      flagHeight: 27,
      padding: 32,
      gap: 20,
      cardGap: 24,
      stackHeader: true,
    }
  }
  // 4 cards
  return {
    headerFontSize: 24,
    headerCodeOffsetFontSize: 18,
    timeFontSize: 76,
    flagWidth: 32,
    flagHeight: 22,
    padding: 24,
    gap: 16,
    cardGap: 20,
    stackHeader: true,
  }
}

function TimezoneCard({ city, scale }: { city: TimezoneCity; scale: Scale }) {
  const code =
    city.code.daylight && isDST(city.timezone)
      ? city.code.daylight
      : city.code.standard

  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        background: SURFACE_1,
        border: `1px solid ${SURFACE_2}`,
        borderRadius: 16,
        padding: scale.padding,
        gap: scale.gap,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: scale.stackHeader ? "column" : "row",
          alignItems: scale.stackHeader ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: scale.stackHeader ? 8 : 12,
          fontSize: scale.headerFontSize,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src={`https://flagcdn.com/w160/${city.country}.png`}
            width={scale.flagWidth}
            height={scale.flagHeight}
            alt=""
            style={{ borderRadius: 4, objectFit: "contain" }}
          />
          <span style={{ color: TEXT_SECONDARY }}>{city.name}</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span
            style={{
              color: TEXT_SECONDARY,
              fontSize: scale.headerCodeOffsetFontSize,
            }}
          >
            {code}
          </span>
          <span
            style={{
              color: TEXT_MUTED,
              fontSize: scale.headerCodeOffsetFontSize,
            }}
          >
            {formatOffset(city.timezone)}
          </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: scale.timeFontSize,
          fontWeight: 700,
          color: TEXT_PRIMARY,
          lineHeight: 1,
          letterSpacing: -2,
        }}
      >
        {formatTime(city.timezone)}
      </div>
    </div>
  )
}

export function GET(request: Request): ImageResponse {
  const url = new URL(request.url)
  // Cap at 4 cards so the 1200×630 canvas stays legible; anything beyond
  // that gets crammed for an OGP at typical share-preview sizes.
  const cities = parseCitySlugs(url.searchParams.get("cities")).slice(0, 4)
  const scale = scaleFor(cities.length)

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: BG,
        fontFamily: "monospace",
        padding: 56,
        gap: 40,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 12,
          fontSize: 28,
          color: TEXT_MUTED,
        }}
      >
        <span style={{ color: ACCENT_BRIGHT }}>kage1020</span>
        <span>@ web :</span>
        <span style={{ color: TEXT_SECONDARY }}>/apps/timezone</span>
        <span style={{ color: ACCENT_BRIGHT }}>$</span>
        <span>./timezone</span>
      </div>

      <div
        style={{
          display: "flex",
          gap: scale.cardGap,
          flex: 1,
        }}
      >
        {cities.map((city) => (
          <TimezoneCard key={city.slug} city={city} scale={scale} />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          color: TEXT_MUTED,
        }}
      >
        <span>kage1020.com</span>
        <span>{cities.map((c) => c.slug).join(" · ")}</span>
      </div>
    </div>,
    SIZE,
  )
}
