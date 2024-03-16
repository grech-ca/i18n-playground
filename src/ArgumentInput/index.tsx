import * as ICU from '@formatjs/icu-messageformat-parser'
import {
  MdOutlineTextFields,
  MdNumbers,
  MdFormatListBulleted,
  MdForest,
  MdAccessTime,
  MdCalendarToday,
} from 'react-icons/md'

import {EditableElement} from 'common/types/editable-element'

import {cn, formatDecimal} from 'common/helpers'
import {Field} from 'Field'

export type ArgumentInputProps = {
  element: EditableElement
  value: string
  onChange: (value: string) => void
}

export const ArgumentInput = ({element, value, onChange}: ArgumentInputProps) => {
  const inputClassName = cn(
    'rounded-lg bg-gray-100 px-2 py-1 outline-none transition-all focus:bg-white focus:ring focus:ring-blue-400',
  )
  const optionClassName = cn(
    '[&:not(&:disabled)]cursor-pointer rounded-lg bg-gray-100 px-2 py-1 text-left outline-none transition-all focus:bg-white focus:ring focus:ring-blue-400 disabled:bg-blue-200 [&:not(&:disabled)]:active:scale-95',
  )

  if (ICU.isSelectElement(element)) {
    const options = Object.entries(element.options).filter(([_key, option]) => option.value.length > 0)

    return (
      <Field div icon={MdFormatListBulleted} label={element.value}>
        {options.map(([key, option]) => (
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
        ))}
      </Field>
    )
  }

  if (ICU.isPluralElement(element)) {
    return (
      <Field icon={MdForest} label={element.value}>
        <input
          value={Math.max(0, Number(value))}
          onChange={(e) => onChange(Math.max(0, parseInt(e.target.value)).toString())}
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
          onChange={(e) => onChange(e.target.value)}
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
          onChange={(e) => onChange(formatDecimal(e.target.value))}
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
