const devices = [{
  id: 'emulator-5554',
  type: 'device',
}, {
  id: '09fd3dae05b3191e',
  type: 'device',
}]

const properties = {
  'emulator-5554': {
    'ro.product.model': 'Android SDK built for x86_64',
    'ro.build.version.release': '5.0.2',
  },
  '09fd3dae05b3191e': {
    'ro.product.model': 'Nexus 5',
    'ro.build.version.release': '6.0.1',
  },
}

export default {
  createClient() {
    return {
      listDevices() {
        return devices
      },
      getProperties(id) {
        return properties[id]
      },
    }
  },
}
