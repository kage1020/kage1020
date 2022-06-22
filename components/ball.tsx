import clsx from 'clsx'
import { ReactNode } from 'react'

export const Ball = ({className, children}: {className?: string, children: ReactNode}) => {
  return <div
    className={clsx(
      className,
      'flex justify-center items-center w-16 h-16 text-2xl transition-ball duration-500 text-white',
      'rounded-[100px] bg-gradient-to-b shadow-inner from-sky-200 to-sky-400 dark:from-sky-700 dark:to-sky-900'
    )}
  >
    {children}
  </div>
}

export const ExpandBall = ({className, children}: {className?: string, children: ReactNode}) => {
  return (
    <Ball
      className={clsx(
        className,
        'hover:transition-[border-width,width] hover:duration-500 hover:from-sky-400 hover:to-sky-800 hover:rounded hover:w-36 hover:justify-start dark:hover:from-sky-300 dark:hover:to-sky-600'
      )}
    >
      {children}
    </Ball>
  )
}
