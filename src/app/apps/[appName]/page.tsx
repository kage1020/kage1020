import ContentViewer from "@/app/apps/[appName]/content-viewer"
import { apps } from "@/utils"

import type { AppName } from "@/utils"

export const runtime = "edge"

export default function AppPage({
  params: { appName },
}: {
  params: { appName: AppName }
}) {
  return (
    <ContentViewer
      app={apps.find((a) => a.href.split("/").at(-1) === appName)!}
    />
  )
}
