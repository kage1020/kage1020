"use client"

import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import {
  type TimezoneCity as City,
  timezoneCities as cities,
  DEFAULT_CITY_SLUGS,
  parseCitySlugs,
} from "@/data/timezone-cities"
import { cn } from "@/lib/cn"

/** Minutes the timezone is ahead of UTC at the given instant. */
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

/** True when the zone is currently observing DST. */
function isDST(timezone: string): boolean {
  const now = new Date()
  const jan = new Date(now.getFullYear(), 0, 1)
  const jul = new Date(now.getFullYear(), 6, 1)
  const janOffset = getTimezoneOffsetMinutes(jan, timezone)
  const julOffset = getTimezoneOffsetMinutes(jul, timezone)
  if (janOffset === julOffset) return false
  const current = getTimezoneOffsetMinutes(now, timezone)
  return current === Math.max(janOffset, julOffset)
}

function getCityCode(city: City): string {
  return city.code.daylight && isDST(city.timezone)
    ? city.code.daylight
    : city.code.standard
}

function Flag({
  country,
  label,
  size = 16,
}: {
  country: string
  label: string
  size?: number
}) {
  const height = Math.round(size * 0.75)
  return (
    <Image
      src={`https://flagcdn.com/${country}.svg`}
      alt={`${label} flag`}
      width={size}
      height={height}
      style={{ width: size, height }}
      className="inline-block rounded-sm align-[-2px]"
      unoptimized
    />
  )
}

function getTime(now: Date, timezone: string): string {
  return now.toLocaleTimeString("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
}

function getDate(now: Date, timezone: string): string {
  return now.toLocaleDateString("en-US", {
    timeZone: timezone,
    weekday: "short",
    month: "short",
    day: "numeric",
  })
}

function getOffset(now: Date, timezone: string): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    timeZoneName: "shortOffset",
  })
  const parts = formatter.formatToParts(now)
  const offsetPart = parts.find((p) => p.type === "timeZoneName")
  return offsetPart?.value ?? ""
}

function getHour(now: Date, timezone: string): number {
  return Number.parseInt(
    now.toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour: "numeric",
      hour12: false,
    }),
    10,
  )
}

function hourColor(hour: number): string {
  if (hour >= 6 && hour < 12) return "text-warning" // morning
  if (hour >= 12 && hour < 18) return "text-accent-bright" // afternoon
  if (hour >= 18 && hour < 22) return "text-success" // evening
  return "text-text-muted" // night
}

export default function TimezoneApp() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Selected cities are derived from `?cities=...`. The URL is the source of
  // truth so sharing the link preserves the selection (and drives OGP).
  const citiesParam = searchParams.get("cities")
  const selectedCitySlugs = parseCitySlugs(citiesParam).map((c) => c.slug)
  const selected = selectedCitySlugs
    .map((slug) => cities.find((c) => c.slug === slug)?.timezone)
    .filter((tz): tz is string => Boolean(tz))

  const setCitySlugs = useCallback(
    (slugs: string[]) => {
      const next = new URLSearchParams(searchParams.toString())
      const isDefault =
        slugs.length === DEFAULT_CITY_SLUGS.length &&
        slugs.every((s, i) => s === DEFAULT_CITY_SLUGS[i])
      if (slugs.length === 0 || isDefault) {
        next.delete("cities")
      } else {
        next.set("cities", slugs.join(","))
      }
      const query = next.toString()
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      })
    },
    [pathname, router, searchParams],
  )

  // Render placeholder on the server, then flip to real time once mounted.
  // `now` is consumed by every helper so the compiler can see the dependency
  // and re-render every tick.
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const toggleCity = (timezone: string) => {
    const city = cities.find((c) => c.timezone === timezone)
    if (!city) return
    const nextSlugs = selectedCitySlugs.includes(city.slug)
      ? selectedCitySlugs.filter((s) => s !== city.slug)
      : [...selectedCitySlugs, city.slug]
    setCitySlugs(nextSlugs)
  }

  const selectedCities = cities.filter((c) => selected.includes(c.timezone))

  return (
    <div className="space-y-8">
      {/* Selected cities - main display */}
      {selectedCities.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {selectedCities.map((city) => {
            const hour = now ? getHour(now, city.timezone) : -1
            return (
              <div
                key={city.timezone}
                className="rounded-lg border border-surface-2 bg-surface-1 p-5"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-text-secondary">
                    <Flag country={city.country} label={city.name} size={20} />
                    {city.name}
                  </span>
                  <TimezoneLabel city={city} now={now} />
                </div>
                <p
                  className={cn(
                    "font-mono font-bold",
                    now ? hourColor(hour) : "text-text-muted",
                  )}
                >
                  {now ? getTime(now, city.timezone) : "--:--:--"}
                </p>
                <p className="mt-1 font-mono text-text-muted">
                  {now ? getDate(now, city.timezone) : "—"}
                </p>
              </div>
            )
          })}
        </div>
      )}

      {/* City selector */}
      <div className="space-y-3">
        <h3 className="font-mono text-text-muted">Select cities</h3>
        <div className="flex flex-wrap gap-2">
          {cities.map((city) => (
            <button
              key={city.timezone}
              type="button"
              onClick={() => toggleCity(city.timezone)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono transition-colors",
                selected.includes(city.timezone)
                  ? "bg-accent/20 text-accent-bright"
                  : "bg-surface-2 text-text-muted hover:text-text-secondary",
              )}
            >
              <Flag country={city.country} label={city.name} />
              {city.name}
            </button>
          ))}
        </div>
      </div>

      {/* 24h timeline bar */}
      {selectedCities.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-mono text-text-muted">24h comparison</h3>
          <div className="space-y-2">
            {selectedCities.map((city) => {
              const hour = now ? getHour(now, city.timezone) : -1
              return (
                <div key={city.timezone} className="flex items-center gap-3">
                  <span className="inline-flex w-28 shrink-0 items-center gap-2 font-mono text-text-secondary">
                    <Flag country={city.country} label={city.name} />
                    {city.name}
                  </span>
                  <TimelineBar currentHour={hour} />
                </div>
              )
            })}
            <div className="flex items-center gap-3">
              <span className="w-28 shrink-0" />
              <div className="flex flex-1 justify-between font-mono text-text-muted">
                <span>0</span>
                <span>6</span>
                <span>12</span>
                <span>18</span>
                <span>23</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function TimezoneLabel({ city, now }: { city: City; now: Date | null }) {
  if (!now) {
    return <span className="font-mono text-text-muted">—</span>
  }
  return (
    <span className="inline-flex items-baseline gap-1.5 font-mono">
      <span className="text-text-secondary">{getCityCode(city)}</span>
      <span className="text-text-muted">{getOffset(now, city.timezone)}</span>
    </span>
  )
}

const hours = Array.from({ length: 24 }, (_, h) => h)

/**
 * Sky colors for each hour, defined in OKLCh so interpolation stays perceptual
 * and transitions don't muddy at hue boundaries. Verified visually as a
 * continuous gradient before being baked into 24 discrete values.
 */
const SKY: Record<number, string> = {
  0: "oklch(0.10 0.04 265)",
  1: "oklch(0.10 0.04 265)",
  2: "oklch(0.10 0.04 268)",
  3: "oklch(0.11 0.05 270)",
  4: "oklch(0.14 0.06 275)",
  5: "oklch(0.22 0.08 300)",
  6: "oklch(0.32 0.13 340)",
  7: "oklch(0.45 0.15 45)",
  8: "oklch(0.55 0.11 70)",
  9: "oklch(0.60 0.05 90)",
  10: "oklch(0.58 0.08 210)",
  11: "oklch(0.57 0.12 225)",
  12: "oklch(0.58 0.14 230)",
  13: "oklch(0.57 0.13 225)",
  14: "oklch(0.56 0.12 220)",
  15: "oklch(0.53 0.11 215)",
  16: "oklch(0.50 0.09 210)",
  17: "oklch(0.48 0.05 80)",
  18: "oklch(0.42 0.17 55)",
  19: "oklch(0.30 0.17 25)",
  20: "oklch(0.22 0.12 340)",
  21: "oklch(0.15 0.08 295)",
  22: "oklch(0.12 0.06 278)",
  23: "oklch(0.10 0.04 268)",
}

function TimelineBar({ currentHour }: { currentHour: number }) {
  return (
    <div className="flex flex-1 gap-x-1">
      {hours.map((h) => (
        <div
          key={`h${h}`}
          className={cn(
            "h-4 flex-1 rounded-sm",
            h === currentHour &&
              "ring-2 ring-accent-bright ring-offset-1 ring-offset-surface-0",
          )}
          style={{ backgroundColor: SKY[h] }}
          title={`${h}:00`}
        />
      ))}
    </div>
  )
}
