import { group } from 'tape-plus'
import path from 'path'
import globPlatformFiles from '../../src/core/glob-platform-files'

group('glob-platform-files', (test) => {
  const filesPath = '__tests__/mock/glob'
  const glob = path.resolve(`${filesPath}/*_test_*.js`)

  test('ios', async (t) => {
    const expectedResult = [
      path.resolve(`${filesPath}/01_test_a.ios.js`),
      path.resolve(`${filesPath}/02_test_b.js`),
    ]
    const result = globPlatformFiles([glob], 'ios')
    t.same(
      result,
      expectedResult,
      'Result should contain only files with .js and ios.js suffixes'
    )
  })

  test('android', async (t) => {
    const expectedResult = [
      path.resolve(`${filesPath}/01_test_a.android.js`),
      path.resolve(`${filesPath}/02_test_b.js`),
    ]
    const result = globPlatformFiles([glob], 'android')
    t.same(
      result,
      expectedResult,
      'Result should contain only files with .js and android.js suffixes'
    )
  })
})
