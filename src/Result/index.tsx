import {Fragment, useCallback, useEffect, useMemo, useState} from 'react'

import {Transition} from '@headlessui/react'
import * as ICU from '@formatjs/icu-messageformat-parser'
import IntlMessageFormat from 'intl-messageformat'
import * as formatjs from '@formatjs/intl'
import {NumberFormatOptions} from 'use-intl/core'

import {cn, timeToDate, validateMessageFormatTemplate} from 'common/helpers'

export type ResultProps = {
  template: string
  elements: ICU.MessageFormatElement[]
  values: Record<string, string>
  onArgumentClick: (key: string) => void
  isWhitespacePreserved: boolean
}

export const Result = ({template, values, elements, onArgumentClick, isWhitespacePreserved}: ResultProps) => {
  const handleArgumentClick = useCallback((key: string) => () => onArgumentClick(key), [onArgumentClick])

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
            elements.map((element, index) => {
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
                if (!isNaN(parseFloat(values[element.value]))) {
                  value = formatjs.formatNumber(
                    {
                      locale: 'en-US',
                      formats: {},
                      onError: console.log,
                    },
                    (...params) => formatjs.createFormatters().getNumberFormat(...params),
                    parseFloat(values[element.value]),
                    ICU.isNumberSkeleton(element.style)
                      ? element.style.parsedOptions
                      : {style: (element.style ?? undefined) as NumberFormatOptions['style']},
                  )
                }
              }

              if (ICU.isPluralElement(element)) {
                const argumentValue = parseFloat(values[element.value])

                if (!isNaN(argumentValue)) {
                  let option = element.options[`=${argumentValue}`]

                  if (!option) {
                    const rule = formatjs
                      .createFormatters()
                      .getPluralRules('en-US', {type: element.pluralType})
                      .select(argumentValue - element.offset ?? 0)

                    option = element.options[rule] ?? element.options.other
                  }

                  value = option.value
                    .map((element) => {
                      if (ICU.isPoundElement(element)) {
                        return argumentValue
                      }

                      if (ICU.isLiteralElement(element)) {
                        return element.value
                      }

                      return ''
                    })
                    .join('')
                }
              }

              if (ICU.isSelectElement(element)) {
                const argumentValue = values[element.value]

                const option = element.options[argumentValue] ?? element.options.other

                value = option.value.map((element) => (ICU.isLiteralElement(element) ? element.value : '')).join('')
              }

              if (ICU.isTimeElement(element)) {
                const argumentValue = values[element.value]

                if (argumentValue) {
                  const style =
                    typeof element.style === 'string'
                      ? IntlMessageFormat.formats.time[element.style]
                      : ICU.isDateTimeSkeleton(element.style)
                        ? element.style.parsedOptions
                        : IntlMessageFormat.formats.time.medium

                  value = formatjs
                    .createFormatters()
                    .getDateTimeFormat('en-US', style)
                    .format(timeToDate(argumentValue, true))
                }
              }

              if (ICU.isDateElement(element)) {
                const argumentValue = values[element.value]

                if (argumentValue) {
                  const style =
                    typeof element.style === 'string'
                      ? IntlMessageFormat.formats.date[element.style]
                      : ICU.isDateTimeSkeleton(element.style)
                        ? element.style.parsedOptions
                        : undefined
                  value = formatjs.createFormatters().getDateTimeFormat('en-US', style).format(new Date(argumentValue))
                }
              }

              const isEmpty = value?.length === 0

              const isLiteral = ICU.isLiteralElement(element)

              return (
                <span
                  key={index}
                  className={cn('h-[1rem] leading-[1.4rem]', {
                    'relative cursor-pointer after:pointer-events-none after:absolute after:inset-x-px after:top-[1.2rem] after:h-[2px] after:transition-all after:duration-100':
                      !isLiteral,
                    'after:bg-gray-200 hover:after:bg-gray-500': !isLiteral && !isEmpty,
                    'w-10 whitespace-pre before:[content:"__________"] after:bg-red-200 hover:after:bg-red-500':
                      !isLiteral && isEmpty,
                  })}
                  onClick={'value' in element ? handleArgumentClick(element.value) : undefined}
                >
                  {value}
                </span>
              )
            })
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
