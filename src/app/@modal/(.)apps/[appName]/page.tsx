import ContentViewer from "@/app/apps/[appName]/content-viewer"
import Modal from "@/components/modal"
import { apps } from "@/utils"

import type { AppName } from "@/utils"

export const runtime = "edge"

export default function ModalAppName({
  params: { appName },
}: {
  params: { appName: AppName }
}) {
  return (
    <Modal>
      <ContentViewer
        app={apps.find((a) => a.href.split("/").at(-1) === appName)!}
      />
    </Modal>
  )
}
