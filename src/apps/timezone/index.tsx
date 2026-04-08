"use client"

import { useEffect, useState } from "react"

const cities = [
	{ name: "Tokyo", timezone: "Asia/Tokyo", flag: "🇯🇵" },
	{ name: "New York", timezone: "America/New_York", flag: "🇺🇸" },
	{ name: "London", timezone: "Europe/London", flag: "🇬🇧" },
	{ name: "Paris", timezone: "Europe/Paris", flag: "🇫🇷" },
	{ name: "Sydney", timezone: "Australia/Sydney", flag: "🇦🇺" },
	{ name: "Dubai", timezone: "Asia/Dubai", flag: "🇦🇪" },
	{ name: "Singapore", timezone: "Asia/Singapore", flag: "🇸🇬" },
	{ name: "Los Angeles", timezone: "America/Los_Angeles", flag: "🇺🇸" },
	{ name: "Berlin", timezone: "Europe/Berlin", flag: "🇩🇪" },
	{ name: "Shanghai", timezone: "Asia/Shanghai", flag: "🇨🇳" },
]

function getTime(timezone: string): string {
	return new Date().toLocaleTimeString("en-US", {
		timeZone: timezone,
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	})
}

function getDate(timezone: string): string {
	return new Date().toLocaleDateString("en-US", {
		timeZone: timezone,
		weekday: "short",
		month: "short",
		day: "numeric",
	})
}

function getOffset(timezone: string): string {
	const now = new Date()
	const formatter = new Intl.DateTimeFormat("en-US", {
		timeZone: timezone,
		timeZoneName: "shortOffset",
	})
	const parts = formatter.formatToParts(now)
	const offsetPart = parts.find((p) => p.type === "timeZoneName")
	return offsetPart?.value ?? ""
}

function getHour(timezone: string): number {
	return Number.parseInt(
		new Date().toLocaleTimeString("en-US", {
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
	const [selected, setSelected] = useState<string[]>(["Asia/Tokyo", "America/New_York"])
	const [, setTick] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => setTick((t) => t + 1), 1000)
		return () => clearInterval(interval)
	}, [])

	const toggleCity = (timezone: string) => {
		setSelected((prev) =>
			prev.includes(timezone) ? prev.filter((t) => t !== timezone) : [...prev, timezone],
		)
	}

	const selectedCities = cities.filter((c) => selected.includes(c.timezone))

	return (
		<div className="space-y-8">
			{/* Selected cities - main display */}
			{selectedCities.length > 0 && (
				<div className="grid gap-4 sm:grid-cols-2">
					{selectedCities.map((city) => {
						const hour = getHour(city.timezone)
						return (
							<div
								key={city.timezone}
								className="rounded-lg border border-surface-2 bg-surface-1 p-5"
							>
								<div className="mb-2 flex items-center justify-between">
									<span className="text-sm text-text-secondary">
										{city.flag} {city.name}
									</span>
									<span className="font-mono text-xs text-text-muted">
										{getOffset(city.timezone)}
									</span>
								</div>
								<p className={`font-mono text-3xl font-bold ${hourColor(hour)}`}>
									{getTime(city.timezone)}
								</p>
								<p className="mt-1 font-mono text-xs text-text-muted">{getDate(city.timezone)}</p>
							</div>
						)
					})}
				</div>
			)}

			{/* City selector */}
			<div className="space-y-3">
				<h3 className="font-mono text-sm text-text-muted">Select cities</h3>
				<div className="flex flex-wrap gap-2">
					{cities.map((city) => (
						<button
							key={city.timezone}
							type="button"
							onClick={() => toggleCity(city.timezone)}
							className={`rounded-full px-3 py-1.5 font-mono text-sm transition-colors ${
								selected.includes(city.timezone)
									? "bg-accent/20 text-accent-bright"
									: "bg-surface-2 text-text-muted hover:text-text-secondary"
							}`}
						>
							{city.flag} {city.name}
						</button>
					))}
				</div>
			</div>

			{/* 24h timeline bar */}
			{selectedCities.length > 0 && (
				<div className="space-y-3">
					<h3 className="font-mono text-sm text-text-muted">24h comparison</h3>
					<div className="space-y-2">
						{selectedCities.map((city) => {
							const hour = getHour(city.timezone)
							return (
								<div key={city.timezone} className="flex items-center gap-3">
									<span className="w-28 shrink-0 font-mono text-xs text-text-secondary">
										{city.flag} {city.name}
									</span>
									<TimelineBar currentHour={hour} />
								</div>
							)
						})}
						<div className="flex items-center gap-3">
							<span className="w-28 shrink-0" />
							<div className="flex flex-1 justify-between font-mono text-[10px] text-text-muted">
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

const hours = Array.from({ length: 24 }, (_, h) => h)

function TimelineBar({ currentHour }: { currentHour: number }) {
	return (
		<div className="flex flex-1 gap-px">
			{hours.map((h) => (
				<div
					key={`h${h}`}
					className={`h-4 flex-1 rounded-sm ${
						h === currentHour
							? "bg-accent-bright"
							: h >= 6 && h < 22
								? "bg-surface-2"
								: "bg-surface-1"
					}`}
					title={`${h}:00`}
				/>
			))}
		</div>
	)
}
