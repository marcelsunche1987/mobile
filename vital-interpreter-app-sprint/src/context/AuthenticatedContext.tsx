import React, { useState, createContext, useEffect, } from 'react';
import { Provider } from 'use-http';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AuthConfiguration,
  authorize,
  AuthorizeResult,
  EndSessionResult,
  logout,
  refresh,
} from 'react-native-app-auth';
import { useSecureStorage } from '../hooks/useSecureStorage';
import {REACT_APP_ANDROID_AUTH_ENDPOINT, REACT_APP_ANDROID_END_SESSION_ENDPOINT, REACT_APP_ANDROID_ISSUER,
  REACT_APP_ANDROID_REDIRECT_URI, REACT_APP_ANDROID_TOKEN_ENDPOINT, REACT_APP_AZURE_AUTH_ENDPOINT, REACT_APP_AZURE_END_SESSION_ENDPOINT, REACT_APP_AZURE_ISSUER,
  REACT_APP_AZURE_REDIRECT_URI, REACT_APP_AZURE_SCOPES, REACT_APP_AZURE_CLIENT_ID, REACT_APP_AZURE_TOKEN_ENDPOINT, REACT_APP_AZURE_TENANT_ID
} from '@env';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import PermissionsContext from './PermissionsContext'
import { differenceInMilliseconds } from 'date-fns';
import AzureAuth from 'react-native-azure-auth';



import jwt_decode from 'jwt-decode'


const AUTH_KEY: string = 'msauth.com.sorenson.vitalInterpreterApp.auth';
const STATUS_KEY: string = 'msauth.com.sorenson.vitalInterpreterApp.status';

// TODO: move these into a env variables

export interface AuthenticationResult {
  authenticated: boolean;
  idToken?: string;
  accessToken?: string;
}

interface IAuthState {
  authentication: AuthenticationResult | null;
  firstName?: string;
  lastName?: string;
}

interface IAuthContext {
  authState: IAuthState;
  signIn: () => void;
  signOut: () => void;
}

// Default Context
const AuthContext = createContext<IAuthContext>({
  authState: {
    authentication: null,
  },
  signIn: () => { },
  signOut: () => { },
});

const config: AuthConfiguration = {
  issuer: Platform.OS === 'ios' ? REACT_APP_AZURE_ISSUER : REACT_APP_ANDROID_ISSUER,
  clientId: REACT_APP_AZURE_CLIENT_ID,
  redirectUrl: Platform.OS === 'ios' ? REACT_APP_AZURE_REDIRECT_URI : REACT_APP_ANDROID_REDIRECT_URI,
  scopes: REACT_APP_AZURE_SCOPES,
  serviceConfiguration: {
    endSessionEndpoint: Platform.OS === 'ios' ? REACT_APP_AZURE_END_SESSION_ENDPOINT : REACT_APP_ANDROID_END_SESSION_ENDPOINT,
    authorizationEndpoint: Platform.OS === 'ios' ? REACT_APP_AZURE_AUTH_ENDPOINT : REACT_APP_ANDROID_AUTH_ENDPOINT,
    tokenEndpoint: Platform.OS === 'ios' ? REACT_APP_AZURE_TOKEN_ENDPOINT : REACT_APP_ANDROID_TOKEN_ENDPOINT,
  },
};

const azureAuth = new AzureAuth({
  clientId: REACT_APP_AZURE_CLIENT_ID,
  tenant: REACT_APP_AZURE_TENANT_ID,
  redirectUri: Platform.OS === 'ios' ? REACT_APP_AZURE_REDIRECT_URI : REACT_APP_ANDROID_REDIRECT_URI,
})

//let vitalToken: string;
let timerFun: any;

export const AuthProvider = ({ children }) => {
  // const { authenticate, signout } = useAuth();
  const { t } = useTranslation();
  const { getSecureItem, setSecureItem, removeSecureItem } = useSecureStorage();
  const [authState, setAuthState] = useState<IAuthState>({
    authentication: null,
  });
  const [bearerToken, setBearerToken] = useState<string>();
  const [sessionExpired, setSessionExpired] = useState(false);


  const resetStoredCredentials = async () => {
    await removeSecureItem(STATUS_KEY);
    await removeSecureItem(AUTH_KEY);
    await AsyncStorage.removeItem('vitalToken');
  };

  async function getVitalToken() {
    try {
      //console.log('getVitalToken running..');
      const vitalToken = await AsyncStorage.getItem('vitalToken');
      //console.log('vitalToken is: ', vitalToken);
      return vitalToken
    } catch(e){
      console.log('error fetching vitalToken from storage')
    }
    
  }

  const updateTimer = ({ exp }: any, url: string) => {
    const ttl = differenceInMilliseconds(
      new Date(exp * 1000),
      new Date()
    );
    clearInterval(timerFun);
    timerFun = setInterval(() => {

      setSessionExpired(true);
    }, ttl);
  };

  const options = {
    interceptors: {
      // every time we make an http request, this will run 1st before the request is made
      // url, path and route are supplied to the interceptor
      // request options can be modified and must be returned
      request: async ({ options }: any) => {
        const vitalToken = await getVitalToken();
        // console.log('making request.. vitalToken is: ', vitalToken);
        if (bearerToken){
          //console.log('BearerToken found, setting to: ', bearerToken);
          options.headers.Authorization = `Bearer ${bearerToken}`;
        }
        if (vitalToken) {
          console.log('vitalToken exists ', vitalToken);
          options.headers.VitalToken = vitalToken;
        }
        //TODO: The no-cache policy is not working as an interceptor at the moment, perhaps using the enum for cache policies would fix
        options.cachePolicy = options.cachePolicy || 'no-cache';
        return options;
      },
      // every time we make an http request, before getting the response back, this will run
      response: async ({ response: res }: any) => {
        //console.log('http request was made, interceptor firing. response: ', res);
        const { status } = await res;
        if (status < 400) {
          let vitalToken = await res.headers.get('VitalToken');
          await AsyncStorage.setItem('vitalToken', vitalToken);
          //console.log('vitalToken was set to: ', vitalToken);
          if (vitalToken)
            updateTimer(jwt_decode(vitalToken), res.url);
        }
       
        return res;
      },
    },
  };

  const authorize = async () => {
    
      return azureAuth.webAuth.authorize({scope: REACT_APP_AZURE_SCOPES}).then(
        async result => {
          
          await setSecureItem(AUTH_KEY, result, true);
          await setSecureItem(STATUS_KEY, true, false);
          setBearerToken(result.accessToken);
          

          return { authenticated: true, idToken: result.userId };
        },
        reason => {
          console.log('reason for authorize failure: ' + t(reason));
          return { authenticated: false };
        },
      );
    
  } 


  const authenticate = async (): Promise<AuthenticationResult> => {
    const hasEverSignedIn = await getSecureItem(STATUS_KEY);
    if (!hasEverSignedIn) {

       console.log('never signed in');
      return authorize();

    } else {

      const storedCredentials: AuthorizeResult = await getSecureItem(AUTH_KEY);

      try {
        let tokens = await azureAuth.auth.acquireTokenSilent({scope: REACT_APP_AZURE_SCOPES, userId: storedCredentials.userId,});
        if (!tokens){
          return authorize();
        }
        else {
          setBearerToken(tokens.accessToken);
          return {
            authenticated: true,
            idToken: tokens.userId,
          }
        }
      } catch (error) {
        console.log(error);
      }
      

    }
  };


  const _onLogout = () => {
    azureAuth.webAuth.clearSession({closeOnLoad: true,}).then(
      async () => {
        await resetStoredCredentials();
        setAuthState({
          authentication: null,
        });
        
      },
      //  reason => {
      //    console.log('reason for signout failure: ' + t(reason));
      async () => {
        resetStoredCredentials();
        setAuthState({
          authentication: null,
        });
      // },
       },
    );
  }


  const signIn = async () => {
    const result: any = await authenticate();
    setAuthState({
      authentication: result,
    });

    // set default authorization headers for API Calls
    axios.defaults.headers.common.Authorization = `Bearer ${result.accessToken}`;
  };
  const signOut = async () => {
    _onLogout();
  };

  useEffect(() => {
    const handleInit = async () => {
      const result = await getSecureItem(STATUS_KEY);
      return result;
    };

    handleInit().then(res => {
      if (res) {
        signIn();
      }
    });
  }, [bearerToken]);

  return (
    <Provider options={options}>
      <AuthContext.Provider value={{ authState, signIn, signOut }}>
        <PermissionsContext bearerToken={bearerToken} getVitalToken={getVitalToken}>
          {children}

        </PermissionsContext>
        {/* {children} */}

      </AuthContext.Provider>
    </Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be inside an AuthProvider with a value');
  }
  return context;
};
