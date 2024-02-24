import * as ICU from '@formatjs/icu-messageformat-parser'

export const validateMessageFormatTemplate = (template: string) => {
  try {
    ICU.parse(template)
    return true
  } catch {
    return false
  }
}

