import {MdCheckBox, MdCheckBoxOutlineBlank} from 'react-icons/md'

export type CheckboxProps = {
  onChange: (value: boolean) => void
  checked: boolean
  label: string
}

export const Checkbox = ({onChange, checked, label}: CheckboxProps) => {
  const Icon = checked ? MdCheckBox : MdCheckBoxOutlineBlank
  return (
    <label className="grid cursor-pointer grid-cols-[auto_1fr] items-center gap-x-2">
      <input checked={checked} onChange={({target}) => onChange(target.checked)} type="checkbox" hidden />

      <Icon className="text-2xl" />

      <div className="select-none text-base">{label}</div>
    </label>
  )
}
