import qs from 'query-string';
import useFetchDefaultOptions from '../../hooks/useFetchDefaultOptions';
import { apiGateWayEndpoint } from '../config';

export function useAvailableJobs(vitalToken: string) {
  const { abort, error, loading, get } = useFetchDefaultOptions(
    `${apiGateWayEndpoint}/api/v2/companyAvailability`, {vitalToken}
);

    return {
      abort,
      error,
      loading,
      getJobs: async (props: any) => {
          const queryString = await qs.stringify(props, { encode: false });
         // console.log("querystring ", queryString)
          const response = await get('?' + queryString);
          return response;
      },
  };
}

export function useJobDetails(vitalToken: string) {
  const { abort, error, loading, post } = useFetchDefaultOptions(
    `${apiGateWayEndpoint}/api/v2/companyAvailability/create`, {vitalToken}
   
);

    return {
      abort,
      error,
      loading,
      acceptJob: async (props: any) => {
          const queryString = await qs.stringify(props, { encode: false });
         // console.log("querystring ", queryString)
          const response = await post('?' + queryString);
          return response;
      },
  };
}
export function useCancelCodes(vitalToken: string) {
  const { abort, error, loading, post } = useFetchDefaultOptions(
    `${apiGateWayEndpoint}/api/v2/cancelCode`, {vitalToken}
   
);

    return {
      abort,
      error,
      loading,
      getCancelCodes: async (props: any) => {
          const queryString = await qs.stringify(props, { encode: false });
         // console.log("querystring ", queryString)
          const response = await post('?' + queryString);
          return response;
      },
  };
}
