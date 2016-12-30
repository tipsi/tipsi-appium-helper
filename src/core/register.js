import resolve from 'resolve'

/* eslint import/no-dynamic-require: 0 */
export default function register(modules = []) {
  modules.forEach(module => require(
    resolve.sync(module, {
      basedir: process.cwd(),
    })
  ))
}
