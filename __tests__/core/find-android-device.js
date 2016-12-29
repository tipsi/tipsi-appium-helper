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
      type: 'Android SDK built for x86_64',
      version: '5.0.2',
    }
    const result = await findAndroidDevice()

    t.same(
      result,
      expectedResult,
      'Method should find first Android device and return Android device id, type and version'
    )
  })

  test('id', async (t) => {
    const expectedResult = {
      id: '09fd3dae05b3191e',
      type: 'Nexus 5',
      version: '6.0.1',
    }
    const result = await findAndroidDevice('09fd3dae05b3191e')

    t.same(
      result,
      expectedResult,
      'Method should find Android device with passed id and return Android device id, type and version'
    )
  })

  test('teardown', () => {
    mock.stop('adbkit')
  })
})
