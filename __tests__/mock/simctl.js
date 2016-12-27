const devices = {
  '8.1': [{ // eslint-disable-line quote-props
    name: 'iPhone 4s',
    udid: 'EE2E9F08-7507-493D-A412-831169DC0E6C',
    state: 'Shutdown',
    sdk: '8.1',
  }, {
    name: 'iPhone 5',
    udid: '01D4A739-E576-4716-89A0-1D8D2F616FB8',
    state: 'Shutdown',
    sdk: '8.1',
  }, {
    name: 'iPhone 5s',
    udid: 'CCA15405-1BF2-4FE9-BA04-7F1731F8BC27',
    state: 'Shutdown',
    sdk: '8.1',
  }, {
    name: 'iPhone 6',
    udid: '44282DB9-2FD5-4388-9899-3E897193D79F',
    state: 'Shutdown',
    sdk: '8.1',
  }, {
    name: 'iPhone 6 Plus',
    udid: '782001DA-B562-4063-9C8D-0B076DB8C9AA',
    state: 'Shutdown',
    sdk: '8.1',
  }, {
    name: 'iPad 2',
    udid: '129A7CE2-195F-4B40-94BF-6F53298D7501',
    state: 'Shutdown',
    sdk: '8.1',
  }, {
    name: 'iPad Retina',
    udid: 'F0C3DC79-AE98-478D-AE5A-485AED2C7B5C',
    state: 'Shutdown',
    sdk: '8.1',
  }, { name: 'iPad Air',
    udid: '2CF06B47-0765-44E3-B1FA-D54CD6BB5322',
    state: 'Shutdown',
    sdk: '8.1',
  }],
  '10.2': [{ // eslint-disable-line quote-props
    name: 'iPhone 5',
    udid: '72C380C0-77BD-4E78-B5DF-010A46CEDA69',
    state: 'Shutdown',
    sdk: '10.2',
  }, {
    name: 'iPhone 5s',
    udid: '6696BCC4-7CE2-414C-AE7E-71D1354FE900',
    state: 'Shutdown',
    sdk: '10.2',
  }, {
    name: 'appiumTest-9c46e8ae-4c83-4e05-8b3d-1d320b8a8fc1',
    udid: '775040C7-C32C-4386-9431-44EC2950C522',
    state: 'Shutdown',
    sdk: '10.2',
  }, {
    name: 'appiumTest-9e070314-179d-4009-8747-2a77159af3ea',
    udid: 'AF090243-D2EF-4B1A-982F-E8FC596CF37C',
    state: 'Shutdown',
    sdk: '10.2',
  }, {
    name: 'appiumTest-a77e4e88-060f-4227-a5fb-45f0967e62d2',
    udid: '31CD97EF-8E59-4101-88FA-C456F982FF64',
    state: 'Shutdown',
    sdk: '10.2',
  }, {
    name: 'appiumTest-b92e548d-6379-422d-8faf-0846ce502498',
    udid: '62736F36-8F3F-48C0-A45F-5A0E5A332729',
    state: 'Shutdown',
    sdk: '10.2',
  }, {
    name: 'iPhone 6',
    udid: '5792F945-881C-47E6-8D1F-9E946D5ACF85',
    state: 'Booted',
    sdk: '10.2',
  }, {
    name: 'iPhone 6 Plus',
    udid: 'CBA119F0-24D0-466C-9EB5-0693E3BB0555',
    state: 'Shutdown',
    sdk: '10.2',
  }, {
    name: 'iPhone 6s',
    udid: 'D159A349-DEDA-483F-A8B9-52B7DBE0F19D',
    state: 'Shutdown',
    sdk: '10.2',
  }, {
    name: 'iPhone 6s Plus',
    udid: '7FB65EF7-D099-4549-AC23-FD3E9B67A38C',
    state: 'Shutdown',
    sdk: '10.2',
  }, {
    name: 'iPhone 7',
    udid: '4B8A6A98-A549-41D6-AE57-79CC79932282',
    state: 'Shutdown',
    sdk: '10.2',
  }, {
    name: 'iPhone 7 Plus',
    udid: 'D51D41BA-212F-46FF-8C0C-F416CD0C731B',
    state: 'Shutdown',
    sdk: '10.2',
  }, {
    name: 'iPhone SE',
    udid: 'ACFF521B-5CA2-4802-A150-1C41E4AB4BBB',
    state: 'Shutdown',
    sdk: '10.2',
  }, {
    name: 'iPad Retina',
    udid: 'E0D5B361-DA51-47E8-88D9-F4459FF6A73B',
    state: 'Shutdown',
    sdk: '10.2',
  }, {
    name: 'iPad Air',
    udid: '3EB1CB35-DD67-4D68-BDC9-A978978139DD',
    state: 'Shutdown',
    sdk: '10.2',
  }, {
    name: 'iPad Air 2',
    udid: 'BDC1D1EC-A187-4585-8AED-19F52FBE66A6',
    state: 'Shutdown',
    sdk: '10.2',
  }, {
    name: 'iPad Pro (9.7 inch)',
    udid: 'DDD5683E-07D4-4C59-8E87-B9E34D9D29E4',
    state: 'Shutdown',
    sdk: '10.2',
  }, {
    name: 'iPad Pro (12.9 inch)',
    udid: 'C305142C-781B-4CC3-A98F-5178A09C50F4',
    state: 'Shutdown',
    sdk: '10.2',
  }],
}

export default {
  getDevices() {
    return devices
  },
}
