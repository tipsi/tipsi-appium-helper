import fs from 'fs'
import path from 'path'
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
  desiredCapabilities: env.DESIRED_CAPABILITIES,
  driverConfig: env.DRIVER_CONFIG,
  testsGlob: env.TESTS_GLOB,
  ignoreGlob: env.IGNORE_GLOB,
  noReset: env.NO_RESET,
  fullReset: env.FULL_RESET,
  automationName: env.AUTOMATION_NAME,
  imgur: env.IMGUR_CLIENT_ID,
  rcFile: env.RC_FILE,
  register: env.REGISTER,
  tapeInit: env.TAPE_INIT,
}

const predefined = {
  appiumHost: '0.0.0.0',
  appiumPort: '4723',
  runner: 'tape',
  testsGlob: '__tests__/*_test_*.js',
  rcFile: '.appiumhelperrc',
}

export function webDriverConfig(configFilePath) {
  if (configFilePath) {
    const configPath = path.resolve(configFilePath)
    if (!fs.existsSync(configPath)) {
      throw new Error(`${configPath} file is not exist...`)
    }

    try {
      const file = fs.readFileSync(configPath)
      const config = JSON.parse(file)
      return { ...config }
    } catch (error) {
      throw new Error(`Unable to parse ${filename} file`)
    }
  }

  return {}
}

export default function configure(options = {}) {
  const testrc = readTestRC(
    environment.rcFile || options.rcFile || predefined.rcFile,
    environment.platformName || options.platformName
  )

  const driverConfig = webDriverConfig(environment.driverConfig || options.driverConfig)

  return defaults(
    environment,
    options,
    testrc,
    driverConfig,
    predefined
  )
}
