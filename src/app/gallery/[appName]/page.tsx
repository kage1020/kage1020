type AppPreviewProps = {
  params: Promise<{ appName?: string }>
}

export default async function AppPreview({ params }: AppPreviewProps) {
  const { appName } = await params

  return <div>{appName} page</div>
}
