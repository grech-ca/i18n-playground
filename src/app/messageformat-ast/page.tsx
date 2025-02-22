'use client'

import {useEffect, useMemo, useState} from 'react'

import {useLocalStorage} from 'react-use'
import {FaAngleUp as ArrowUpIcon, FaAngleDown as ArrowDownIcon} from 'react-icons/fa6'
import {parse, MessageFormatElement, TYPE} from '@formatjs/icu-messageformat-parser'

import {cn, validateMessageFormatTemplate} from 'common/helpers'

type NodeProps = {
  node: MessageFormatElement
}

const NODE_TYPES: Record<TYPE, string> = {
  [TYPE.literal]: 'Literal',
  [TYPE.argument]: 'Argument',
  [TYPE.number]: 'Number',
  [TYPE.date]: 'Date',
  [TYPE.time]: 'Time',
  [TYPE.select]: 'Select',
  [TYPE.plural]: 'Plural',
  [TYPE.pound]: 'pound',
  [TYPE.tag]: 'Tag',
}

const Node = ({node}: NodeProps) => {
  const [isExpanded, setIsExpanded] = useState(true)

  const ArrowIcon = isExpanded ? ArrowDownIcon : ArrowUpIcon

  let content

  switch (node.type) {
    case TYPE.literal:
    case TYPE.number:
    case TYPE.date:
    case TYPE.time:
    case TYPE.pound:
      content = null
      break
    case TYPE.tag:
      content = node.children.map((node, index) => <Node key={index} node={node} />)
      break
    case TYPE.select:
    case TYPE.plural:
      content = (
        <ol className="flex flex-col gap-y-2">
          {Object.entries(node.options).map(([key, option], index) => (
            <li key={index} className="grid grid-cols-[80px_1fr] gap-x-4">
              <div className="truncate border-r-2 border-gray-400" title={key}>
                {key}
              </div>
              <div className="flex flex-col gap-y-2">
                {option.value.map((node, index) => (
                  <Node key={index} node={node} />
                ))}
              </div>
            </li>
          ))}
        </ol>
      )
      break
  }

  let nodeName

  switch (node.type) {
    case TYPE.number:
    case TYPE.date:
    case TYPE.time:
    case TYPE.pound:
      nodeName = null
      break
    case TYPE.literal:
    case TYPE.argument:
    case TYPE.tag:
    case TYPE.select:
    case TYPE.plural:
      nodeName = node.value
      break
  }

  return (
    <div className="flex flex-col">
      <button className="flex items-center gap-x-2" onClick={() => setIsExpanded((prev) => !prev)} disabled={!content}>
        {content && <ArrowIcon />}
        <div>
          {NODE_TYPES[node.type]}{' '}
          {nodeName && (
            <span>
              [<i className="text-purple-500">{nodeName}</i>]
            </span>
          )}
        </div>
      </button>

      {content && isExpanded && <div className="p-2 pl-6">{content}</div>}
    </div>
  )
}

export default function MessageFormatASTPage() {
  const [code, setCode] = useLocalStorage('code', '')
  const [ast, setAST] = useState<MessageFormatElement[] | null>(null)

  const isValid = useMemo(() => code && validateMessageFormatTemplate(code), [code])

  useEffect(() => {
    if (isValid && code) setAST(parse(code))
  }, [code, isValid])

  return (
    <div className="grid h-dvh w-dvw grid-cols-3">
      <div className="grid grid-rows-2 overflow-hidden">
        <textarea
          className={cn('w-full resize-none bg-gray-50 p-3 outline-none transition-[box-shadow]', {
            'ring-4 ring-inset ring-red-500': !isValid,
          })}
          onChange={({target: {value}}) => setCode(value)}
        >
          {code}
        </textarea>
        <pre className="overflow-y-auto bg-gray-200 p-3 text-xs">{JSON.stringify(ast, null, 2)}</pre>
      </div>
      <div className="flex flex-col gap-y-2 border-x border-black bg-gray-200 p-3">
        {ast?.map((node, index) => <Node key={index} node={node} />)}
      </div>
      <div className="bg-gray-200"></div>
    </div>
  )
}
