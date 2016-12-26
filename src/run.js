import path from 'path'
import findAndroidDevice from './core/find-android-device'
import findiOSDevice from './core/find-ios-device'
import appiumIsRunning from './core/appium-is-running'
import runTests from './runners'
import helper from './helper'

const allowedPlatformNames = ['ios', 'android']

/* eslint no-console: 0 no-param-reassign: 0*/
export default async function run(config) {
  process.on('SIGINT', async () => {
    // Close Helper
    await helper.release()
    process.exit()
  })

  try {
    // Check Appium
    await appiumIsRunning(
      config.appiumHost,
      config.appiumPort
    )
    console.log(`Appium is running on: ${config.appiumHost}:${config.appiumPort}`)

    // Check Platform Name
    if (!config.platformName) {
      console.log('Config: platformName is not specified')
      return
    }
    if (!allowedPlatformNames.includes(config.platformName)) {
      console.log(`Config: platformName should be one of: ${allowedPlatformNames}`)
      return
    }

    // Check APP file
    if (!config.appPath) {
      console.log('Config: appPath is not specified')
      return
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
        console.log(`Found next Android device: ${device.id}, version: ${device.version}`)
        config.deviceName = device.id
        config.platformVersion = device.version
      }
    }
    if (config.platformName === 'ios') {
      const device = await findiOSDevice(
        config.iOSDeviceName || config.deviceName,
        config.iOSPlatformVersion || config.platformVersion
      )
      console.log(`Found next iOS device: ${device.type}, version: ${device.version}`)
      config.deviceName = device.type
      config.platformVersion = device.version
    }

    // Initialize Helper
    await helper.init(config)

    // Run Tape tests
    await runTests(config)

    // Close Helper
    await helper.release()
  } catch (error) {
    console.log('Error while executing tests:')
    console.log(error.message)
    console.log('Stack:')
    console.log(error.stack)

    // Close Helper
    await helper.release()
    // Exit with failure code
    process.exit(1)
  }
}
