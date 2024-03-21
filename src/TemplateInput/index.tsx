import {ChangeEventHandler, useCallback} from 'react'

import Textarea from 'react-textarea-autosize'

export type TemplateInputProps = {
  value: string
  onChange: (value: string) => void
}

export const TemplateInput = ({value, onChange}: TemplateInputProps) => {
  const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>((e) => onChange(e.target.value), [onChange])

  return (
    <Textarea
      className="h-10 resize-none rounded-lg px-3 py-2 outline-none transition-[box-shadow,color] duration-150 focus:focus-visible:ring-4 focus:focus-visible:ring-blue-400"
      value={value}
      autoFocus
      onChange={handleChange}
      placeholder="My name is {name}"
      spellCheck={false}
    />
  )
}
