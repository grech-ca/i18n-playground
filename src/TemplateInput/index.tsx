import {ChangeEventHandler, ComponentProps, forwardRef, useCallback} from 'react'
import copy from 'copy-to-clipboard'
import {cn} from 'common/helpers'
import {MdContentCopy as CopyIcon} from 'react-icons/md'
import { CopyButton } from 'CopyButton'

export type TemplateInputProps = {
  value: string
  onChange: (value: string) => void
}

export const TemplateInput = ({value, onChange}: TemplateInputProps) => {
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(e => onChange(e.target.value), [onChange])
  const handleCopy = useCallback(() => copy(value), [value])

  return (
    <label className="grid gap-2 grid-cols-[1fr_auto]">
      <span className="font-medium col-span-2">Template</span>
      <input
        className="transition-all px-3 py-2 h-10 rounded-lg outline-none focus:focus-visible:ring-4 focus:focus-visible:ring-blue-400 resize-none"
        value={value} 
        autoFocus
        onChange={handleChange}
        placeholder="My name is {name}"
      />
      <CopyButton onClick={handleCopy} />
    </label>
  )
}
