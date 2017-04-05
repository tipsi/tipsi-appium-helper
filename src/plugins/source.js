import quickGist from 'quick-gist'

export default async function () {
  const content = await this.driver.getSource()

  return new Promise((resolve) => {
    quickGist({
      content,
      description: `Appium source ${new Date()}`,
      public: false,
      enterpriseOnly: false,
      fileExtension: 'xml',
    }, (error, resp, data) => {
      /* eslint-disable no-console */
      if (error) {
        console.log('---------------------------------------------------')
        console.log('Failed to save source:', error.message)
        console.log('---------------------------------------------------')
        resolve(null)
      } else {
        console.log('---------------------------------------------------')
        console.log('SOURCE URL:', data.html_url)
        console.log('---------------------------------------------------')
        resolve(data)
      }
      /* eslint-enable no-console */
    })
  })
}
