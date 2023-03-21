import * as Keychain from 'react-native-keychain';

export const useSecureStorage = () => {
  const getSecureItem = async (key: string): Promise<any> => {
    const credentials = await Keychain.getGenericPassword({
      service: key,
    });
    if (credentials) {
      return JSON.parse(credentials.password);
    }
    return null;
  };

  const setSecureItem = async (
    key: string,
    value: any,
    secure: boolean,
  ): Promise<void> => {
    const supportedBiometryType = await Keychain.getSupportedBiometryType();
    await Keychain.setGenericPassword(key, JSON.stringify(value), {
      service: key,
      accessControl:
        supportedBiometryType && secure
          ? Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE
          : undefined,
      accessible: secure
        ? Keychain.ACCESSIBLE.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY
        : undefined,
    });
  };

  const removeSecureItem = async (key: string) => {
    await Keychain.resetGenericPassword({
      service: key,
    });
  };

  return { getSecureItem, setSecureItem, removeSecureItem };
};
