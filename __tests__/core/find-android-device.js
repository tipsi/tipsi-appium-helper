import { group } from 'tape-plus'
import mock from 'mock-require'
import adbkit from '../mock/adbkit'

group('find-android-device', (test) => {
  let findAndroidDevice

  test('setup', async () => {
    mock('adbkit', adbkit)
    findAndroidDevice = require('../../src/core/find-android-device').default
  })

  test('first', async (t) => {
    const expectedResult = {
      id: 'emulator-5554',
      type: 'device',
      version: '5.0.2',
    }
    const result = await findAndroidDevice()

    t.same(
      result,
      expectedResult,
      'Method should find first android device and return Android device id, type and version'
    )
  })

  test('teardown', () => {
    mock.stop('adbkit')
  })
})
