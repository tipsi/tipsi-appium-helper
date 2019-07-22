import { remote } from 'webdriverio'
import merge from 'lodash/merge'
import plugins from './plugins'

class Helper {
  driver = null
  config = {}

  constructor() {
    plugins.extend(this)
  }

  init = async (config) => {
    if (this.driver) {
      return
    }

    this.config = config

    const baseConfig = {
      capabilities: {
        deviceName: config.deviceName,
        platformName: config.platformName,
        platformVersion: config.platformVersion,
        app: config.appPath,
        noReset: config.noReset,
        fullReset: config.fullReset,
        automationName: config.automationName,
        newCommandTimeout: 60000,
        ...config.capabilities
      },
      path: '/wd/hub',
      hostname: config.appiumHost,
      port: +config.appiumPort,
      connectionRetryTimeout: 1200000, // 20 min,
    }

    const driverConfig = merge(baseConfig, config.driverConfigurations)

    this.driver = remote(driverConfig)
  }

  release = async () => {
    if (this.driver) {
      this.driver = null
      this.config = {}
    }
  }
}

// This is singleton
export default new Helper()
