'use client'

import {Fragment, useState, useMemo, useEffect, useCallback} from 'react'

import * as ICU from '@formatjs/icu-messageformat-parser'
import {Transition} from '@headlessui/react'
import Link from 'next/link'

import {EditableElement} from 'common/types/editable-element'

import {supportedPackages} from 'common/data'

import {ArgumentInput} from 'ArgumentInput'
import {isInputElement, isButtonElement} from 'common/type-guards'
import {Result} from 'Result'
import {Signature} from 'Signature'
import {TemplateInput} from 'TemplateInput'
import {Checkbox} from 'Checkbox'
import {Format, FormatRadio} from 'FormatRadio'
import {Example, ExamplesList} from 'ExamplesList'

const HomePage = () => {
  const [template, setTemplate] = useState('')
  const [values, setValues] = useState<Record<string, string>>({})
  const [isWhitespacePreserved, setIsWhitespacePreserved] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState<Format>('messageformat')

  const setValue = (key: string, value: string) =>
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }))

  const handleArgumentClick = useCallback((key: string) => {
    const argumentElement = document.querySelector(`*[data-argument-name="${key}"]`)

    if (!argumentElement) return

    if (isInputElement(argumentElement)) {
      argumentElement.focus()
      argumentElement.select()
    }

    if (isButtonElement(argumentElement)) {
      argumentElement.focus()
    }
  }, [])

  const elements = useMemo(() => {
    try {
      const result = ICU.parse(template)
      return result
    } catch (error) {
      console.log(error)
      return []
    }
  }, [template])

  const argumentElements = useMemo(() => {
    const argumentElements = elements.filter(
      (element) => !(ICU.isLiteralElement(element) || ICU.isTagElement(element) || ICU.isPoundElement(element)),
    ) as EditableElement[]
    const uniqueArgumentElements = Object.values(
      Object.fromEntries(argumentElements.map((element) => [element.value, element])),
    )
    return uniqueArgumentElements
  }, [elements])

  useEffect(() => {
    const defaultValues = Object.fromEntries(argumentElements.map(({value}) => [value, '']))
    setValues((prev) => ({...defaultValues, ...prev}))
  }, [argumentElements])

  const handleExampleClick = useCallback(({template, values}: Example) => {
    setTemplate(template)
    setValues(values)
  }, [])

  return (
    <div className="grid h-full grid-rows-[1fr_auto] gap-y-10 p-6 pb-[10dvh] pt-[24dvh]">
      <div className="flex flex-col items-center justify-center gap-y-4">
        <div className="mb-6 grid gap-y-5 text-center text-white">
          <h1 className="text-4xl font-medium md:text-5xl">🌍 i18n Playground</h1>
          <p className="text-xl">
            <span>Debug</span>{' '}
            {supportedPackages.map(({name, url}, index, array) => (
              <Fragment key={name}>
                <Link
                  href={url}
                  className="relative inline-block transition-transform after:absolute after:inset-x-0 after:top-[95%] after:h-0.5 after:bg-white active:scale-95"
                  target="_blank"
                >
                  {name}
                </Link>
                {index < array.length - 1 && ', '}
              </Fragment>
            ))}
          </p>
        </div>
        <div className="grid w-full gap-y-4 rounded-2xl bg-gray-200 p-5 md:w-[36rem]">
          <FormatRadio value={selectedFormat} onChange={setSelectedFormat} />

          <ExamplesList onClickExample={handleExampleClick} />

          <TemplateInput value={template} onChange={setTemplate} />

          {argumentElements.length > 0 && (
            <div className="grid grid-flow-row grid-cols-2 items-start gap-2">
              {argumentElements.map((element, index) => (
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
                    onChange={(value) => setValue(element.value, value)}
                  />
                </Transition>
              ))}
            </div>
          )}

          <Checkbox
            onChange={setIsWhitespacePreserved}
            checked={isWhitespacePreserved}
            label="Enable whitespace preservation"
          />
        </div>
        <Result
          isWhitespacePreserved={isWhitespacePreserved}
          template={template}
          elements={elements}
          values={values}
          onArgumentClick={handleArgumentClick}
        />
      </div>
      <Signature />
    </div>
  )
}

export default HomePage
