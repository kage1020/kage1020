export default function AppPage({
  params: { appName },
}: {
  params: { appName: string }
}) {
  return <div>{appName} page</div>
}
