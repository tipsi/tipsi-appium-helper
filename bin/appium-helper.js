#!/usr/bin/env node

// Begin reading from stdin so the process does not exit.
process.stdin.resume()

/* eslint no-console: 0, no-var: 0, vars-on-top: 0 */
var pkg = require('../package.json')
var program = require('commander')
var mockRequire = require('mock-require')

program
  .version(pkg.version)
  .option('-p, --platform [type]', 'platform name')
  .option('-g, --glob [path]', 'glob path for tests files')
  .option('-a, --app [path]', 'path to application file')
  .option('-H, --appium-host [host]', 'appium host')
  .option('-P, --appium-port [port]', 'appium port')
  .option('-D, --device-name [name]', 'device name')
  .option('-V, --platform-version [version]', 'platform version')
  .option('-A, --automation-name [name]', 'automation name')
  .option('-N, --no-reset', 'no reset')
  .option('-R, --rc-file [path]', 'path to rc file (default .appiumhelperrc)')
  .option('-r, --register [file...]', 'register')
  .parse(process.argv)

require('babel-polyfill')
require('babel-register')({
  ignore: /node_modules\/(?!tipsi-appium-helper)/,
})

mockRequire('tipsi-appium-helper', require('..'))
mockRequire('tape', require('tape'))

var configire = require('../src/core/configuration').default
var register = require('../src/core/register').default
var helper = require('../src/helper').default
var run = require('../src/run').default

var options = {
  appiumHost: program.appiumHost,
  appiumPort: program.appiumPort,
  testsGlob: program.glob,
  appPath: program.app,
  platformName: program.platform,
  deviceName: program.deviceName,
  platformVersion: program.platformVersion,
  automationName: program.automationName,
  noReset: program.noReset,
  rcFile: program.rcFile,
  register: program.register,
}

var config = configire(options)

register([config.register])

run(config).catch((error) => {
  console.log('-------------------------------------')
  console.log('Error while executing tests:')
  console.log()
  console.log(error.message)
  console.log('-------------------------------------')
  console.log('Stack:')
  console.log()
  console.log(error.seleniumStack || error.stack)
  console.log('-------------------------------------')
  // Close Helper and exit with error code
  helper.release().then(() => process.exit(1))
})

process.on('SIGINT', () => {
  // Close Helper and exit withot error code
  helper.release().then(() => process.exit())
})
