const MS_IN_SECOND = 1000
const MS_IN_MINUTE = 60 * MS_IN_SECOND
const MS_IN_HOUR = 60 * MS_IN_MINUTE

export const dateToTime = (value: string, includeSeconds = false) => {
  const dateMs = new Date(value).getMilliseconds()

  const hours = Math.ceil(dateMs / MS_IN_HOUR)
  const minutes = Math.ceil((dateMs - hours * MS_IN_HOUR) / MS_IN_MINUTE)
  const seconds = Math.ceil((dateMs - hours * MS_IN_HOUR - minutes * MS_IN_MINUTE) / MS_IN_SECOND)

  const formattedHours = `0${hours}`.slice(-2)
  const formattedMinutes = `0${minutes}`.slice(-2)
  const formattedSeconds = `0${seconds}`.slice(-2)

  return `${formattedHours}:${formattedMinutes}${includeSeconds ? `:${formattedSeconds}` : ''}`
}
