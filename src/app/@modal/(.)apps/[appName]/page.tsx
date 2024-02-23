import Modal from "@/components/modal"

export default function AppPage({
  params: { appName },
}: {
  params: { appName: string }
}) {
  return (
    <Modal>
      <div className="">
        <p className="text-5xl">{appName}</p>
      </div>
    </Modal>
  )
}
