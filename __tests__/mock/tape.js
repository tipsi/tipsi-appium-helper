export default {
  createStream() {
    return this
  },
  pipe() {
    return this
  },
  onFinish(callback) {
    callback(true)
  },
}
