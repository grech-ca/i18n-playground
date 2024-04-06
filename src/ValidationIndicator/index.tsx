import {Transition} from '@headlessui/react'
import {MdClose, MdDone} from 'react-icons/md'

import {cn} from 'common/helpers'

export type ValidationIndicatorProps = {
  isValid: boolean | null
  className?: string
}

export const ValidationIndicator = ({isValid, className}: ValidationIndicatorProps) => {
  return (
    <div className={cn('relative flex w-4 items-center justify-center', className)}>
      <Transition
        show={isValid === true}
        className="absolute"
        enter="transition-all origin-top"
        enterFrom="-translate-y-2 opacity-0 scale-0"
        enterTo="translate-y-0 opacity-100 scale-100"
        leave="transition-all origin-top"
        leaveFrom="translate-y-0 opacity-100 scale-100"
        leaveTo="-translate-y-2 opacity-0 scale-0"
      >
        <MdDone className="text-xl text-green-600" />
      </Transition>
      <Transition
        show={isValid === false}
        className="absolute"
        enter="transition-all origin-bottom"
        enterFrom="translate-y-2 opacity-0 scale-0"
        enterTo="translate-y-0 opacity-100 scale-100"
        leave="transition-all origin-bottom"
        leaveFrom="translate-y-0 opacity-100 scale-100"
        leaveTo="translate-y-2 opacity-0 scale-0"
      >
        <MdClose className="text-xl text-red-600" />
      </Transition>
    </div>
  )
}
