# Tipsi Appium Helper

[![npm version](https://img.shields.io/npm/v/tipsi-appium-helper.svg?style=flat-square)](https://www.npmjs.com/package/tipsi-appium-helper)
[![build status](https://img.shields.io/travis/tipsi/tipsi-appium-helper/master.svg?style=flat-square)](https://travis-ci.org/tipsi/tipsi-appium-helper)

**Almost zero config helper to run tests with Appium**

### Installation

```sh
npm i tipsi-appium-helper --save-dev
```

### Usage

```sh
Usage: appium-helper [options]

Options:

  -h, --help                        output usage information
  -V, --version                     output the version number
  -p, --platform [type]             platform name
  -g, --glob [path]                 glob path for tests files
  -a, --app [path]                  path to application file
  -H, --appium-host [host]          appium host
  -P, --appium-port [port]          appium port
  -D, --device-name [name]          device name
  -V, --platform-version [version]  platform version
  -A, --automation-name [name]      automation name
  -N, --no-reset                    no reset
  -r, --rc-file [path]              path to rc file (default .appiumhelperrc)
```

### Minimal setup

1. Create your first test suite:

   ```javascript
   // ./__tests__/01_test_title.js

   import test from 'tape-async'
   import helper from 'tipsi-appium-helper'

   const { driver, idFromText } = helper

   test('Test if user can see title', async (t) => {
     const titleId = idFromText('Welcome to React Native!')
     await driver.waitForVisible(titleId, 60000)
     const title = await driver.getText(titleId)
     t.equal(title, 'Welcome to React Native!', 'Title is correct')
   })
   ```

2. Run tests (in your package.json)

   ```json
   {
     "scripts": {
       "test": "appium-helper --platform ios --glob ./__tests__/*_test_*.js --app ./example.app"
     }
   }
   ```

   Internally `appium-helper` will check if Appium process is running. After that will check if iPhone Simulator is running, if not — will start default `iPhone 6` simulator with the `latest` avialable version of iOS.

### Playground
You can run `tipsi-appium-helprer` in playgraund mode. This mode allows you to send command to `appium` via repl using `javascript` language and provides access to `helper` and `driver` instances.

To enter in this mode use `--playground` key:

```bash
appium-helper -- platform ios --playground
```

Some useful special commands are supported by all repl:
* `.clear` - resets the repl context to an empty object and clears any multi-line expression currently being input.
* `.save` - save the current repl session to a file: `> .save ./file/to/save.js`
* `.load` - load a file into the current repl session. `> .load ./file/to/load.js`
Full caoomands list you can find [here](https://nodejs.org/api/repl.html#repl_commands_and_special_keys).

Pressed `<ctrl>-C` twice to exit.

#### Payground Example

![playground](https://cloud.githubusercontent.com/assets/1177226/22211689/799da43c-e1c0-11e6-8e73-6151d8703610.gif)

#### Differences in running tests for Android

Before run tests for Android you should start Android Emulator or connect your real device to your workstation. After that just check connected device via:

```sh
❯ adb devices
List of devices attached
emulator-5554	device
```

`appium-helper` will select first connected android emulator in list.

If you want to specify an ID of android emulator you should use `--device-name` key:

```json
// package.json
{
  "scripts": {
    "test": "appium-helper --platform android --device-name emulator-5554"
  }
}
```

#### How to specify an iOS Simulator

If you want to specify an iOS Simulator you can pass `--device-name` only parameter. In that case `appium-helper` will select an iPhone Simulator with the latest available version of iOS.

If you want to specify an iOS version of Simulator you should pass `--platform-version` key too:

```sh
// package.json
{
  "scripts": {
    "test:ios": "appium-helper --platform ios --device-name 'iPhone 7 Plus' --platform-version '10.1'"
  }
}
```

### .appiumhelperrc

You can keep some config in `.appiumhelperrc` by default.

```json
{
  "testsGlob": "./__tests__/*_tests_*.js",
  "appiumHost": "0.0.0.0",
  "appiumPort": "4723"
}
```

You can define platform-specific config params:

```json
{
  "ios": {
    "appPath": "./ios/build/Build/Products/Release-iphonesimulator/example.app",
    "noReset": true
  },
  "android": {
    "appPath": "./android/app/build/outputs/apk/app-release.apk"
  }
}
```

Also you can specify a path to `./path/to/your/own/.whateveryouwantnamerc`:

```sh
appium-helper --rc-file ./__tests__/.testrc
```

### API

Coming soon…

### Demo

![appium_helper](https://cloud.githubusercontent.com/assets/1788245/21549249/fe10587c-ce01-11e6-8327-42e467efb65d.gif)

### Tests

To run unit tests you can use `npm test` command.

### License

MIT License

Copyright (c) 2016 Tipsi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
