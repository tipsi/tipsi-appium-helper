import cmp from 'semver-compare'

export default function (version) {
  return cmp(
    this.config.platformVersion,
    version
  )
}
