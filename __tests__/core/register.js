import { group } from 'tape-plus'
import clearRequire from 'clear-require'
import register from '../../src/core/register'

group('register', (test) => {
  test('files', async (t) => {
    clearRequire('../mock/register/setup')
    clearRequire('../mock/register/module')

    register([
      './__tests__/mock/register/setup',
      './__tests__/mock/register/module',
    ])

    t.ok(
      !!require.cache[require.resolve('../mock/register/setup')],
      'First file registred'
    )
    t.ok(
      !!require.cache[require.resolve('../mock/register/module')],
      'Second file registred'
    )
  })
})
