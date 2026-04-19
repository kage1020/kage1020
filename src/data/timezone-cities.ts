export type TimezoneCity = {
  /** URL-safe slug — used in `?cities=tokyo,new-york` */
  slug: string
  name: string
  timezone: string
  /** ISO 3166-1 alpha-2 country code (lower-case) — used to fetch the flag SVG. */
  country: string
  /** Short timezone code. Daylight variant is used automatically when DST is active. */
  code: { standard: string; daylight?: string }
}

export const timezoneCities: TimezoneCity[] = [
  {
    slug: "tokyo",
    name: "Tokyo",
    timezone: "Asia/Tokyo",
    country: "jp",
    code: { standard: "JST" },
  },
  {
    slug: "new-york",
    name: "New York",
    timezone: "America/New_York",
    country: "us",
    code: { standard: "EST", daylight: "EDT" },
  },
  {
    slug: "london",
    name: "London",
    timezone: "Europe/London",
    country: "gb",
    code: { standard: "GMT", daylight: "BST" },
  },
  {
    slug: "paris",
    name: "Paris",
    timezone: "Europe/Paris",
    country: "fr",
    code: { standard: "CET", daylight: "CEST" },
  },
  {
    slug: "sydney",
    name: "Sydney",
    timezone: "Australia/Sydney",
    country: "au",
    code: { standard: "AEST", daylight: "AEDT" },
  },
  {
    slug: "dubai",
    name: "Dubai",
    timezone: "Asia/Dubai",
    country: "ae",
    code: { standard: "GST" },
  },
  {
    slug: "singapore",
    name: "Singapore",
    timezone: "Asia/Singapore",
    country: "sg",
    code: { standard: "SGT" },
  },
  {
    slug: "los-angeles",
    name: "Los Angeles",
    timezone: "America/Los_Angeles",
    country: "us",
    code: { standard: "PST", daylight: "PDT" },
  },
  {
    slug: "berlin",
    name: "Berlin",
    timezone: "Europe/Berlin",
    country: "de",
    code: { standard: "CET", daylight: "CEST" },
  },
  {
    slug: "shanghai",
    name: "Shanghai",
    timezone: "Asia/Shanghai",
    country: "cn",
    code: { standard: "CST" },
  },
]

export const DEFAULT_CITY_SLUGS = ["tokyo", "new-york"] as const

/** Resolve a comma-separated slug string into TimezoneCity[]. Unknown slugs are
 *  dropped; if the result is empty the defaults are returned. */
export function parseCitySlugs(
  param: string | null | undefined,
): TimezoneCity[] {
  const slugs = (param ?? DEFAULT_CITY_SLUGS.join(","))
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
  const resolved = slugs
    .map((slug) => timezoneCities.find((c) => c.slug === slug))
    .filter((c): c is TimezoneCity => c !== undefined)
  if (resolved.length === 0) {
    return timezoneCities.filter((c) =>
      DEFAULT_CITY_SLUGS.includes(
        c.slug as (typeof DEFAULT_CITY_SLUGS)[number],
      ),
    )
  }
  return resolved
}
