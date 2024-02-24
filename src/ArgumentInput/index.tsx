import {useEffect, Fragment} from 'react'
import * as ICU from '@formatjs/icu-messageformat-parser'
import { Field } from 'Field'
import {Listbox, Transition} from '@headlessui/react'
import {cn} from 'common/helpers'

const ARGUMENT_ELEMENTS = [ICU.TYPE.argument, ICU.TYPE.plural, ICU.TYPE.select] as const

export type ArgumentInputProps = {
  element: ICU.SelectElement | ICU.PluralElement | ICU.ArgumentElement
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
  const optionClassName = cn('transition-all [&:not(&:disabled)]:active:scale-95 text-left [&:not(&:disabled)]cursor-pointer rounded-lg px-2 py-1 bg-gray-100 disabled:bg-blue-200')

  if (element.type === ICU.TYPE.select) {
    const options = Object.entries(element.options).filter(([_key, option]) => option.value.length > 0)

    return (
      <Field div label={element.value}>
        {options.map(([key, option]) => 
          <button
            key={key}
            value={key}
            disabled={key === value}
            className={optionClassName}
            onClick={() => onChange(key)}
            data-argument-name={element.value}
          >
            {key} ({(option.value[0] as ICU.SelectElement).value.replace(/^#/, 'N')})
          </button>
        )}
      </Field>
    )
  }

  if (element.type === ICU.TYPE.plural) {
    return (
      <Field label={element.value}>
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

  if (element.type === ICU.TYPE.argument) {
    return (
      <Field label={element.value}>
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

  return null
}
