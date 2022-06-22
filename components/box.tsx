import clsx from 'clsx'
import React from 'react'
import { ReactNode } from 'react'
import useRepo from '../libs/redux/useRepo';

type BoxType = {
  className?: string,
  index: number,
  id: string,
  children: ReactNode
}

export const Box = ({ className, index, id, children }: BoxType) => {
  const [repo, setRepo] = useRepo();

  const onClickBox = (e: React.MouseEvent, i: number) => {
    setRepo(i)
  }

  return (
    <label
      className={clsx(
        className,
        'relative flex items-center space-x-2 p-3 w-48 cursor-pointer transition duration-500 skew-y-[15deg] dark:text-white',
        `z-${index * 10}`,
        'hover:text-white dark:hover:text-black hover:-translate-x-16 hover:-translate-y-4',
        'before:absolute before:transition before:duration-500 before:w-full before:h-10 before:-skew-x-[45deg] before:left-5 before:-top-10',
        'after:absolute after:transition after:duration-500 after:w-10 after:h-full after:-skew-y-[45deg] after:-right-10 after:-top-5',
        repo === index
          ? '-translate-x-16 -translate-y-4 bg-sky-700 before:bg-sky-700 after:bg-sky-800 dark:bg-sky-400 dark:before:bg-sky-400 dark:after:bg-sky-500 dark:text-black'
          : 'bg-sky-400 before:bg-sky-400 after:bg-sky-500 hover:bg-sky-700 before:hover:bg-sky-700 after:hover:bg-sky-800 dark:bg-sky-800 dark:before:bg-sky-800 dark:after:bg-sky-900 dark:hover:bg-sky-400 dark:before:hover:bg-sky-400 dark:after:hover:bg-sky-500',
      )}
      onClick={(e) => onClickBox(e, index)}
      id={id}
    >
      {children}
    </label>
  )
}
