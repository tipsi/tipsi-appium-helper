import fs from 'fs'
import defaults from 'lodash/defaults'

const { env } = process

const RC_FILE = '.testrc'

function readTestRC(filename) {
  if (!fs.existsSync(filename)) {
    return {}
  }
  try {
    return JSON.parse(fs.readFileSync(filename))
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
  noReset: !!env.NO_RESET,
  automationName: env.AUTOMATION_NAME,
  imgur: env.IMGUR_CLIENT_ID,
  pastebin: env.PASTEBIN_DEV_KEY,
}

const predefined = {
  appiumHost: '0.0.0.0',
  appiumPort: '4723',
  runner: 'tape',
  testsGlob: '__tests__/*_test_*.js',
}

const testrc = readTestRC(RC_FILE)

export default defaults(
  environment,
  testrc,
  predefined
)
