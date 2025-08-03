import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "kage1020 Blogs"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #0b0b0b 10%, #0c0c0c 20%, #0d0d0d 30%, #0e0e0e 35%, #0f0f0f 40%, #101010 45%, #111111 50%, #101010 55%, #0f0f0f 60%, #0e0e0e 65%, #0d0d0d 70%, #0c0c0c 80%, #0b0b0b 90%, #0a0a0a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "400px",
            height: "400px",
            borderRadius: "200px",
            background: "#2d70b3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
