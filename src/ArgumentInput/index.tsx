import {useEffect, Fragment} from 'react'
import * as ICU from '@formatjs/icu-messageformat-parser'
import { Field } from 'Field'
import {Listbox, Transition} from '@headlessui/react'
import {cn, dateToTime, formatDecimal, timeToDate} from 'common/helpers'
import {MdOutlineTextFields, MdNumbers, MdFormatListBulleted, MdForest, MdAccessTime, MdCalendarToday} from 'react-icons/md'
import { EditableElement } from 'common/types/editable-element'
import dayjs from 'dayjs'

export type ArgumentInputProps = {
  element: EditableElement
  value: string
  onChange: (value: string) => void
  onMount: () => void
  onUnmount: () => void
}

export const ArgumentInput = ({element, value, onChange, onMount, onUnmount}: ArgumentInputProps) => {
  useEffect(() => {
    onMount()

    return onUnmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const inputClassName = cn('outline-none bg-gray-100 transition-all rounded-lg px-2 py-1 focus:bg-white focus:ring focus:ring-blue-400')
  const optionClassName = cn('transition-all [&:not(&:disabled)]:active:scale-95 text-left [&:not(&:disabled)]cursor-pointer focus:ring focus:ring-blue-400 focus:bg-white rounded-lg px-2 py-1 bg-gray-100 outline-none disabled:bg-blue-200')

  if (ICU.isSelectElement(element)) {
    const options = Object.entries(element.options).filter(([_key, option]) => option.value.length > 0)

    return (
      <Field div icon={MdFormatListBulleted} label={element.value}>
        {options.map(([key, option]) => 
          <button
            key={key}
            value={key}
            disabled={key === value}
            className={optionClassName}
            onClick={() => onChange(key)}
            data-argument-name={element.value}
          >
            {(option.value[0] as ICU.SelectElement).value.replace(/^#/, 'N')}
          </button>
        )}
      </Field>
    )
  }

  if (ICU.isPluralElement(element)) {
    return (
      <Field icon={MdForest} label={element.value}>
        <input
          value={Math.max(0, Number(value))}
          onChange={e => onChange(Math.max(0, parseInt(e.target.value)).toString())}
          type="number"
          className={inputClassName}
          data-argument-name={element.value}
        />
      </Field>
    )
  }

  if (ICU.isArgumentElement(element)) {
    return (
      <Field icon={MdOutlineTextFields} label={element.value}>
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          type="text"
          className={inputClassName}
          data-argument-name={element.value}
        />
      </Field>
    )
  }

  if (ICU.isNumberElement(element)) {
    return (
      <Field icon={MdNumbers} label={element.value}>
        <input
          value={value}
          onChange={e => onChange(formatDecimal(e.target.value))}
          type="text"
          className={inputClassName}
          data-argument-name={element.value}
        />
      </Field>
    )
  }

  if (ICU.isDateElement(element)) {
    return (
      <Field icon={MdCalendarToday} label={element.value}>
        <input
          data-argument-name={element.value}
          type="datetime-local"
          step={1}
          value={value}
          onChange={({target: {value}}) => onChange(value)}
          className={cn(inputClassName, 'appearance-none')}
        />
      </Field>
    )
  }

  if (ICU.isTimeElement(element)) {
    return (
      <Field icon={MdAccessTime} label={element.value}>
        <input
          data-argument-name={element.value}
          value={value}
          type="time"
          step={1}
          className={cn(inputClassName, 'appearance-none')}
          onChange={({target: {value}}) => onChange(value)}
        />
      </Field>
    )
  }

  return null
}
