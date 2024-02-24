import {useMemo, PropsWithChildren} from 'react'
import {cn} from 'common/helpers'

export type FieldProps = PropsWithChildren & {
  label: string
  div?: boolean
  className?: string
}

export const Field = ({children, label, div, className}: FieldProps) => {
  const formattedLabel = useMemo(() => {
    return label.replace(/[a-z]/i, char => char.toUpperCase()).replace(/_+/g, ' ')
  }, [label])

  const Component = div ? 'div' : 'label'

  return (
    <Component className={cn("grid gap-y-2 rounded-xl bg-white p-2", className)}>
      <div className="text-sm font-medium">{formattedLabel}</div>
      {children}
    </Component>
  )
}

