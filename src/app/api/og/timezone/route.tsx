import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"
import {
  formatDate,
  formatTime,
  getTimeDifference,
  timezones,
} from "@/utils/timezone"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const from = searchParams.get("from") || "Asia/Tokyo"
  const to = searchParams.get("to") || "America/New_York"
  const format24 = searchParams.get("format24")
  const is24Hour = format24 !== "false"

  const fromTimezone =
    timezones.find((tz) => tz.timezone === from) || timezones[0]
  const toTimezone = timezones.find((tz) => tz.timezone === to) || timezones[1]

  if (!fromTimezone || !toTimezone) {
    throw new Error("Invalid timezone configuration")
  }

  const now = new Date()
  const fromTime = formatTime(now, fromTimezone.timezone, is24Hour)
  const fromDate = formatDate(now, fromTimezone.timezone)
  const toTime = formatTime(now, toTimezone.timezone, is24Hour)
  const toDate = formatDate(now, toTimezone.timezone)

  const timeDiff = getTimeDifference(toTimezone.timezone, fromTimezone.timezone)
  const diffText =
    timeDiff === 0 ? "Same time" : `${timeDiff > 0 ? "+" : ""}${timeDiff}h`

  return new ImageResponse(
    <div
      style={{
        background: "#000000",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 50,
            minWidth: 400,
          }}
        >
          <div
            style={{
              fontSize: 64,
              marginBottom: 20,
            }}
          >
            {fromTimezone.flag}
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: "bold",
              marginBottom: 16,
            }}
          >
            {fromTimezone.name}
          </div>
          <div
            style={{
              fontSize: 100,
              fontWeight: "bold",
              fontFamily: "monospace",
              marginBottom: 12,
            }}
          >
            {fromTime}
          </div>
          <div
            style={{
              fontSize: 40,
              color: "#ffffff",
              opacity: 0.5,
            }}
          >
            {fromDate}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 240,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color:
                timeDiff === 0
                  ? "#10b981"
                  : timeDiff > 0
                    ? "#f59e0b"
                    : "#3b82f6",
              textShadow: "0 0 40px rgba(0,0,0,0.3)",
            }}
          >
            {diffText}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 50,
            minWidth: 400,
          }}
        >
          <div
            style={{
              fontSize: 64,
              marginBottom: 20,
            }}
          >
            {toTimezone.flag}
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: "bold",
              marginBottom: 16,
            }}
          >
            {toTimezone.name}
          </div>
          <div
            style={{
              fontSize: 100,
              fontWeight: "bold",
              fontFamily: "monospace",
              marginBottom: 12,
            }}
          >
            {toTime}
          </div>
          <div
            style={{
              fontSize: 40,
              color: "#ffffff",
              opacity: 0.5,
            }}
          >
            {toDate}
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  )
}
