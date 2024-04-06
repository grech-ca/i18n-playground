import {ChangeEventHandler, useCallback, useMemo} from 'react'

import Textarea from 'react-textarea-autosize'
import copy from 'copy-to-clipboard'

import {validateMessageFormatTemplate} from 'common/helpers'
import {ValidationIndicator} from 'ValidationIndicator'
import {CopyButton} from 'CopyButton'
import {SettingsButton} from 'SettingsButton'

export type TemplateInputProps = {
  value: string
  onChange: (value: string) => void
}

export const TemplateInput = ({value, onChange}: TemplateInputProps) => {
  const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>((e) => onChange(e.target.value), [onChange])

  const handleCopy = useCallback(() => copy(value), [value])

  const isTemplateValid = useMemo(() => validateMessageFormatTemplate(value), [value])

  return (
    <div className="grid grid-cols-[1fr_auto_auto] gap-2">
      <div className="col-span-3 flex gap-x-1.5">
        <span className="font-medium">Template</span>
        <ValidationIndicator isValid={value ? isTemplateValid : null} />
      </div>
      <Textarea
        className="h-10 resize-none rounded-lg px-3 py-2 outline-none transition-[box-shadow,color] duration-150 focus:focus-visible:ring-4 focus:focus-visible:ring-blue-400"
        value={value}
        autoFocus
        onChange={handleChange}
        placeholder="My name is {name}"
        spellCheck={false}
      />
      <CopyButton onClick={handleCopy} />

      <SettingsButton />
    </div>
  )
}
