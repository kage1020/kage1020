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
import { FaCheck, FaLink } from "react-icons/fa"

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

export default function Timezone() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [currentTime, setCurrentTime] = useState(new Date())
  const [is24Hour, setIs24Hour] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)

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
    const currentUrl = window.location.href

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
    </div>
  )
}
