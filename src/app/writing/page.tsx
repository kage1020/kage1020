import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { Block, BlockStream } from "@/components/tui/block"
import { KV, Tag } from "@/components/tui/primitives"
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

        <Block command="cat writing/index.kv" duration={`${articles.length} entries`}>
          {articles.length === 0 ? (
            <p className="text-text-secondary">
              Failed to fetch articles right now. Please try again later.
            </p>
          ) : (
            <div className="space-y-6">
              {articles.map((article) => (
                <KV
                  key={article.id}
                  rows={[
                    {
                      key: "title",
                      value: (
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="wrap-break-word text-accent-bright hover:text-accent"
                        >
                          {article.title}
                        </a>
                      ),
                    },
                    {
                      key: "url",
                      value: (
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="wrap-break-word text-text-secondary hover:text-accent-bright"
                        >
                          {article.url}
                        </a>
                      ),
                    },
                    { key: "platform", value: <Tag tone="accent">{article.platform}</Tag> },
                    { key: "published", value: formatDate(article.publishedAt) },
                    { key: "likes", value: article.likes },
                    {
                      key: "tags",
                      value:
                        article.tags.length > 0 ? article.tags.join(", ") : "(none)",
                    },
                  ]}
                />
              ))}
            </div>
          )}
        </Block>
      </BlockStream>
    </PageLayout>
  )
}
