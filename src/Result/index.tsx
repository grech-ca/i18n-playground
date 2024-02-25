import {Fragment, useCallback, useEffect, useMemo, useState} from 'react'
import {Transition} from '@headlessui/react'
import { ARGUMENT_ELEMENT_TYPES } from 'common/data'
import { ArgumentElementType } from 'common/types'
import * as ICU from '@formatjs/icu-messageformat-parser'
import {cn, validateMessageFormatTemplate} from 'common/helpers'

export type ResultProps = {
  template: string
  elements: ICU.MessageFormatElement[]
  values: Record<string, string>
  onArgumentClick: (key: string) => void
  onArgumentHover: (key: string) => void
  onArgumentUnhover: () => void
}

export const Result = ({ template, values, elements, onArgumentClick, onArgumentHover, onArgumentUnhover }: ResultProps) => {
  const handleArgumentClick = useCallback((key: string) => () => onArgumentClick(key), [onArgumentClick])
  const handleArgumentHover = useCallback((key: string) => () => onArgumentHover(key), [onArgumentHover])
  const handleArgumentUnhover = useCallback(() => onArgumentUnhover(), [onArgumentUnhover])

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
      <div className="font-medium flex divide-x-2 divide-gray-300 bg-white rounded-xl p-3 w-full md:w-[36rem]">
        <div className="pr-2">Result:</div>
        <div className="pl-2">
          {isTemplateValid ? elements.map((element) => {
            if (!('value' in element)) return null

            const isArgumentElement = ARGUMENT_ELEMENT_TYPES.includes(element.type as ArgumentElementType)

            const isTextValue = element.type === ICU.TYPE.argument
            const isNumberValue = element.type === ICU.TYPE.plural

            const value = values[element.value]

            let isEmpty = false

            if (isArgumentElement) {
              if (isTextValue) {
                isEmpty = !value?.length
              } else if (isNumberValue) {
                isEmpty = isNaN(parseInt(value))
              }
            }

            return (
              <span
                key={element.value}
                className={cn(
                  'leading-[1.4rem] h-[1rem] whitespace-pre',
                  {
                    'relative after:absolute after:h-[3px] after:inset-x-0 cursor-pointer after:top-[1.4rem] after:transition-all after:pointer-events-none after:duration-100 before:absolute before:-inset-y-2 before:-inset-x-0.5 outline-none before:rounded focus:before:ring focus:before:ring-blue-50': isArgumentElement,
                    'after:bg-gray-200 hover:after:bg-gray-500': isArgumentElement && !isEmpty,
                    'w-10 after:bg-red-200 hover:after:bg-red-500 before:[content:"__________"]': isArgumentElement && isEmpty,
                  }
                )}
                onClick={handleArgumentClick(element.value)}
                onMouseEnter={handleArgumentHover(element.value)}
                onMouseLeave={handleArgumentUnhover}
              >
                {isArgumentElement ? value : element.value}
              </span>
            )
          }) : (
            <Transition
              show
              appear
              enter="transition-all"
              enterFrom="-translate-x-2 opacity-0"
              enterTo="translate-x-0 opacity-100"
              className="px-1 mx-1 ring-4 rounded ring-red-100 bg-red-100 text-red-600 font-medium"
            >
              Invalid template
            </Transition>
          )}
        </div>
      </div>
    </Transition>
  )
}
