import fs from 'fs'
import defaults from 'lodash/defaults'
import allowedPlatforms from '../constants/allowedPlatforms'

const { env } = process

function readTestRC(filename, platform) {
  if (!fs.existsSync(filename)) {
    return {}
  }
  try {
    const file = fs.readFileSync(filename)
    const config = JSON.parse(file)
    const platformConfig = config[platform] || {}
    allowedPlatforms.forEach((item) => { delete config[item] })
    return { ...config, ...platformConfig }
  } catch (error) {
    throw new Error(`Unable to parse ${filename} file`)
  }
}

const environment = {
  appiumHost: env.APPIUM_HOST,
  appiumPort: env.APPIUM_PORT,
  runner: env.RUNNER,
  deviceName: env.DEVICE_NAME,
  platformName: env.PLATFORM_NAME,
  platformVersion: env.PLATFORM_VERSION,
  iOSDeviceName: env.IOS_DEVICE_NAME,
  iOSPatformVersion: env.IOS_PLATFORM_VERSION,
  androidDeviceName: env.ANDROID_DEVICE_NAME,
  androidPlatformVersion: env.ANDROID_PLATFORM_VERSION,
  appPath: env.APP_PATH,
  testsGlob: env.TESTS_GLOB,
  ignoreGlob: env.IGNORE_GLOB,
  noReset: env.NO_RESET,
  fullReset: env.FULL_RESET,
  automationName: env.AUTOMATION_NAME,
  imgur: env.IMGUR_CLIENT_ID,
  rcFile: env.RC_FILE,
  register: env.REGISTER,
}

const predefined = {
  appiumHost: '0.0.0.0',
  appiumPort: '4723',
  runner: 'tape',
  testsGlob: '__tests__/*_test_*.js',
  rcFile: '.appiumhelperrc',
}

export default function configure(options = {}) {
  const testrc = readTestRC(
    environment.rcFile || options.rcFile || predefined.rcFile,
    environment.platformName || options.platformName
  )

  return defaults(
    environment,
    options,
    testrc,
    predefined
  )
}
