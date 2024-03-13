import {cn} from 'common/helpers'
import { Fragment, ReactNode, useCallback } from "react"
import {Disclosure} from '@headlessui/react'
import { MdKeyboardArrowDown, MdLightbulb } from 'react-icons/md'
import { PT_Sans } from 'next/font/google'

export type Example = {
  name: string
  template: string
  values: Record<string, string>,
  preview?: ReactNode
}

export type ExamplesListProps = {
  onClickExample: (example: Example) => void
}

const examples: Example[] = [
  {
    name: 'Argument',
    template: 'Hi! My name is {name}.',
    values: {name: 'John Doe'},
    preview: <p>Hi! My name is <span className="font-medium bg-yellow-200 text-yellow-600 py-0.5 px-1 rounded">John Doe</span>.</p>
  },
  {
    name: 'Plural',
    template: 'I have {pet_projects_count, plural, =1 {# project} other {# projects}}.',
    values: {age: '22'},
    preview: <p>I have <span className="font-medium bg-blue-200 text-blue-600 py-0.5 px-1 rounded">2 projects</span>.</p>
  },
  {
    name: 'Number',
    template: '{percent, number, percent} of this glass is full.',
    values: {percent: '0.5'},
    preview: <p><span className="font-medium bg-green-200 text-green-600 py-0.5 px-1 rounded">50%</span> of this glass is full.</p>
  },
  {
    name: 'Select',
    template: 'The task is {status, select, todo {not started} in_progress {in progress} finished {finished} other {N/A}}.',
    values: {status: 'finished'},
    preview: <p>The task is <span className="font-medium bg-violet-200 text-violet-600 py-0.5 px-1 rounded">in progress</span>.</p>
  },
  {
    name: 'Date',
    template: `I've worked here since {date, date, medium}`,
    values: { date: new Date().toISOString().slice(0, 19) },
    preview: <p>I&apos;ve worked here since <br /> <span className="font-medium bg-orange-200 text-orange-600 py-0.5 px-1 rounded">June 1, 2023</span>.</p>,
  }
]

export const ExamplesList = ({onClickExample}: ExamplesListProps) => {
  const handleClickExample = useCallback((name: string) => {
    const targetExample = examples.find((example) => example.name === name)
    if (targetExample) onClickExample(targetExample)
  }, [onClickExample])

  return (
    <Disclosure>
      {({open}) => (
        <div
          className={cn(
            'grid transition-[grid-template-rows]',
            {
              'grid-rows-[min-content_0fr]': !open,
              'grid-rows-[min-content_1fr]': open,
            }
          )}
        >
          <Disclosure.Button
            className={cn(
              'font-medium text-left focus:ring-4 focus:ring-blue-400 px-3 py-2 rounded-lg outline-none bg-white',
              'transition-all active:scale-[0.98] flex justify-between items-center',
            )}
          >
            <div className="flex items-center gap-x-1">
              <MdLightbulb className="text-xl text-yellow-300" />
              <span>Examples</span>
            </div>
            <MdKeyboardArrowDown className={cn('text-xl transition-transform', {'rotate-180': open})} />
          </Disclosure.Button>
          <Disclosure.Panel
            static
            className={cn(
              'flex gap-x-3 w-full p-1 pb-5 -mb-5 transition-all',
              {
                'overflow-x-auto opacity-100 mt-2': open,
                'overflow-hidden opacity-0 mt-0': !open,
              }
            )}
          >
            {examples.map(({name, template, preview}, index) => (
              <button
                key={name}
                onClick={() => handleClickExample(name)}
                className={cn(
                  'grid gap-y-1 grid-rows-[auto_1fr] p-2 rounded-lg bg-white transition-all active:scale-95 w-[13rem] min-w-[13rem]',
                  'outline-none focus:ring-4 focus:ring-blue-400 text-left'
                )}
              >
                <div className="text-sm font-medium">{index + 1}. {name}</div>
                {preview ? (
                  <div className="bg-gray-50 text-sm rounded p-1">{preview}</div>
                ) : (
                  <div className="bg-gray-700 text-[10px] text-white rounded p-1 h-full">
                    {template}
                  </div>
                )}
              </button>
            ))}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}
