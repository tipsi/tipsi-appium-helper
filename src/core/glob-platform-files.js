import glob from 'glob'
import allowedPlatforms from '../constants/allowedPlatforms'

export default function globPlatformFiles(paths = [], platform) {
  const files = []

  const ignoredPlatforms = allowedPlatforms.filter(
    nextPlatform => nextPlatform !== platform
  )

  paths.forEach((path) => {
    const foundFiles = glob.sync(path).filter(
      file => ignoredPlatforms.every(
        nextPlatform => !file.endsWith(`.${nextPlatform}.js`)
      )
    )
    files.push(...foundFiles)
  })

  return files
}
