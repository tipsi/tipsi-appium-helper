import awaitRepl from 'await-repl'
import helper from '../helper'

export default function playground(options = { timeout: 120000 }) {
  return new Promise((resolve) => {
    const r = awaitRepl({
      prompt: 'playground › ',
      awaitTimeout: options.timeout,
      rejectionHandler: err => `Promise rejection: ${err}`,
    })

    Object.assign(r.context, {
      helper,
      driver: helper.driver,
    })

    r.on('exit', resolve)
  })
}
