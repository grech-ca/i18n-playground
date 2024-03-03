import {cn} from 'common/helpers'

const FORMATS = ['messageformat'] as const
export type Format = typeof FORMATS[number]

export type FormatRadio = {
  value: Format
  onChange: (value: Format) => void
}

export const FormatRadio = ({value, onChange}: FormatRadio) => {
  return (
    <div className="grid gap-y-2">
      <div className="font-medium">Format</div>
      <div className="flex flex-wrap gap-x-2">
        {FORMATS.map((format) => {
          return (
            <label
              key={format}
              className={cn(
                'px-2 py-1 bg-white rounded-lg cursor-pointer select-none h-10 flex items-center active:scale-95 transition-all',
                { 'opacity-50': format !== value },
              )}
            >
              <input
                hidden
                type="radio"
                name="format"
                value={format}
                onChange={({target}) => onChange(target.value as Format)}
              />
              <div className="font-medium">{format}</div>
            </label>
          )
        })}
      </div>
    </div>
  )
}
