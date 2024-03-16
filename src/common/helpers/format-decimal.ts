export const formatDecimal = (value: string) => {
  const chars = value.split('')
  let result = ''
  let dotExists = false

  chars.forEach((char, index) => {
    const isDot = char === '.'

    if (isDot && (index === 0 || dotExists)) return
    if (isDot) dotExists = true

    if (isNaN(parseFloat(char)) && !isDot) return

    result += char
  })

  return result
}
