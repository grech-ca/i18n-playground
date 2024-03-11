const MS_IN_SECOND = 1000
const MS_IN_MINUTE = 60 * MS_IN_SECOND
const MS_IN_HOUR = 60 * MS_IN_MINUTE

export const timeToDate = (value: string, includeSeconds = false) => {
  const units = value.split(':')

  const [hours = 0, minutes = 0, seconds = 0] = units.map(unit => parseInt(unit))

  return new Date((hours - 1) * MS_IN_HOUR + minutes * MS_IN_MINUTE + (includeSeconds ? seconds : 0) * MS_IN_SECOND)
}
