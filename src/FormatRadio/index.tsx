import {cn} from 'common/helpers'

const FORMATS = ['messageformat'] as const
export type Format = (typeof FORMATS)[number]

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
                'flex h-10 cursor-pointer select-none items-center rounded-lg bg-white px-2 py-1 transition-all active:scale-95',
                {'opacity-50': format !== value},
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
