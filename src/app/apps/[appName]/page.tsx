import ContentViewer from "@/app/apps/[appName]/content-viewer"
import Transition from "@/components/transition"
import { apps } from "@/utils"

import type { AppName } from "@/utils"

export const runtime = "edge"

export async function generateMetadata({
  params: { appName },
}: {
  params: { appName: AppName }
}) {
  const app = apps.find((a) => a.href.split("/").at(-1) === appName)!
  return {
    title: app.name,
    description: app.short,
  }
}

export default function AppName({
  params: { appName },
}: {
  params: { appName: AppName }
}) {
  return (
    <Transition className="rounded-lg border-2">
      <ContentViewer
        app={apps.find((a) => a.href.split("/").at(-1) === appName)!}
      />
    </Transition>
  )
}
