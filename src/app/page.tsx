'use client'

import { Fragment, useState, useMemo, useEffect, PropsWithChildren, useCallback } from 'react'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import { createTranslator } from 'use-intl/core';
import Textarea from 'react-textarea-autosize'
import * as ICU from '@formatjs/icu-messageformat-parser'
import {ArgumentInput, ArgumentInputProps} from 'ArgumentInput'
import { Transition } from '@headlessui/react';
import Link from 'next/link'

const ARGUMENT_ELEMENTS = [ICU.TYPE.argument, ICU.TYPE.plural, ICU.TYPE.select] as const

const validateTemplate = (template: string) => {
  try {
    ICU.parse(template)
    return true
  } catch {
    return false
  }
}

const HomePage = () => {
  const [template, setTemplate] = useState('')
  const [isResultShown, setIsResultShown] = useState(false)
  
  const {control, handleSubmit, watch} = useForm({ mode: 'all' })

  const [interpolatedText, setInterpolatedText] = useState('')

  const [values, setValues] = useState<Record<string, string>>({})

  const setValue = (key: string, value: string) => setValues(prev => ({
    ...prev,
    [key]: value,
  }))

  const registerValue = useCallback((key: string) => () => setValues(prev => ({...prev, [key]: ''})), [])
  const unregisterValue = useCallback((key: string) => () => setValues(prev => {
    if (key in prev) {
      const newValues = {...prev}
      delete newValues[key]
      return newValues
    }

    return prev
  }), [])

  const interpolateText = useCallback(async () => {
    try {
      if (validateTemplate(template)) {
        const t = createTranslator({messages: {template: template}, locale: 'en'})

        const result = t('template', values)

        setInterpolatedText(result)
      }
    } catch (error) {
    }
  }, [template, values])

  useEffect(() => {
    interpolateText()
  }, [interpolateText])

  const isTemplateValid = useMemo(() => validateTemplate(template), [template])

  useEffect(() => {
    if (template.length > 0 && validateTemplate(template) && !isResultShown) {
      setIsResultShown(true)
    }
  }, [isResultShown, template])

  const elements = useMemo(() => {
    try {
      const result = ICU.parse(template)
      return result.filter(({type}) => ARGUMENT_ELEMENTS.includes(type as typeof ARGUMENT_ELEMENTS[number])) as ArgumentInputProps['element'][]
    } catch (error) {
      console.log(error)
      return []
    }
  }, [template])

  return (
    <div className="grid grid-rows-[1fr_auto] pt-12 h-full">
      <div className="flex flex-col gap-y-4 items-center justify-center">
        <div className="grid gap-y-5 text-white text-center mb-6">
          <h1 className="text-5xl font-medium">🌍 i18n Playground</h1>
          <p className="text-xl">
            <span>Debug</span>{' '}
            <Link
              href="https://npmjs.com/package/next-intl"
              className="inline-block transition-transform active:scale-95 relative after:absolute after:top-full after:inset-x-0 after:bg-white after:h-0.5"
              target="_blank"
            >
              next-intl
            </Link>
          </p>
        </div>
        <div className="grid gap gap-y-4 p-5  rounded-2xl bg-gray-200 w-[36rem]">
          <label className="grid gap-y-2">
            <span className="font-medium">Template</span>
            <input
              className="transition-all px-3 py-2 rounded-lg outline-none focus:focus-visible:ring-4 focus:focus-visible:ring-blue-400 resize-none"
              value={template} 
              autoFocus
              onChange={e => setTemplate(e.target.value)}
              placeholder="My name is {name}"
            />
          </label>

          {elements.length > 0 && (
            <div className="flex flex-col items-start gap-y-2">
              {elements.map((element, index) => (
                <Transition
                  key={index}
                  show
                  appear
                  enter="transition-all"
                  enterFrom="-translate-x-4 opacity-0"
                  enterTo="translate-x-0 opacity-100"
                >
                  <ArgumentInput
                    element={element}
                    value={values[element.value]}
                    onChange={value => setValue(element.value, value)}
                    onMount={registerValue(element.value)}
                    onUnmount={unregisterValue(element.value)}
                  />
                </Transition>
              ))}
            </div>
          )}
        </div>
        <Transition
          as={Fragment}
          show={isResultShown}
          enter="transition-all"
          enterFrom="translate-y-4 opacity-0"
          enterTo="translate-y-0 opacity-100"
        >
          <div className="font-medium flex divide-x-2 divide-gray-300 bg-white rounded-xl p-3 w-[36rem]">
            <div className="pr-2">Result:</div>
            <div className="pl-2">{isTemplateValid ? interpolatedText : <Transition show appear enter="transition-all" enterFrom="-translate-x-2 opacity-0" enterTo="translate-x-0 opacity-100" className="py-1 px-2 rounded bg-red-100 text-red-600 font-medium">Invalid template</Transition>}</div>
          </div>
        </Transition>
      </div>
      <div className="text-center pb-8 text-lg">
        <span className="text-slate-600">by</span>{' '}
        <Link
          href="https://grech.dev"
          className="text-white"
          target="_blank"
        >
          Mikhail Grechka
        </Link>
      </div>
    </div>
  )
}

export default HomePage
