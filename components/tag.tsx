import clsx from 'clsx'
import { ReactNode } from 'react'
import { SiGooglecalendar, SiJquery, SiLine, SiNextdotjs, SiRedux, SiTailwindcss, SiTypescript } from 'react-icons/si'

export const BaseTag = ({ className = '', children }: {className?: string, children: ReactNode}) => {
  return <span className={clsx(className, 'inline-flex items-center px-2 rounded-xl bg-lime-200')}>
    {children}
  </span>
}

export const NextTag = ({ className = '' }) => {
  return (
    <BaseTag className={className}>
      <SiNextdotjs />
      <span className='pl-1'>Next.js</span>
    </BaseTag>
  )
}

export const ReduxTag = ({ className = '' }) => {
  return (
    <BaseTag className={className}>
      <SiRedux />
      <span className='pl-1'>Redux</span>
    </BaseTag>
  )
}

export const TailwindTag = ({ className = '' }) => {
  return (
    <BaseTag className={className}>
      <SiTailwindcss />
      <span className='pl-1'>Tailwind css</span>
    </BaseTag>
  )
}

export const TypescriptTag = ({ className = '' }) => {
  return (
    <BaseTag className={className}>
      <SiTypescript />
      <span className='pl-1'>Typescript</span>
    </BaseTag>
  )
}

export const LINETag = ({ className = '' }) => {
  return (
    <BaseTag className={className}>
      <SiLine />
      <span className='pl-1'>LINE</span>
    </BaseTag>
  )
}

export const JQueryTag = ({ className = '' }) => {
  return (
    <BaseTag className={className}>
      <SiJquery />
      <span className='pl-1'>jQuery</span>
    </BaseTag>
  )
}

export const GCalendarTag = ({ className = '' }) => {
  return (
    <BaseTag className={className}>
      <SiGooglecalendar />
      <span className='pl-1'>Google Calendar</span>
    </BaseTag>
  )
}
