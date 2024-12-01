import Modal from "@/components/modal"

type AppModalProps = {
  params: Promise<{ appName?: string }>
}

export default async function AppModal({ params }: AppModalProps) {
  const { appName } = await params

  return <Modal>{appName} modal</Modal>
}
