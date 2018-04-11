import path from 'path'
import fs from 'fs'

export default async function () {
  const content = await this.driver.getSource()

  return new Promise((resolve) => {
    const pathToLog = path.resolve(process.cwd(), 'appium_source.xml')
    fs.writeFile(pathToLog, content, 'utf8', (error) => {
      if (error) {
        console.log('---------------------------------------------------')
        console.log('Failed to save source:', error)
        console.log('---------------------------------------------------')
        reject(error)
      } else {
        console.log('---------------------------------------------------')
        console.log('SOURCE URL:', pathToLog)
        console.log('---------------------------------------------------')
        resolve()
      }
    })
  })
}
