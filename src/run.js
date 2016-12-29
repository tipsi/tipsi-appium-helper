import path from 'path'
import findAndroidDevice from './core/find-android-device'
import findiOSDevice from './core/find-ios-device'
import appiumIsRunning from './core/appium-is-running'
import allowedPlatforms from './constants/allowedPlatforms'
import runTests from './runners'
import helper from './helper'

/* eslint no-console: 0, no-param-reassign: 0*/
export default async function run(config) {
  // Check Appium
  await appiumIsRunning(
    config.appiumHost,
    config.appiumPort
  )
  console.log(`Appium is running on: ${config.appiumHost}:${config.appiumPort}`)

  // Check Platform Name
  if (!config.platformName) {
    throw new Error('Config: platformName is not specified')
  }
  if (!allowedPlatforms.includes(config.platformName)) {
    throw new Error(`Config: platformName should be one of: ${allowedPlatforms}`)
  }

  // Check APP file
  if (!config.appPath) {
    throw new Error('Config: appPath is not specified')
  }
  // Resolve APP file
  config.appPath = path.resolve(config.appPath)

  // Check Device name and Platform version
  if (config.platformName === 'android') {
    config.deviceName = config.androidDeviceName || config.deviceName
    config.platformVersion = config.androidPlatformVersion || config.platformVersion
    const deviceNotSpecified = !config.deviceName || !config.platformVersion
    if (deviceNotSpecified) {
      const device = await findAndroidDevice()
      console.log(`Found next Android device: ${device.type} (${device.id}), version: ${device.version}`)
      config.deviceName = device.id
      config.platformVersion = device.version
    }
  }
  if (config.platformName === 'ios') {
    const device = await findiOSDevice(
      config.iOSDeviceName || config.deviceName,
      config.iOSPlatformVersion || config.platformVersion
    )
    console.log(`Found next iOS device: ${device.type} (${device.id}), version: ${device.version}`)
    config.deviceName = device.type
    config.platformVersion = device.version
  }

  // Initialize Helper
  await helper.init(config)
  // Run Tape tests
  await runTests(config)
  // Close Helper
  await helper.release()
}
