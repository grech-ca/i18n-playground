import {useMemo} from 'react'

import * as ICU from '@formatjs/icu-messageformat-parser'
import * as formatjs from '@formatjs/intl'
import IntlMessageFormat from 'intl-messageformat'
import {NumberFormatOptions} from 'use-intl'

import {cn, timeToDate} from 'common/helpers'

export type SegmentProps = {
  element: ICU.MessageFormatElement
  values: Record<string, string>
  onClick: (value: string) => void
}

export const Segment = ({element, values, onClick}: SegmentProps) => {
  const value = useMemo(() => {
    let result: string = ''

    if (ICU.isLiteralElement(element)) {
      result = element.value
    }

    if (ICU.isArgumentElement(element)) {
      result = values[element.value]
    }

    if (ICU.isTagElement(element)) {
      result = element.value
    }

    if (ICU.isSelectElement(element)) {
      result = values[element.value]
    }

    if (ICU.isNumberElement(element)) {
      if (!isNaN(parseFloat(values[element.value]))) {
        result = formatjs.formatNumber(
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

        result = option.value
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

      result = option.value.map((element) => (ICU.isLiteralElement(element) ? element.value : '')).join('')
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

        result = formatjs.createFormatters().getDateTimeFormat('en-US', style).format(timeToDate(argumentValue, true))
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
        result = formatjs.createFormatters().getDateTimeFormat('en-US', style).format(new Date(argumentValue))
      }
    }

    return result
  }, [element, values])

  const isEmpty = value?.length === 0

  const isLiteral = ICU.isLiteralElement(element)

  return (
    <span
      className={cn('h-[1rem] leading-[1.4rem]', {
        'relative cursor-pointer after:pointer-events-none after:absolute after:inset-x-px after:top-[1.2rem] after:h-[2px] after:transition-all after:duration-100':
          !isLiteral,
        'after:bg-gray-200 hover:after:bg-gray-500': !isLiteral && !isEmpty,
        'w-10 whitespace-pre before:[content:"__________"] after:bg-red-200 hover:after:bg-red-500':
          !isLiteral && isEmpty,
      })}
      onClick={'value' in element ? () => onClick(element.value) : undefined}
    >
      {value}
    </span>
  )
}
