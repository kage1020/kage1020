import { lazy } from "react"

export const appComponents: Record<string, React.LazyExoticComponent<() => React.JSX.Element>> = {
	timezone: lazy(() => import("@/apps/timezone")),
	"lorem-text": lazy(() => import("@/apps/lorem-text")),
}
