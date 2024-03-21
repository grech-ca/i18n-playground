import {useCallback, useState, useRef} from 'react'

import {MdContentCopy} from 'react-icons/md'
import {Transition} from '@headlessui/react'

import {IconButton} from 'common/IconButton'
import {cn} from 'common/helpers'

export type CopyButtonProps = {
  onClick: () => void
  className?: string
}

const NOTIFICATION_TIMEOUT = 1_500

export const CopyButton = ({className, onClick}: CopyButtonProps) => {
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
      <IconButton icon={MdContentCopy} onClick={handleClick} />
    </div>
  )
}
