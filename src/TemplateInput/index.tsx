import {ChangeEventHandler, useCallback, useMemo} from 'react'

import copy from 'copy-to-clipboard'
import {MdDone, MdClose} from 'react-icons/md'
import Textarea from 'react-textarea-autosize'
import {Transition} from '@headlessui/react'

import {CopyButton} from 'CopyButton'
import {validateMessageFormatTemplate} from 'common/helpers'

export type TemplateInputProps = {
  value: string
  onChange: (value: string) => void
}

export const TemplateInput = ({value, onChange}: TemplateInputProps) => {
  const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>((e) => onChange(e.target.value), [onChange])
  const handleCopy = useCallback(() => copy(value), [value])

  const isTemplateValid = useMemo(() => validateMessageFormatTemplate(value), [value])

  return (
    <label className="grid grid-cols-[1fr_auto] gap-2">
      <div className="col-span-2 flex gap-x-1.5">
        <span className="font-medium">Template</span>
        <div className="relative flex w-4 items-center justify-center">
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
        className="h-10 resize-none rounded-lg px-3 py-2 outline-none transition-[box-shadow,color] duration-150 focus:focus-visible:ring-4 focus:focus-visible:ring-blue-400"
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
