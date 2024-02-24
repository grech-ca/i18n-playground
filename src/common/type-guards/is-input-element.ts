export const isInputElement = (element: Element): element is HTMLInputElement => {
  return element.tagName === 'INPUT'
}
