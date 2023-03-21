import React, {
    ReactNode,
    useState,
    useEffect,
    createContext,
    useContext,
} from 'react';
import {
    usePermissions,
    IPermissionObj,
} from '../apiHooks/selectorInfo/usePermissions';
import { IPermission } from '../types/permissions';
// import { useStyles } from './AuthStyles';
// V5
// import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator } from 'react-native-paper';

interface IPermissionProps {
    account?: {
        name: string;
        email: string;
    };
    children: ReactNode;
    bearerToken?: string;
    getVitalToken?: () => string;
}

interface IPermissionContext extends IPermissionObj {
    hasPermissions: (neededPermissions?: IPermission[]) => boolean;
    bearerToken?: string;
    vitalToken?: string;
}

export const PermissionsContext = createContext<IPermissionContext>({
    permissions: {},
    hasPermissions: () => false,
});

export default function PermissionsProvider({
    account,
    children,
    bearerToken,
    getVitalToken,
}: IPermissionProps) {
    // const classes = useStyles();
    const { t } = useTranslation();
    const [permissionsObj, setPermissionsObj] = useState<IPermissionObj>();
    const { get } = usePermissions();
    useEffect(() => {
        //console.log('bearerToken inside permissions context: ', bearerToken);
        if (!permissionsObj) {
            try {
                get().then(res => {
                    let response = res;
                    //console.log('no permissions object. calling permissions, response: ', response);
                    
                    setPermissionsObj(response);
                    //console.log('permissionsObj was set to: ', permissionsObj);

                }
                    
                    );
            } catch (e) {
                setPermissionsObj({ permissions: {} });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bearerToken]);
    const hasPermissions = (neededPermissions?: IPermission[]) => {
        const { permissions }: { permissions?: any } = permissionsObj || {
            permissions: [],
        };
        if (!neededPermissions || neededPermissions.length === 0) return true;
        if (permissions) {
            return neededPermissions.reduce(
                (acc: boolean, value: IPermission) => {
                    return acc || permissions ? permissions[value] : false;
                },
                false
            );
        }
        return false;
    };
    if (!permissionsObj) {
        console.log('no permissions object');
        // return (
        //     <ActivityIndicator animating= {true} />
        // );
    }
    return (
        <PermissionsContext.Provider
            value={{
                ...permissionsObj,
                hasPermissions,
                bearerToken,
                vitalToken: getVitalToken ? getVitalToken() : undefined,
            }}
        >
            {children}
        </PermissionsContext.Provider>
    );
}

export const usePermissionsContext = () => useContext(PermissionsContext);
