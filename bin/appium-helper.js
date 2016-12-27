#!/usr/bin/env node

/* eslint no-var: 0 vars-on-top: 0 */
var pkg = require('../package.json')
var program = require('commander')

program
  .version(pkg.version)
  .option('-p, --platform [type]', 'Platform name')
  .option('-g, --glob [path]', 'glob path for tests files')
  .option('-a, --app [path]', 'path to application file')
  .option('-D, --device-name', 'device name')
  .option('-P, --platform-version', 'platform version')
  .option('-A, --automation-name', 'automation name')
  .option('-N, --no-reset', 'no reset')
  .option('-r, --rcfile [name]', 'rc file name (default .testrc)')
  .parse(process.argv)

require('babel-polyfill')
require('babel-register')({
  ignore: /node_modules\/(?!tipsi_appium)/,
})

var configire = require('../src/core/configuration').default
var run = require('../src/run').default

const options = {
  testsGlob: program.glob,
  appPath: program.app,
  platformName: program.platform,
  deviceName: program.deviceName,
  platformVersion: program.platformVersion,
  automationName: program.automationName,
  noReset: program.noReset,
  rcFile: program.rcfile,
}

const config = configire(options)

run(config)
