import { group } from 'tape-plus'
import mock from 'mock-require'
import simctl from '../mock/simctl'

group('find-ios-device', (test) => {
  let findiOSDevice

  test('setup', async () => {
    mock('node-simctl', simctl)
    findiOSDevice = require('../../src/core/find-ios-device').default
  })

  test('type', async (t) => {
    const expectedResult = {
      id: '4B8A6A98-A549-41D6-AE57-79CC79932282',
      type: 'iPhone 7',
      version: '10.2',
    }
    const result = await findiOSDevice('iPhone 7')

    t.same(
      result,
      expectedResult,
      'Method should find id and last version of iOS for passed device type'
    )
  })

  test('version', async (t) => {
    const expectedResult = {
      id: '44282DB9-2FD5-4388-9899-3E897193D79F',
      type: 'iPhone 6',
      version: '8.1',
    }
    const result = await findiOSDevice(undefined, '8.1')

    t.same(
      result,
      expectedResult,
      'Method should find id and use iPhone 6 as default device type if passed only version of iOS'
    )
  })

  test('empty', async (t) => {
    const expectedResult = {
      id: '5792F945-881C-47E6-8D1F-9E946D5ACF85',
      type: 'iPhone 6',
      version: '10.2',
    }
    const result = await findiOSDevice()

    t.same(
      result,
      expectedResult,
      'Method should find iPhone 6 as device type with last version of iOS if no arguments passed'
    )
  })

  test('throw', async (t) => {
    try {
      await findiOSDevice('dummy', '777')
      t.fail('Should not resolve promise if can not find the device')
    } catch (error) {
      t.pass('Should reject promise if can not find the device')
    }
  })

  test('teardown', () => {
    mock.stop('adbkit')
  })
})
