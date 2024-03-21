import {ComponentProps, forwardRef} from 'react'

import {IconType} from 'react-icons'

import {cn} from 'common/helpers'

export type IconButtonProps = Omit<ComponentProps<'button'>, 'children'> & {
  icon: IconType
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({icon: Icon, className, ...props}, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'flex aspect-square h-10 items-center justify-center rounded-lg bg-white outline-none',
        'focus:focus-visible:ring-4 focus:focus-visible:ring-blue-400',
        'transition-all active:scale-90 active:bg-stone-100',
        className,
      )}
      {...props}
    >
      <Icon className="text-xl" />
    </button>
  )
})
