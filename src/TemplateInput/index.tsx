import {ChangeEventHandler, ComponentProps, forwardRef, useCallback, useMemo} from 'react'
import copy from 'copy-to-clipboard'
import {cn, validateMessageFormatTemplate} from 'common/helpers'
import {MdContentCopy as CopyIcon, MdDone, MdClose} from 'react-icons/md'
import { CopyButton } from 'CopyButton'
import Textarea from 'react-textarea-autosize'
import { Transition } from '@headlessui/react'

export type TemplateInputProps = {
  value: string
  onChange: (value: string) => void
}

export const TemplateInput = ({value, onChange}: TemplateInputProps) => {
  const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(e => onChange(e.target.value), [onChange])
  const handleCopy = useCallback(() => copy(value), [value])

  const isTemplateValid = useMemo(() => validateMessageFormatTemplate(value), [value])

  return (
    <label className="grid gap-2 grid-cols-[1fr_auto]">
      <div className="flex gap-x-1.5 col-span-2">
        <span className="font-medium">Template</span>
        <div className="w-4 relative flex items-center justify-center">
          <Transition
            show={isTemplateValid && Boolean(value)}
            className="absolute"
            enter="transition-all origin-top"
            enterFrom="-translate-y-2 opacity-0 scale-0"
            enterTo="translate-y-0 opacity-100 scale-100"
            leave="transition-all origin-top"
            leaveFrom="translate-y-0 opacity-100 scale-100"
            leaveTo="-translate-y-2 opacity-0 scale-0"
          >
            <MdDone className="text-xl text-green-600" />
          </Transition>
          <Transition
            show={!isTemplateValid && Boolean(value)}
            className="absolute"
            enter="transition-all origin-bottom"
            enterFrom="translate-y-2 opacity-0 scale-0"
            enterTo="translate-y-0 opacity-100 scale-100"
            leave="transition-all origin-bottom"
            leaveFrom="translate-y-0 opacity-100 scale-100"
            leaveTo="translate-y-2 opacity-0 scale-0"
          >
            <MdClose className="text-xl text-red-600" />
          </Transition>
        </div>
      </div>
      <Textarea
        className="transition-[box-shadow,color] duration-150 px-3 py-2 h-10 rounded-lg outline-none focus:focus-visible:ring-4 focus:focus-visible:ring-blue-400 resize-none"
        value={value} 
        autoFocus
        onChange={handleChange}
        placeholder="My name is {name}"
        spellCheck={false}
      />
      <CopyButton onClick={handleCopy} />
    </label>
  )
}
