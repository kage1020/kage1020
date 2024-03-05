export type ChildrenProps = {
  children: React.ReactNode
}

export type ClassNameProps = {
  className?: string
}

export type Props = ChildrenProps & ClassNameProps

export type CardProps = Props & {
  grid?: boolean
}
