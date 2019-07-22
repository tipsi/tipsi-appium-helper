export default async function getChildName(parentElement, childId) {
  const child = await this.driver.findElementFromElement(
    parentElement,
    childId
  )
  const text = await this.driver.getElementText(
    child.value.ELEMENT
  )
  return text.value
}
