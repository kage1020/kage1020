import { ImageResponse } from "next/og"
import { apps } from "@/data/apps"

export const runtime = "edge"

export const alt = "kage1020 — app"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const BG = "#0a0a0a"
const TEXT_PRIMARY = "#e6e6e6"
const TEXT_SECONDARY = "#a0a0a0"
const TEXT_MUTED = "#525252"
const ACCENT_BRIGHT = "#5b9bd5"

export default async function OGImage({
  params,
}: {
  params: Promise<{ appId: string }>
}) {
  const { appId } = await params
  const app = apps.find((a) => a.id === appId)

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
        <span style={{ color: TEXT_SECONDARY }}>/apps/{appId}</span>
        <span style={{ color: ACCENT_BRIGHT }}>$</span>
        <span>./{appId}</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            color: TEXT_PRIMARY,
            letterSpacing: -2,
          }}
        >
          {app?.title ?? appId}
        </div>
        {app?.description && (
          <div
            style={{
              fontSize: 32,
              color: TEXT_SECONDARY,
              lineHeight: 1.4,
              maxWidth: 960,
            }}
          >
            {app.description}
          </div>
        )}
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
        <span>{app?.category ?? ""}</span>
      </div>
    </div>,
    size,
  )
}
