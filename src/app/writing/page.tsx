import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { Block, BlockStream } from "@/components/tui/block"
import { Tag } from "@/components/tui/primitives"
import { getWritingArticles } from "@/data/writing"

export const metadata: Metadata = {
  title: "writing",
  description: "Technical writing from Qiita and Zenn.",
}

export const revalidate = 3600

function formatDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}

export default async function WritingPage() {
  const articles = await getWritingArticles()

  return (
    <PageLayout>
      <BlockStream>
        <Block
          command="fetch writing --source qiita,zenn"
          duration={`${articles.length} entries`}
          timestamp="API sync"
        >
          <p className="max-w-2xl text-text-secondary">
            Technical articles fetched from Qiita and Zenn APIs.
          </p>
        </Block>

        <Block
          command="cat writing/index.json"
          duration={`${articles.length} entries`}
        >
          {articles.length === 0 ? (
            <p className="text-text-secondary">
              Failed to fetch articles right now. Please try again later.
            </p>
          ) : (
            <ul className="space-y-4">
              {articles.map((article) => (
                <li key={article.id}>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="grid grid-cols-[max-content_1fr] gap-x-3 gap-y-1">
                      <span className="text-text-muted group-hover:text-accent-bright">
                        →
                      </span>
                      <div className="min-w-0">
                        <span className="block wrap-break-word text-text-primary group-hover:text-accent-bright">
                          {article.title}
                        </span>
                        <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <Tag tone="accent">{article.platform}</Tag>
                          <span className="text-text-muted">
                            {formatDate(article.publishedAt)}
                          </span>
                          <span className="text-text-muted">
                            ❤ {article.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                    {article.tags.length > 0 && (
                      <div className="ml-6 mt-2 flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <span
                            key={`${article.id}-${tag}`}
                            className="font-mono text-text-muted"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Block>
      </BlockStream>
    </PageLayout>
  )
}
