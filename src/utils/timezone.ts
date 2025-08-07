export const timezones = [
  { name: "Tokyo", timezone: "Asia/Tokyo", flag: "🇯🇵", iconKey: "JP" },
  { name: "New York", timezone: "America/New_York", flag: "🇺🇸", iconKey: "US" },
  { name: "London", timezone: "Europe/London", flag: "🇬🇧", iconKey: "GB" },
  { name: "Paris", timezone: "Europe/Paris", flag: "🇫🇷", iconKey: "FR" },
  {
    name: "Vancouver",
    timezone: "Canada/Vancouver",
    flag: "🇨🇦",
    iconKey: "CA",
  },
  { name: "Sydney", timezone: "Australia/Sydney", flag: "🇦🇺", iconKey: "AU" },
  {
    name: "Los Angeles",
    timezone: "America/Los_Angeles",
    flag: "🇺🇸",
    iconKey: "US",
  },
  { name: "Dubai", timezone: "Asia/Dubai", flag: "🇦🇪", iconKey: "AE" },
  { name: "Singapore", timezone: "Asia/Singapore", flag: "🇸🇬", iconKey: "SG" },
  { name: "Hong Kong", timezone: "Asia/Hong_Kong", flag: "🇭🇰", iconKey: "HK" },
  { name: "Seoul", timezone: "Asia/Seoul", flag: "🇰🇷", iconKey: "KR" },
  { name: "Berlin", timezone: "Europe/Berlin", flag: "🇩🇪", iconKey: "DE" },
  { name: "Mumbai", timezone: "Asia/Kolkata", flag: "🇮🇳", iconKey: "IN" },
]

export const formatTime = (
  date: Date,
  timezone: string,
  format24Hour = true
) => {
  try {
    return date.toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: !format24Hour,
    })
  } catch (error) {
    console.error("Error formatting time:", error)
    return "00:00"
  }
}

export const formatTimeWithSeconds = (
  date: Date,
  timezone: string,
  format24Hour = true
) => {
  try {
    return date.toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: !format24Hour,
    })
  } catch (error) {
    console.error("Error formatting time:", error)
    return "00:00:00"
  }
}

export const formatDate = (
  date: Date,
  timezone: string,
  includeWeekday = false
) => {
  try {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      month: "short",
      day: "numeric",
    }
    if (includeWeekday) {
      options.weekday = "short"
      options.year = "numeric"
    }
    return date.toLocaleDateString("en-US", options)
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Jan 1"
  }
}

export const getTimeDifference = (timezone1: string, timezone2: string) => {
  try {
    const date = new Date()
    const time1 = new Date(
      date.toLocaleString("en-US", { timeZone: timezone1 })
    )
    const time2 = new Date(
      date.toLocaleString("en-US", { timeZone: timezone2 })
    )
    const diffMs = time1.getTime() - time2.getTime()
    const diffHours = Math.round(diffMs / (1000 * 60 * 60))
    return diffHours
  } catch (error) {
    console.error("Error calculating time difference:", error)
    return 0
  }
}
