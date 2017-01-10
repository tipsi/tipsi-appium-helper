export default async function swipe(selector, direction) {
  if (this.platform('ios')) {
    const element = await this.driver.element(selector)
    return this.driver.execute(
      'mobile: scroll',
      { direction: direction < 0 ? 'up' : 'down', element: element.value.ELEMENT }
     )
  }
  return this.driver[direction < 0 ? 'swipeDown' : 'swipeUp'](
    selector,
    2000
  )
}
