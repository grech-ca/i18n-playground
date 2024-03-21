import {Fragment, useCallback, useEffect, useMemo, useState} from 'react'

import {Transition} from '@headlessui/react'
import * as ICU from '@formatjs/icu-messageformat-parser'

import {cn, validateMessageFormatTemplate} from 'common/helpers'
import {Segment} from './Segment'

export type ResultProps = {
  template: string
  elements: ICU.MessageFormatElement[]
  values: Record<string, string>
  onArgumentClick: (key: string) => void
  isWhitespacePreserved: boolean
}

export const Result = ({template, values, elements, onArgumentClick, isWhitespacePreserved}: ResultProps) => {
  const handleArgumentClick = useCallback((key: string) => onArgumentClick(key), [onArgumentClick])

  const [isResultShown, setIsResultShown] = useState(false)

  useEffect(() => {
    if (template.length > 0 && validateMessageFormatTemplate(template) && !isResultShown) {
      setIsResultShown(true)
    }
  }, [isResultShown, template])

  const isTemplateValid = useMemo(() => validateMessageFormatTemplate(template), [template])

  return (
    <Transition
      as={Fragment}
      show={isResultShown}
      enter="transition-all"
      enterFrom="translate-y-4 opacity-0"
      enterTo="translate-y-0 opacity-100"
    >
      <div className="flex w-full divide-x-2 divide-gray-300 rounded-xl bg-white p-3 font-medium md:w-[36rem]">
        <div className="pr-2">Result:</div>
        <div className={cn('pl-2', {'whitespace-break-spaces': isWhitespacePreserved})}>
          {isTemplateValid ? (
            elements.map((element, index) => (
              <Segment key={index} element={element} values={values} onClick={handleArgumentClick} />
            ))
          ) : (
            <Transition
              show
              appear
              enter="transition-all"
              enterFrom="-translate-x-2 opacity-0"
              enterTo="translate-x-0 opacity-100"
              className="mx-1 rounded bg-red-100 px-1 font-medium text-red-600 ring-4 ring-red-100"
            >
              Invalid template
            </Transition>
          )}
        </div>
      </div>
    </Transition>
  )
}
