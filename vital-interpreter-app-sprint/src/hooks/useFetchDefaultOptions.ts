import useFetch, { CachePolicies, IncomingOptions } from 'use-http';
import * as constants from '../constants'
import { useAuth } from '../context/AuthenticatedContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useFetchDefaultOptions(
    url: string,
    options?: IncomingOptions
) {
    const { authState } = useAuth(); 



    // console.log('current endpoint', url);
    // console.log('incoming options: ', options);
    // console.log('authentication: ', authState.authentication);
    return useFetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authState.authentication?.accessToken}`,
            
        },
        redirect: 'follow',
        cachePolicy: CachePolicies.NO_CACHE,
        ...options, 
    });
}