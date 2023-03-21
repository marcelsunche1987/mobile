import { device, waitFor, element, by } from 'detox';

describe('Application', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    // await device.reloadReactNative();
  });

  it('should have "Login" button rendered when the application launches', async () => {
    await waitFor(element(by.text('Login'))).toExist();
  });

  afterAll(async () => {
    await device.clearKeychain();
  });
});
