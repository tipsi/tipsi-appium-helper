#!/usr/bin/env node

require('babel-polyfill')
require('babel-register')({
  ignore: /node_modules\/(?!tipsi_appium)/,
})

/* eslint no-var: 0 vars-on-top: 0 */
var config = require('../src/core/configuration').default
var run = require('../src/run').default

run(config)
