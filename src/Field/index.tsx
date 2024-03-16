import {useMemo, PropsWithChildren} from 'react'

import {IconType} from 'react-icons'

import {cn} from 'common/helpers'

export type FieldProps = PropsWithChildren & {
  label: string
  div?: boolean
  className?: string
  icon?: IconType
}

export const Field = ({icon: Icon, children, label, div, className}: FieldProps) => {
  const formattedLabel = useMemo(() => {
    return label.replace(/[a-z]/i, (char) => char.toUpperCase()).replace(/_+/g, ' ')
  }, [label])

  const Component = div ? 'div' : 'label'

  return (
    <Component className={cn('grid gap-y-2 rounded-xl bg-white p-2', className)}>
      <div className="flex items-center gap-x-1">
        {Icon && <Icon className="text-xl" />}
        <div className="text-sm font-medium">{formattedLabel}</div>
      </div>
      {children}
    </Component>
  )
}
