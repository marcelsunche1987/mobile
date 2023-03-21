import { ApiConfig } from '../../config/EnvConfig'
import useFetchDefaultOptions from '../../hooks/useFetchDefaultOptions'

export interface IPermissionObj {
    permissions: { [key: string]: boolean };
    featureFlags?: { [key: string]: boolean };
    centerCode?: string;
    centerId?: number;
    centerName?: string;
    centerDate?: string;
    firstName?: string;
    isTVI?: boolean;
    isVI?: boolean;
    lastName?: string;
    queueId?: number;
    queueName?: string;
    timeZoneCode?: string;
    userId?: number;
}

export const usePermissions = () => {
    //can potentially replace ApiConfig.Url with REACT_APP_API_URL from @env
    const { get } = useFetchDefaultOptions(
        `${ApiConfig.Url}/api/v2/permissions`
    );
    return {
        get: async (): Promise<IPermissionObj> => {
            try {
                const { permissions, featureFlags, ...props} = await get();
                //console.log(permissions);
                // console.log(featureFlags);
                return (
                    permissions && {
                        permissions: permissions.reduce(
                            (acc: any, value: string) => {
                                acc[value] = true;
                                return acc;
                            },
                            {}
                        ),
                        featureFlags: featureFlags
                            ? Array.isArray(featureFlags)
                                ? featureFlags.reduce(
                                      (
                                          acc: any,
                                          { featureName, isEnabled }: any
                                      ) => {
                                          acc[featureName] = isEnabled;
                                          return acc;
                                      },
                                      {}
                                  )
                                : featureFlags
                            : {},
                        ...props,
                    }
                );
            } catch (e) {
                return { permissions: {} };
            }
        },
    };
};
