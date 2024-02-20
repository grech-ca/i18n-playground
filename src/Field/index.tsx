import {useMemo, PropsWithChildren} from 'react'

export type FieldProps = PropsWithChildren & {
  label: string
  div?: boolean
}

export const Field = ({children, label, div}: FieldProps) => {
  const formattedLabel = useMemo(() => {
    return label.replace(/[a-z]/, char => char.toUpperCase()).replace(/_+/g, ' ')
  }, [label])

  const Component = div ? 'div' : 'label'

  return (
    <Component className="grid gap-y-2 rounded-xl bg-white p-2">
      <div className="text-sm font-medium">{formattedLabel}</div>
      {children}
    </Component>
  )
}

