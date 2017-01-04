import { group } from 'tape-plus'
import fs from 'fs'
import path from 'path'
import plugins from '../src/plugins'

group('plugins', (test) => {
  test('extend', (t) => {
    const expectedMethods = fs
      .readdirSync('src/plugins')
      .filter(file => file !== 'index.js')
      .map(file => path.basename(file, '.js'))
    class Mock {}
    const mock = new Mock()
    plugins.extend(mock)

    t.ok(
      expectedMethods.every(method => mock[method]),
      'Should extend instance with methods from \'plugins\' directory'
    )
  })
})
