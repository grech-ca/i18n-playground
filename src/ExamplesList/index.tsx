import {cn} from 'common/helpers'
import { Fragment, useCallback } from "react"
import {Disclosure} from '@headlessui/react'
import { MdKeyboardArrowDown, MdLightbulb } from 'react-icons/md'

export type Example = {
  name: string
  template: string
  values: Record<string, string>
}

export type ExamplesListProps = {
  onClickExample: (example: Example) => void
}

const examples: Example[] = [
  {
    name: 'Argument',
    template: 'Hi! My name is {name}.',
    values: {name: 'John Doe'}
  },
  {
    name: 'Plural',
    template: 'I am {age, plural, =1 {# year} other {# years}} old.',
    values: {age: '22'},
  },
  {
    name: 'Number',
    template: '{percent, number, percent} of this glass is full.',
    values: {percent: '0.5'}

  },
  {
    name: 'Select',
    template: 'The task is {status, select, in_progress {in progress} todo {not started} finished {finished} other {N/A}}.',
    values: {status: 'finished'}
  },
  {
    name: 'Date',
    template: `I've worked here since {date, date, medium}`,
    values: { date: new Date().toISOString().slice(0, 19) }
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
              <MdLightbulb className="text-xl text-yellow-400" />
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
            {examples.map(({name, template}, index) => (
              <button
                key={name}
                onClick={() => handleClickExample(name)}
                className={cn(
                  'grid gap-y-1 grid-rows-[auto_1fr] p-2 rounded-lg bg-white transition-all active:scale-95 w-40 min-w-[10rem]',
                  'outline-none focus:ring-4 focus:ring-blue-400 text-left'
                )}
              >
                <div className="text-sm font-medium">{index + 1}. {name}</div>
                <div className="bg-gray-700 text-[10px] text-white rounded p-1 h-full">
                  {template}
                </div>
              </button>
            ))}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}
