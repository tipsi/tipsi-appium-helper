import runTapeTests from './tape'

export default function runTests(options) {
  if (options.runner === 'tape') {
    return runTapeTests({
      paths: [options.testsGlob],
      ignore: options.ignoreGlob,
    })
  }
  throw new Error(`Runner for "${options.runner}" is not supported (supported runners: tape)`)
}
