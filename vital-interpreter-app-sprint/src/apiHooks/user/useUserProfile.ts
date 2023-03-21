import qs from 'query-string';
import useFetchDefaultOptions from '../../hooks/useFetchDefaultOptions';
import { apiGateWayEndpoint } from '../config';

export function useUserProfile(vitalToken: string) {
  const { abort, error, loading, get } = useFetchDefaultOptions(
    `${apiGateWayEndpoint}/api/v2/user/details`, {vitalToken}
);

    return {
      abort,
      error,
      loading,
      getProfile: async (props: any) => {
          const queryString = await qs.stringify(props, { encode: false });
          //console.log("querystring ", queryString)
          const response = await get('?' + queryString);
          return response;
      },
  };
}
export function useUserPhoto(vitalToken: string) {
  const { abort, error, loading, get } = useFetchDefaultOptions(
    `${apiGateWayEndpoint}/api/v2/user/photo`, {vitalToken}
);

    return {
      abort,
      error,
      loading,
      getPhoto: async (props: any) => {
          const queryString = await qs.stringify(props, { encode: false });
          //console.log("querystring ", queryString)
          const response = await get('?' + queryString);
          return response;
      },
  };
}
