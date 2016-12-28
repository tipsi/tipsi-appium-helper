import { group } from 'tape-plus'
import path from 'path'
import mock from 'mock-require'
import tape from './mock/tape'

group('runners', (test) => {
  test('tape', async (t) => {
    mock('tape', tape)
    const runTests = require('../src/runners').default

    const result = await runTests({
      runner: 'tape',
      platformName: 'ios',
      testsGlob: path.resolve('__tests__/mock/glob/*_test_*.js'),
    })

    t.ok(
      result,
      'Should run tests via tape module'
    )

    mock.stop('node-simctl')
  })

  test('throw', async (t) => {
    const runTests = require('../src/runners').default

    try {
      await runTests({ runner: 'not_supported_runner' })
      t.fail('Should not resolve promise on not supported runner')
    } catch (error) {
      t.pass('Should reject promise on not supported runner')
    }
  })
})
