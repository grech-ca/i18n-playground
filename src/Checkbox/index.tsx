import {MdCheckBox, MdCheckBoxOutlineBlank} from 'react-icons/md'

export type CheckboxProps = {
  onChange: (value: boolean) => void
  checked: boolean
  label: string
}

export const Checkbox = ({onChange, checked, label}: CheckboxProps) => {
  const Icon = checked ? MdCheckBox : MdCheckBoxOutlineBlank
  return (
    <label className="grid gap-x-2 items-center grid-cols-[auto_1fr] cursor-pointer">
      <input checked={checked} onChange={({target}) => onChange(target.checked)} type="checkbox" hidden />

      <Icon className="text-xl" />

      <div className="text-sm select-none">{label}</div>
    </label>
  )
}
