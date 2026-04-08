import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: {
		default: "kage1020",
		template: "%s — kage1020",
	},
	description: "Builds things for the web. Breaks things too, but less often now.",
	metadataBase: new URL("https://kage1020.com"),
	openGraph: {
		type: "website",
		locale: "ja_JP",
		siteName: "kage1020",
	},
	twitter: {
		card: "summary_large_image",
	},
	robots: {
		index: true,
		follow: true,
	},
}

export const viewport: Viewport = {
	themeColor: "#0a0a0a",
	colorScheme: "dark",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ja" className={`${geistSans.variable} ${geistMono.variable}`}>
			<body>{children}</body>
		</html>
	)
}
