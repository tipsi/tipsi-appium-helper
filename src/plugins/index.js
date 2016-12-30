import requireDirAll from 'require-dir-all'

const plugins = requireDirAll('./')

/* eslint no-param-reassign: 0 */
function extend(helper = {}) {
  Object.keys(plugins).forEach((key) => {
    const plugin = plugins[key]
    helper[key] = plugin.default.bind(helper)
  })
  helper.extend = (name, method) => {
    helper[name] = method.bind(helper)
  }
}

export default { extend }
