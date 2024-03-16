import {useCallback, useState, useRef} from 'react'

import {Transition} from '@headlessui/react'
import {MdContentCopy as CopyIcon} from 'react-icons/md'

import {cn} from 'common/helpers'

export type CopyButtonProps = {
  onClick: () => void
  className?: string
}

const NOTIFICATION_TIMEOUT = 1_500

export const CopyButton = ({onClick, className}: CopyButtonProps) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [isNotificationVisible, setIsNotificationVisible] = useState(false)

  const handleClick = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    setIsNotificationVisible(true)

    timeoutRef.current = setTimeout(() => setIsNotificationVisible(false), NOTIFICATION_TIMEOUT)

    onClick()
  }, [onClick])

  return (
    <div className={cn('relative', className)}>
      <Transition
        show={isNotificationVisible}
        className={cn(
          'absolute -top-9 left-1/2 w-fit -translate-x-1/2 text-center text-sm',
          'pointer-events-none flex items-center rounded-lg bg-white px-2 py-1',
        )}
        enter="transition-all origin-bottom"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition-opacity"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        Copied!
      </Transition>
      <button
        className={cn(
          'flex aspect-square h-10 items-center justify-center rounded-lg bg-white outline-none',
          'focus:focus-visible:ring-4 focus:focus-visible:ring-blue-400',
          'transition-all active:scale-90 active:bg-stone-100',
        )}
        onClick={handleClick}
      >
        <CopyIcon className="text-xl" />
      </button>
    </div>
  )
}
