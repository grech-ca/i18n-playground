import {Fragment, useCallback, useEffect, useMemo, useState} from 'react'
import {Transition} from '@headlessui/react'
import { ARGUMENT_ELEMENT_TYPES } from 'common/data'
import { ArgumentElementType } from 'common/types'
import * as ICU from '@formatjs/icu-messageformat-parser'
import {cn, validateMessageFormatTemplate} from 'common/helpers'
import * as formatjs from '@formatjs/intl'

export type ResultProps = {
  template: string
  elements: ICU.MessageFormatElement[]
  values: Record<string, string>
  onArgumentClick: (key: string) => void
  onArgumentHover: (key: string) => void
  onArgumentUnhover: () => void
  isWhitespacePreserved: boolean
}

export const Result = ({ template, values, elements, onArgumentClick, onArgumentHover, onArgumentUnhover, isWhitespacePreserved }: ResultProps) => {
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
        <div className={cn('pl-2', {'whitespace-break-spaces': isWhitespacePreserved})}>
          {isTemplateValid ? elements.map((element, index) => {
            let value: string = ''

            if (ICU.isLiteralElement(element)) {
              value = element.value
            }

            if (ICU.isArgumentElement(element)) {
              value = values[element.value]
            }

            if (ICU.isTagElement(element)) {
              value = element.value
            }

            if (ICU.isSelectElement(element)) {
              value = values[element.value]
            }

            if (ICU.isNumberElement(element)) {
              if (!isNaN(Number(values[element.value]))) {
                value = formatjs.formatNumber(
                  {
                    locale: 'en-US',
                    formats: {
                      number: {
                        integer: {
                          maximumFractionDigits: 0,
                        },
                        currency: {
                          style: 'currency',
                        },

                        percent: {
                          style: 'percent',
                        },
                      },
                    },
                    onError: console.log,
                  },
                  formatjs.createFormatters().getNumberFormat,
                  Number(values[element.value]),
                  {style: element.style as any}
                )
              }
            }

            const isEmpty = value?.length === 0
            // if (!('value' in element)) return null
            //
            // const isArgumentElement = ARGUMENT_ELEMENT_TYPES.includes(element.type as ArgumentElementType)
            //
            // const isTextValue = element.type === ICU.TYPE.argument
            // const isNumberValue = element.type === ICU.TYPE.plural
            //
            // const value = isWhitespacePreserved ? values[element.value] : values[element.value]?.trim()
            //
            // let isEmpty = false
            //
            // if (isArgumentElement) {
            //   if (isTextValue) {
            //     isEmpty = !value?.length
            //   } else if (isNumberValue) {
            //     isEmpty = isNaN(parseInt(value))
            //   }
            // }
            
            const isLiteral = ICU.isLiteralElement(element)

            return (
              <span
                key={index}
                className={cn(
                  'leading-[1.4rem] h-[1rem]',
                  {
                    'relative after:absolute after:h-[3px] after:inset-x-px cursor-pointer after:top-[1.4rem] after:transition-all after:pointer-events-none after:duration-100': !isLiteral,
                    'after:bg-gray-200 hover:after:bg-gray-500': !isLiteral && !isEmpty,
                    'w-10 after:bg-red-200 hover:after:bg-red-500 before:[content:"__________"] whitespace-pre': !isLiteral && isEmpty,
                  }
                )}
                onClick={'value' in element ? handleArgumentClick(element.value) : undefined}
                onMouseEnter={'value' in element ? handleArgumentHover(element.value) : undefined}
                onMouseLeave={handleArgumentUnhover}
              >
                {value}
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
