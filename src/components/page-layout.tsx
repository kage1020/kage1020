import { cn } from "@/lib/cn"
import { ShellPrompt } from "./shell-prompt"

export function PageLayout({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) {
	return (
		<>
			<ShellPrompt />
			<main className={cn("mx-auto max-w-4xl px-6 py-12", className)}>{children}</main>
		</>
	)
}
