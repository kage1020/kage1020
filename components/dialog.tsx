import { Dialog as Dlg, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment, ReactNode, useState } from 'react'

export const Dialog = ({ className = '', open = false, title = '', children }: {className?: string, open: boolean, title: string, children: ReactNode}) => {
  const [isOpen, setOpen] = useState(open)

  return (
    <Transition show={open} as={Fragment}>
      <Dlg
        as='div'
        onClose={() => setOpen(false)}
        initialFocus={undefined}
        className={clsx(className, 'absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%]')}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-700"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-700"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dlg.Panel className='space-y-8'>
            <Dlg.Title className='text-center text-3xl'>{title}</Dlg.Title>
            <Dlg.Description>{children}</Dlg.Description>
          </Dlg.Panel>
        </Transition.Child>
      </Dlg>
    </Transition>
  )
}
