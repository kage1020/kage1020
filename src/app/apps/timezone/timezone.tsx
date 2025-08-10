"use client"

import {
  AeIcon,
  AuIcon,
  CaIcon,
  DeIcon,
  FrIcon,
  GbIcon,
  HkIcon,
  InIcon,
  JpIcon,
  KrIcon,
  SgIcon,
  UsIcon,
} from "@/components/icons"
import { cn } from "@/utils"
import {
  formatDate,
  formatTimeWithSeconds,
  getTimeDifference,
  timezones as timezonesData,
} from "@/utils/timezone"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { FaCheck, FaDownload, FaLink } from "react-icons/fa"

const iconMap = {
  JP: JpIcon,
  US: UsIcon,
  GB: GbIcon,
  FR: FrIcon,
  CA: CaIcon,
  AU: AuIcon,
  AE: AeIcon,
  SG: SgIcon,
  HK: HkIcon,
  KR: KrIcon,
  DE: DeIcon,
  IN: InIcon,
}

const timezones = timezonesData.map((tz) => ({
  ...tz,
  icon: iconMap[tz.iconKey as keyof typeof iconMap],
}))

const FlagIcon = ({
  IconComponent,
  name,
}: {
  IconComponent: React.ComponentType
  name: string
}) => (
  <div
    className="w-8 h-8 rounded overflow-hidden flex items-center justify-center"
    title={name}
  >
    <IconComponent />
  </div>
)

const TimelineVisualization = ({
  selectedTimezones,
  currentTime,
  is24Hour,
}: {
  selectedTimezones: typeof timezones
  currentTime: Date
  is24Hour: boolean
}) => {
  const getTimeForHour = (hourOffset: number, timezone: string) => {
    const date = new Date(currentTime)
    date.setHours(date.getHours() + hourOffset)

    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: is24Hour ? "2-digit" : "numeric",
      hour12: !is24Hour,
      timeZone: timezone,
    })

    return formatter.format(date)
  }

  const getBackgroundGradient = (hour: number, minute: number = 0) => {
    const minuteProgress = minute / 60

    // 各時間の色をOKLCHで定義 (lightness, chroma, hue)
    const hourColors: { [key: number]: [number, number, number] } = {
      0: [0.25, 0.08, 265], // 0時: 深い紺色
      1: [0.28, 0.07, 260], // 1時: 紺色
      2: [0.3, 0.06, 255], // 2時: 紺色
      3: [0.32, 0.06, 250], // 3時: 少し明るい紺色
      4: [0.35, 0.07, 280], // 4時: 紫がかった紺色
      5: [0.4, 0.09, 290], // 5時: 紫色（夜明け前）
      6: [0.55, 0.15, 40], // 6時: オレンジ色（日の出）
      7: [0.65, 0.14, 60], // 7時: 明るいオレンジ（朝）
      8: [0.72, 0.12, 85], // 8時: 黄色がかったオレンジ
      9: [0.8, 0.1, 100], // 9時: 明るい黄色（午前）
      10: [0.85, 0.08, 105], // 10時: 薄い黄色
      11: [0.9, 0.06, 110], // 11時: 白に近い黄色
      12: [0.95, 0.04, 110], // 12時: 最も明るい（正午）
      13: [0.92, 0.05, 105], // 13時: 明るい黄色
      14: [0.88, 0.07, 100], // 14時: 黄色
      15: [0.82, 0.09, 90], // 15時: 黄色がかったオレンジ
      16: [0.75, 0.12, 70], // 16時: オレンジ（夕方前）
      17: [0.65, 0.15, 50], // 17時: 濃いオレンジ（夕暮れ）
      18: [0.55, 0.16, 30], // 18時: 赤みがかったオレンジ（日没）
      19: [0.45, 0.14, 10], // 19時: 赤紫（薄暮）
      20: [0.38, 0.1, 310], // 20時: 紫（夜の始まり）
      21: [0.34, 0.08, 280], // 21時: 紫がかった紺色
      22: [0.3, 0.07, 270], // 22時: 紺色（深夜へ）
      23: [0.27, 0.07, 265], // 23時: 深い紺色
    }

    // 現在の時間と次の時間の色を取得
    const currentColor = hourColors[hour]
    const nextColor = hourColors[(hour + 1) % 24]

    // 分による補間
    const lightness =
      currentColor[0] + (nextColor[0] - currentColor[0]) * minuteProgress
    const chroma =
      currentColor[1] + (nextColor[1] - currentColor[1]) * minuteProgress
    const hue =
      currentColor[2] + (nextColor[2] - currentColor[2]) * minuteProgress

    // グラデーションの終点を計算（少し変化をつける）
    const lightness2 = Math.min(1, lightness + 0.05)
    const chroma2 = Math.max(0, chroma - 0.02)
    const hue2 = (hue + 10) % 360

    return `linear-gradient(135deg,
      oklch(${lightness} ${chroma} ${hue}) 0%,
      oklch(${lightness2} ${chroma2} ${hue2}) 100%)`
  }

  const renderTimeline = (timezone: (typeof timezones)[0], index: number) => {
    // 25時間分の色を計算してグラデーションを作成
    const gradientStops: string[] = []
    for (let i = 0; i < 25; i++) {
      const hourOffset = i - 12
      const displayDate = new Date(currentTime)
      displayDate.setHours(displayDate.getHours() + hourOffset)

      const tzSpecificDate = new Date(
        displayDate.toLocaleString("en-US", {
          timeZone: timezone.timezone,
        })
      )
      const actualHourInTz = tzSpecificDate.getHours()
      const actualMinuteInTz = tzSpecificDate.getMinutes()

      // 各時間の色を取得（OKLCH）
      const minuteProgress = actualMinuteInTz / 60
      const hourColors: { [key: number]: [number, number, number] } = {
        0: [0.25, 0.08, 265], // 0時: 深い紺色
        1: [0.28, 0.07, 260], // 1時: 紺色
        2: [0.3, 0.06, 255], // 2時: 紺色
        3: [0.32, 0.06, 250], // 3時: 少し明るい紺色
        4: [0.35, 0.07, 280], // 4時: 紫がかった紺色
        5: [0.4, 0.09, 290], // 5時: 紫色（夜明け前）
        6: [0.55, 0.15, 40], // 6時: オレンジ色（日の出）
        7: [0.65, 0.14, 60], // 7時: 明るいオレンジ（朝）
        8: [0.72, 0.12, 85], // 8時: 黄色がかったオレンジ
        9: [0.8, 0.1, 100], // 9時: 明るい黄色（午前）
        10: [0.85, 0.08, 105], // 10時: 薄い黄色
        11: [0.9, 0.06, 110], // 11時: 白に近い黄色
        12: [0.95, 0.04, 110], // 12時: 最も明るい（正午）
        13: [0.92, 0.05, 105], // 13時: 明るい黄色
        14: [0.88, 0.07, 100], // 14時: 黄色
        15: [0.82, 0.09, 90], // 15時: 黄色がかったオレンジ
        16: [0.75, 0.12, 70], // 16時: オレンジ（夕方前）
        17: [0.65, 0.15, 50], // 17時: 濃いオレンジ（夕暮れ）
        18: [0.55, 0.16, 30], // 18時: 赤みがかったオレンジ（日没）
        19: [0.45, 0.14, 10], // 19時: 赤紫（薄暮）
        20: [0.38, 0.1, 310], // 20時: 紫（夜の始まり）
        21: [0.34, 0.08, 280], // 21時: 紫がかった紺色
        22: [0.3, 0.07, 270], // 22時: 紺色（深夜へ）
        23: [0.27, 0.07, 265], // 23時: 深い紺色
      }

      const currentColor = hourColors[actualHourInTz]
      const nextColor = hourColors[(actualHourInTz + 1) % 24]

      const lightness =
        currentColor[0] + (nextColor[0] - currentColor[0]) * minuteProgress
      const chroma =
        currentColor[1] + (nextColor[1] - currentColor[1]) * minuteProgress
      const hue =
        currentColor[2] + (nextColor[2] - currentColor[2]) * minuteProgress

      const position = (i / 24) * 100
      gradientStops.push(`oklch(${lightness} ${chroma} ${hue}) ${position}%`)
    }

    return (
      <div key={index} className={`relative h-24 ${index === 0 ? "mt-6" : ""}`}>
        <div className="absolute top-0 left-0 text-xs text-gray-400 px-2 py-1 flex items-center gap-2 z-10">
          <FlagIcon IconComponent={timezone.icon} name={timezone.name} />
          <span className="font-medium text-white">{timezone.name}</span>
        </div>
        <div className="relative h-full pt-8">
          <div
            className="h-full relative"
            style={{
              background: `linear-gradient(90deg, ${gradientStops.join(", ")})`,
              opacity: 0.4,
            }}
          >
            <div className="flex h-full justify-center">
              {/* 時刻ラベルと現在時刻マーカー */}
              {Array.from({ length: 25 }, (_, i) => {
                const hourOffset = i - 12
                const isCurrentHour = hourOffset === 0

                return (
                  <div
                    key={i}
                    className="relative flex-shrink-0 border-r border-gray-700"
                    style={{
                      width: "30px",
                    }}
                  >
                    {!isCurrentHour && (
                      <div className="absolute bottom-0 left-0 p-1 text-xs font-mono z-10">
                        <span className="bg-black/50 px-1 rounded text-white">
                          {getTimeForHour(hourOffset, timezone.timezone)}
                        </span>
                      </div>
                    )}
                    {isCurrentHour && (
                      <>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-white z-10">
                          {index === 0 && (
                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              NOW
                            </div>
                          )}
                        </div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-1 text-xs font-mono z-20">
                          <span className="bg-black/70 px-1 rounded text-white font-bold">
                            {getTimeForHour(hourOffset, timezone.timezone)}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#111111] rounded-lg p-4">
      <h4 className="text-lg font-medium mb-3">Timeline Visualization</h4>
      <div className="relative overflow-x-auto">
        <div className="min-w-max">
          <div className="space-y-2">
            {selectedTimezones.map((tz, index) => renderTimeline(tz, index))}
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-400 mt-2 text-center">
        Timeline shows ±12 hours from current time
      </div>
    </div>
  )
}

export default function Timezone() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [currentTime, setCurrentTime] = useState(new Date())
  const [is24Hour, setIs24Hour] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [includeTime, setIncludeTime] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const [selectedTimezones, setSelectedTimezones] = useState([
    timezones[0],
    timezones[1],
  ])

  useEffect(() => {
    if (!mounted) return

    const from = searchParams.get("from")
    const to = searchParams.get("to")
    const format24 = searchParams.get("format24")

    const fromTimezone = from
      ? timezones.find((tz) => tz.timezone === from)
      : null
    const toTimezone = to ? timezones.find((tz) => tz.timezone === to) : null

    setSelectedTimezones([
      fromTimezone || timezones[0],
      toTimezone || timezones[1],
    ])

    setIs24Hour(format24 === "false" ? false : true)
  }, [searchParams, mounted])

  useEffect(() => {
    setMounted(true)
    setCurrentTime(new Date())

    const from = searchParams.get("from")
    const to = searchParams.get("to")
    const format24 = searchParams.get("format24")

    const fromTimezone = from
      ? timezones.find((tz) => tz.timezone === from)
      : null
    const toTimezone = to ? timezones.find((tz) => tz.timezone === to) : null

    const initialTimezones = [
      fromTimezone || timezones[0],
      toTimezone || timezones[1],
    ]
    const initial24Hour = format24 === "false" ? false : true

    setSelectedTimezones(initialTimezones)
    setIs24Hour(initial24Hour)

    if (!from || !to || format24 === null) {
      const params = new URLSearchParams()
      params.set("from", initialTimezones[0].timezone)
      params.set("to", initialTimezones[1].timezone)
      params.set("format24", initial24Hour.toString())

      const newUrl = `${window.location.pathname}?${params.toString()}`
      router.replace(newUrl)
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [router, searchParams])

  const updateURL = (
    newSelectedTimezones?: typeof selectedTimezones,
    new24Hour?: boolean
  ) => {
    const params = new URLSearchParams()
    params.set("from", (newSelectedTimezones || selectedTimezones)[0].timezone)
    params.set("to", (newSelectedTimezones || selectedTimezones)[1].timezone)
    params.set(
      "format24",
      (new24Hour !== undefined ? new24Hour : is24Hour).toString()
    )

    const newUrl = `${window.location.pathname}?${params.toString()}`
    router.replace(newUrl)
  }

  const changeTimezone = (
    index: number,
    newTimezone: (typeof timezones)[0]
  ) => {
    const newSelectedTimezones = [...selectedTimezones]
    newSelectedTimezones[index] = newTimezone
    setSelectedTimezones(newSelectedTimezones)
    updateURL(newSelectedTimezones)
  }

  const toggle24HourFormat = (new24Hour: boolean) => {
    setIs24Hour(new24Hour)
    updateURL(undefined, new24Hour)
  }

  const shareCurrentURL = async () => {
    let currentUrl = window.location.href

    // Add timestamp parameter if includeTime is true
    if (includeTime) {
      const url = new URL(currentUrl)
      url.searchParams.set("t", Date.now().toString())
      currentUrl = url.toString()
    }

    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      console.error("Failed to copy URL to clipboard:", err)
    }
  }

  const downloadOGPImage = async () => {
    setDownloading(true)

    try {
      const baseUrl = window.location.origin
      const ogImageUrl = `${baseUrl}/api/og/timezone?from=${encodeURIComponent(
        selectedTimezones[0].timezone
      )}&to=${encodeURIComponent(
        selectedTimezones[1].timezone
      )}&format24=${is24Hour}${includeTime ? `&t=${Date.now()}` : ""}`

      // Fetch the image
      const response = await fetch(ogImageUrl)
      const blob = await response.blob()

      // Create download link
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `timezone-${selectedTimezones[0].name.replace(
        /\s+/g,
        "-"
      )}-${selectedTimezones[1].name.replace(/\s+/g, "-")}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error("Failed to download OGP image:", err)
    } finally {
      setDownloading(false)
    }
  }

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">World Timezone</h3>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={is24Hour}
                onChange={(e) => toggle24HourFormat(e.target.checked)}
                className="rounded"
              />
              24-hour format
            </label>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={includeTime}
                  onChange={(e) => setIncludeTime(e.target.checked)}
                  className="rounded"
                />
                Include time in URL
              </label>
              <button
                onClick={shareCurrentURL}
                className={`px-3 py-1.5 text-sm rounded transition-all flex items-center gap-2 ${
                  copied
                    ? "bg-green-600 text-white"
                    : "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 hover:border-gray-600"
                }`}
              >
                {copied && (
                  <>
                    <FaCheck size={14} />
                    Copied!
                  </>
                )}
                {!copied && (
                  <>
                    <FaLink size={14} />
                    Share URL
                  </>
                )}
              </button>
              <button
                onClick={downloadOGPImage}
                disabled={downloading}
                className={`px-3 py-1.5 text-sm rounded transition-all flex items-center gap-2 ${
                  downloading
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 hover:border-gray-600"
                }`}
              >
                <FaDownload size={14} />
                {downloading ? "Downloading..." : "Download OGP"}
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedTimezones.map((tz) => (
            <div key={tz.timezone} className="bg-[#111111] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FlagIcon IconComponent={tz.icon} name={tz.name} />
                  <span className="font-medium">{tz.name}</span>
                </div>
              </div>
              <div className="text-2xl font-mono mb-1">--:--:--</div>
              <div className="text-sm text-gray-400">Loading...</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">World Timezone</h3>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={is24Hour}
              onChange={(e) => toggle24HourFormat(e.target.checked)}
              className="rounded"
            />
            24-hour format
          </label>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={includeTime}
                onChange={(e) => setIncludeTime(e.target.checked)}
                className="rounded"
              />
              Include time in URL
            </label>
            <button
              onClick={shareCurrentURL}
              className={cn(
                "px-3 py-1.5 text-sm rounded transition-all flex items-center gap-2",
                copied
                  ? "bg-green-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 hover:border-gray-600"
              )}
            >
              {copied && (
                <>
                  <FaCheck size={14} />
                  Copied!
                </>
              )}
              {!copied && (
                <>
                  <FaLink size={14} />
                  Share URL
                </>
              )}
            </button>
            <button
              onClick={downloadOGPImage}
              disabled={downloading}
              className={cn(
                "px-3 py-1.5 text-sm rounded transition-all flex items-center gap-2",
                downloading
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 hover:border-gray-600"
              )}
            >
              <FaDownload size={14} />
              {downloading ? "Downloading..." : "Download OGP"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedTimezones.map((tz, index) => (
          <div key={index} className="bg-[#111111] rounded-lg p-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                {index === 0 ? "First Location" : "Second Location"}
              </label>
              <select
                value={tz.timezone}
                onChange={(e) => {
                  const newTimezone = timezones.find(
                    (t) => t.timezone === e.target.value
                  )
                  if (newTimezone) {
                    changeTimezone(index, newTimezone)
                  }
                }}
                className="w-full px-3 py-2 bg-black rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
              >
                {timezones.map((timezone) => (
                  <option key={timezone.timezone} value={timezone.timezone}>
                    {timezone.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <FlagIcon IconComponent={tz.icon} name={tz.name} />
                <span className="text-xl font-semibold">{tz.name}</span>
              </div>
              <div className="text-3xl font-mono mb-2">
                {formatTimeWithSeconds(currentTime, tz.timezone, is24Hour)}
              </div>
              <div className="text-sm text-gray-400">
                {formatDate(currentTime, tz.timezone, true)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#111111] rounded-lg p-4 text-center">
        <h4 className="text-lg font-medium mb-3">Time Difference</h4>
        <div className="text-2xl font-mono">
          {(() => {
            const diff = getTimeDifference(
              selectedTimezones[1].timezone,
              selectedTimezones[0].timezone
            )
            const color =
              diff === 0
                ? "text-green-500"
                : diff > 0
                ? "text-amber-500"
                : "text-blue-500"
            return (
              <span className={cn("font-bold", color)}>
                {diff === 0
                  ? "Same time"
                  : `${diff > 0 ? "+" : ""}${diff} hours`}
              </span>
            )
          })()}
        </div>
        <div className="text-sm text-gray-400 mt-2 flex items-center justify-center gap-2">
          <div className="flex items-center gap-1">
            <FlagIcon
              IconComponent={selectedTimezones[1].icon}
              name={selectedTimezones[1].name}
            />
            <span className="text-white">{selectedTimezones[1].name}</span>
          </div>
          <span>
            is{" "}
            {(() => {
              const diff = getTimeDifference(
                selectedTimezones[1].timezone,
                selectedTimezones[0].timezone
              )
              if (diff === 0) return "at the same time as"
              if (diff > 0) return `${diff} hour${diff > 1 ? "s" : ""} ahead of`
              return `${Math.abs(diff)} hour${
                Math.abs(diff) > 1 ? "s" : ""
              } behind`
            })()}
          </span>
          <div className="flex items-center gap-1">
            <FlagIcon
              IconComponent={selectedTimezones[0].icon}
              name={selectedTimezones[0].name}
            />
            <span className="text-white">{selectedTimezones[0].name}</span>
          </div>
        </div>
      </div>

      <TimelineVisualization
        selectedTimezones={selectedTimezones}
        currentTime={currentTime}
        is24Hour={is24Hour}
      />
    </div>
  )
}
