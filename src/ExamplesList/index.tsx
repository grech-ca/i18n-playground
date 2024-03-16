import {ReactNode, useCallback} from 'react'

import {Disclosure} from '@headlessui/react'
import {MdKeyboardArrowDown, MdLightbulb} from 'react-icons/md'

import {cn} from 'common/helpers'

export type Example = {
  name: string
  template: string
  values: Record<string, string>
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
    preview: (
      <p>
        Hi! My name is <span className="rounded bg-yellow-200 px-1 py-0.5 font-medium text-yellow-600">John Doe</span>.
      </p>
    ),
  },
  {
    name: 'Plural',
    template: 'I have {pet_projects_count, plural, =1 {# project} other {# projects}}.',
    values: {age: '22'},
    preview: (
      <p>
        I have <span className="rounded bg-blue-200 px-1 py-0.5 font-medium text-blue-600">2 projects</span>.
      </p>
    ),
  },
  {
    name: 'Number',
    template: '{percent, number, percent} of this glass is full.',
    values: {percent: '0.5'},
    preview: (
      <p>
        <span className="rounded bg-green-200 px-1 py-0.5 font-medium text-green-600">50%</span> of this glass is full.
      </p>
    ),
  },
  {
    name: 'Select',
    template:
      'The task is {status, select, todo {not started} in_progress {in progress} finished {finished} other {N/A}}.',
    values: {status: 'finished'},
    preview: (
      <p>
        The task is <span className="rounded bg-violet-200 px-1 py-0.5 font-medium text-violet-600">in progress</span>.
      </p>
    ),
  },
  {
    name: 'Date',
    template: `I've worked here since {date, date, medium}`,
    values: {date: new Date().toISOString().slice(0, 19)},
    preview: (
      <p>
        I&apos;ve worked here since <br />{' '}
        <span className="rounded bg-orange-200 px-1 py-0.5 font-medium text-orange-600">June 1, 2023</span>.
      </p>
    ),
  },
]

export const ExamplesList = ({onClickExample}: ExamplesListProps) => {
  const handleClickExample = useCallback(
    (name: string) => {
      const targetExample = examples.find((example) => example.name === name)
      if (targetExample) onClickExample(targetExample)
    },
    [onClickExample],
  )

  return (
    <Disclosure>
      {({open}) => (
        <div
          className={cn('grid transition-[grid-template-rows]', {
            'grid-rows-[min-content_0fr]': !open,
            'grid-rows-[min-content_1fr]': open,
          })}
        >
          <Disclosure.Button
            className={cn(
              'rounded-lg bg-white px-3 py-2 text-left font-medium outline-none focus:ring-4 focus:ring-blue-400',
              'flex items-center justify-between transition-all active:scale-[0.98]',
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
            className={cn('-mb-5 flex w-full gap-x-3 p-1 pb-5 transition-all', {
              'mt-2 overflow-x-auto opacity-100': open,
              'mt-0 overflow-hidden opacity-0': !open,
            })}
          >
            {examples.map(({name, template, preview}, index) => (
              <button
                key={name}
                onClick={() => handleClickExample(name)}
                className={cn(
                  'grid w-[13rem] min-w-[13rem] grid-rows-[auto_1fr] gap-y-1 rounded-lg bg-white p-2 transition-all active:scale-95',
                  'text-left outline-none focus:ring-4 focus:ring-blue-400',
                )}
              >
                <div className="text-sm font-medium">
                  {index + 1}. {name}
                </div>
                {preview ? (
                  <div className="rounded bg-gray-50 p-1 text-sm">{preview}</div>
                ) : (
                  <div className="h-full rounded bg-gray-700 p-1 text-[10px] text-white">{template}</div>
                )}
              </button>
            ))}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}
