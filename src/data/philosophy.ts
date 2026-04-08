export type Principle = {
	id: string
	number: number
	category: "ux-constraint" | "engineer-principle"
	title: string
	titleJa: string
	description: string
	descriptionJa: string
	checkpoints: string[]
	demo?: {
		bad: { label: string; description: string }
		good: { label: string; description: string }
	}
}

export const principles: Principle[] = [
	{
		id: "no-betray-intent",
		number: 1,
		category: "ux-constraint",
		title: "Don't betray user intent",
		titleJa: "ユーザーの意図を裏切らない",
		description:
			"Interfaces must match intuitive and conventional expectations. Accessibility is non-negotiable.",
		descriptionJa:
			"直感的・慣習的な期待を逸脱する仕様は第1級の不快感を与える。アクセシビリティもこの範疇。",
		checkpoints: [
			"Links and buttons behave as their appearance suggests",
			"Keyboard shortcuts follow platform conventions",
			"Semantic HTML and WAI-ARIA are correctly used",
			"preventDefault doesn't kill expected browser behavior",
		],
		demo: {
			bad: {
				label: "Broken search",
				description: "A search box that ignores your query and shows unrelated results",
			},
			good: {
				label: "Honest search",
				description: "A search box that finds exactly what you typed",
			},
		},
	},
	{
		id: "no-interrupt",
		number: 2,
		category: "ux-constraint",
		title: "Don't interrupt user operations",
		titleJa: "ユーザーの操作を邪魔しない",
		description:
			"Users aren't here to watch ads or read announcements. Modals, toasts, and disabled elements are interruptions. Accept operations, offer undo.",
		descriptionJa:
			"モーダル、スナックバー、disabled要素はユーザーの操作への割り込み。操作は最大限受け入れ、自由な動線を確保する。",
		checkpoints: [
			"No modals for confirmations — use undo instead",
			"No toast notifications blocking content",
			"No disabled buttons — accept input, validate after",
			"Loading states don't block user interaction",
		],
		demo: {
			bad: {
				label: "Modal confirmation",
				description: '"Are you sure?" dialog that blocks everything',
			},
			good: {
				label: "Optimistic + Undo",
				description: "Action happens instantly. Undo bar appears inline if needed",
			},
		},
	},
	{
		id: "no-force-constraints",
		number: 3,
		category: "ux-constraint",
		title: "Don't force technical constraints on users",
		titleJa: "ユーザーに技術的制約を強要しない",
		description:
			"Database limits, API constraints, and infrastructure limitations are your problem, not the user's. Solve them technically.",
		descriptionJa:
			"DB制約、API制限、インフラの制約はサービス提供者が解決すべき問題。ユーザーに転嫁するのは怠慢。",
		checkpoints: [
			"Error messages are human-readable, not technical jargon",
			"No database constraints exposed to UI",
			"Network errors have retry/fallback, not raw error display",
			"Validation rules serve users, not database schemas",
		],
		demo: {
			bad: {
				label: "Raw error",
				description: '"500 Internal Server Error" or "Unique constraint violation"',
			},
			good: {
				label: "Graceful handling",
				description: '"Something went wrong. We\'re retrying..." with automatic recovery',
			},
		},
	},
	{
		id: "build-if-missing",
		number: 4,
		category: "engineer-principle",
		title: "Build it if it's missing",
		titleJa: "足らぬなら作ってしまえホトトギス",
		description:
			"No library is perfect. When existing tools fall short, build what you need instead of accepting limitations.",
		descriptionJa:
			"既存ライブラリやAPIに完璧なものはない。不足があるなら自作する姿勢。「できない」で思考停止しない。",
		checkpoints: [
			"Library limitations aren't accepted as 'just the way it is'",
			"Workarounds aren't hackier than building from scratch",
			"Custom solutions are considered when libraries don't fit",
		],
	},
	{
		id: "question-conventions",
		number: 5,
		category: "engineer-principle",
		title: "Question conventions",
		titleJa: "当たり前を疑う",
		description:
			"Internet conventions were built by predecessors under different constraints. They're starting points, not gospel.",
		descriptionJa: "インターネットの慣習は先人が構築した前提。必ずしも最適とは限らない。",
		checkpoints: [
			"Implementation isn't cargo-culted from 'everyone does it this way'",
			"Better UX patterns are considered even if unconventional",
			"Existing patterns are evaluated, not blindly followed",
		],
	},
	{
		id: "dev-neq-user",
		number: 6,
		category: "engineer-principle",
		title: "Dev intuition ≠ User intuition",
		titleJa: "開発者の当たり前 ≠ ユーザーの直感的",
		description:
			"Engineers optimize for technical elegance. Users want things to just work. These are often different goals.",
		descriptionJa:
			"エンジニアは技術的最適に引っ張られがち。アプリを使うのはユーザーであり、開発者の意図とは異なる使い方をする。",
		checkpoints: [
			"Design isn't just developer-convenient",
			"No technical knowledge required to use the UI",
			"Error handling speaks to users, not developers",
		],
	},
]

export const uxConstraints = principles.filter((p) => p.category === "ux-constraint")
export const engineerPrinciples = principles.filter((p) => p.category === "engineer-principle")
