export default async function hideKeyboard() {
  if (this.platform('ios')) {
    const defaultId = this.idFromXPath(`
      //XCUIElementTypeApplication/XCUIElementTypeWindow[5]/XCUIElementTypeOther/
      XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeKeyboard/
      XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeButton[4]
    `)
    const nextId = this.idFromXPath(`
      //XCUIElementTypeApplication/XCUIElementTypeWindow[4]/XCUIElementTypeOther/
      XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeKeyboard/
      XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeButton[4]
    `)

    let isFound = false
    try {
      const element = await this.driver.findElement(defaultId)
      await element.click()
      isFound = true
    } catch (e) {
      const element = await this.driver.findElement(nextId)
      await element.click()
      isFound = true
    }

    if (!isFound) {
      throw new Error('Done button not found')
    }
  } else {
    await this.driver.back()
  }
}
