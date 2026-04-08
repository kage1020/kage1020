import Link from "next/link"

export default function NotFound() {
	return (
		<main className="flex min-h-dvh flex-col items-center justify-center px-6">
			<div className="max-w-md space-y-6 font-mono">
				<div className="space-y-2">
					<p className="text-text-muted">$ cat page</p>
					<h1 className="text-4xl font-bold text-error">404</h1>
					<p className="text-text-secondary">File not found. But if you build it, it will come.</p>
					<p className="text-xs text-text-muted">(Principle 4: 足らぬなら作ってしまえホトトギス)</p>
				</div>
				<div>
					<p className="text-text-muted">$ cd ~</p>
					<Link href="/" className="text-accent-bright hover:text-accent">
						→ go home
					</Link>
				</div>
			</div>
		</main>
	)
}
