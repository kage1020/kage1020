import dynamic from "next/dynamic"

export const appComponents: Record<string, React.ComponentType> = {
	timezone: dynamic(() => import("@/apps/timezone")),
	"lorem-text": dynamic(() => import("@/apps/lorem-text")),
}
