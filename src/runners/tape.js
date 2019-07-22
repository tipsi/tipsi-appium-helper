import path from 'path'
import tape from 'tape'
import tapDiff from 'tipsi-tap-diff'
import globPlatformFiles from '../core/glob-platform-files'

/* eslint global-require: 0 import/no-dynamic-require: 0 */
export default function runTapeTests({ paths, platform }) {
  return new Promise((resolve) => {
      // Specify tap-diff reporter
    tape.createStream()
      .pipe(tapDiff({
        bail: true,
      }))
      .pipe(process.stdout)

    const cwd = process.cwd()

    globPlatformFiles(paths, platform).forEach(
      file => require(path.resolve(cwd, file))
    )

    tape.onFinish(resolve)
  })
}
