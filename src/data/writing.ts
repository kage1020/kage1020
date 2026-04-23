export type WritingPlatform = "qiita" | "zenn"

export type WritingArticle = {
  id: string
  title: string
  url: string
  platform: WritingPlatform
  publishedAt: string
  likes: number
  tags: string[]
}

const QIITA_USER = "kage1020"
const ZENN_USER = "kage1020"
const REVALIDATE_SECONDS = 60 * 60
const ARTICLE_LIMIT = 20

type QiitaItem = {
  id: string
  title: string
  url: string
  created_at: string
  likes_count: number
  tags: { name: string }[]
}

type ZennArticle = {
  id: number
  title: string
  path: string
  published_at?: string
  liked_count: number
}

type ZennResponse = {
  articles: ZennArticle[]
}

function normalizeZennUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  if (path.startsWith("/")) return `https://zenn.dev${path}`
  return `https://zenn.dev/${ZENN_USER}/articles/${path}`
}

async function fetchQiitaArticles(): Promise<WritingArticle[]> {
  const res = await fetch(
    `https://qiita.com/api/v2/users/${QIITA_USER}/items?page=1&per_page=${ARTICLE_LIMIT}`,
    {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
    },
  )

  if (!res.ok) return []

  const items = (await res.json()) as QiitaItem[]
  return items.map((item) => ({
    id: `qiita-${item.id}`,
    title: item.title,
    url: item.url,
    platform: "qiita",
    publishedAt: item.created_at,
    likes: item.likes_count ?? 0,
    tags: item.tags.map((tag) => tag.name),
  }))
}

async function fetchZennArticles(): Promise<WritingArticle[]> {
  const res = await fetch(
    `https://zenn.dev/api/articles?username=${ZENN_USER}&order=latest`,
    {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
    },
  )

  if (!res.ok) return []

  const body = (await res.json()) as ZennResponse
  return body.articles.slice(0, ARTICLE_LIMIT).map((article) => ({
    id: `zenn-${article.id}`,
    title: article.title,
    url: normalizeZennUrl(article.path),
    platform: "zenn",
    publishedAt: article.published_at ?? "",
    likes: article.liked_count ?? 0,
    tags: [],
  }))
}

export async function getWritingArticles() {
  const [qiitaResult, zennResult] = await Promise.allSettled([
    fetchQiitaArticles(),
    fetchZennArticles(),
  ])

  const qiitaArticles =
    qiitaResult.status === "fulfilled" ? qiitaResult.value : []
  const zennArticles = zennResult.status === "fulfilled" ? zennResult.value : []

  return [...qiitaArticles, ...zennArticles]
    .filter((article) => article.publishedAt)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
}
