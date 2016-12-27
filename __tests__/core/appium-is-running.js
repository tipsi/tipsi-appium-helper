import { group } from 'tape-plus'
import nock from 'nock'
import appiumIsRunning from '../../src/core/appium-is-running'

group('appium-is-running', (test) => {
  test('throw', async (t) => {
    try {
      await appiumIsRunning('localhost', 9999)
      t.fail('Should not resolve promise on bad host and port')
    } catch (error) {
      t.pass('Should reject promise on bad host and port')
    }
  })

  test('found', async (t) => {
    nock('http://localhost:3000').get('/wd/hub/status').reply(200)
    try {
      await appiumIsRunning('localhost', 3000)
      t.pass('Should find appium server')
    } catch (error) {
      t.fail('Should find appium server by passed host and port')
    }
    nock.cleanAll()
  })
})
