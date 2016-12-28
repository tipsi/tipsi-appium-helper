import { group } from 'tape-plus'
import path from 'path'
import pmock from 'pmock'
import clearRequire from 'clear-require'
import defaultConfig from '../mock/default-config'

group('configuration', (test) => {
  const configure = (options) => {
    clearRequire('../../src/core/configuration')
    return require('../../src/core/configuration').default(options)
  }

  test('default', (t) => {
    const result = configure()

    t.deepLooseEqual(
      result,
      defaultConfig,
      'Result should contain default configuration'
    )
  })

  test('enviroment', (t) => {
    const enviromentConfig = {
      deviceName: 'iPhone 7',
      platformName: 'iOS',
      platformVersion: '10.2',
    }
    const env = pmock.env({
      DEVICE_NAME: enviromentConfig.deviceName,
      PLATFORM_NAME: enviromentConfig.platformName,
      PLATFORM_VERSION: enviromentConfig.platformVersion,
    })
    const expectedResult = {
      ...defaultConfig,
      ...enviromentConfig,
    }
    const result = configure()

    t.same(
      result,
      expectedResult,
      'Result should contain values from environment'
    )

    env.reset()
  })

  test('options', (t) => {
    const optionsConfig = {
      testsGlob: './01_test_a.js',
      appPath: './app.apk',
      noReset: true,
    }
    const expectedResult = {
      ...defaultConfig,
      ...optionsConfig,
    }
    const result = configure(optionsConfig)

    t.same(
      result,
      expectedResult,
      'Result should contain values from passed options'
    )
  })

  test('file', (t) => {
    const pathToRCFile = path.resolve('__tests__/mock/.appiumhelperrc')
    const baseConfig = {
      ...defaultConfig,
      appiumHost: '192.168.10.10',
      appiumPort: '9999',
      rcFile: pathToRCFile,
    }
    const iOSExpectedConfig = {
      ...baseConfig,
      platformName: 'ios',
      appPath: './ios/application.app',
    }
    const androidExpectedConfig = {
      ...baseConfig,
      platformName: 'android',
      appPath: './android/application.apk',
    }
    const iOSResult = configure({
      platformName: 'ios',
      rcFile: pathToRCFile,
    })
    const androidResult = configure({
      platformName: 'android',
      rcFile: pathToRCFile,
    })

    t.same(
      iOSResult,
      iOSExpectedConfig,
      'Result should contain values from file and use iOS specific values'
    )
    t.same(
      androidResult,
      androidExpectedConfig,
      'Result should contain values from file and use Android specific values'
    )
  })

  test('priority', (t) => {
    const enviromentConfig = {
      appiumHost: '1.1.1.1',
    }
    const env = pmock.env({
      APPIUM_HOST: enviromentConfig.appiumHost,
    })
    const pathToRCFile = path.resolve('__tests__/mock/.appiumhelperrc')
    const options = {
      appiumHost: '2.2.2.2',
      appiumPort: '2222',
      rcFile: pathToRCFile,
    }
    const expectedResult = {
      ...defaultConfig,
      ...options,
      ...enviromentConfig,
    }
    const result = configure(options)

    t.same(
      result,
      expectedResult,
      'Result should contain values in the following priority: default -> file -> options -> enviroment'
    )

    env.reset()
  })
})
