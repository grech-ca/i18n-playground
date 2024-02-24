export const isButtonElement = (element: Element): element is HTMLButtonElement => {
  return element.tagName === 'BUTTON'
}
