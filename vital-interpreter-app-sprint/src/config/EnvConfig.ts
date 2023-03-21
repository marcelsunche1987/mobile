import {REACT_APP_API_URL} from '@env';

export class ApiConfig {
    static get IsMockEnabled(): Boolean {
        switch (process.env.REACT_APP_ENV) {
            case 'local':
                // eslint-disable-next-line eqeqeq
                return typeof process.env.REACT_APP_MOCKS_ENABLED ===
                    'undefined' || !process.env.REACT_APP_MOCKS_ENABLED
                    ? true
                    : process.env.REACT_APP_MOCKS_ENABLED == 'true';
            case 'dev':
                // eslint-disable-next-line eqeqeq
                return typeof process.env.REACT_APP_MOCKS_ENABLED ===
                    'undefined' || !process.env.REACT_APP_MOCKS_ENABLED
                    ? false
                    : process.env.REACT_APP_MOCKS_ENABLED == 'true';
            default:
                return false;
        }
    }

    static get Url(): string | undefined {
        return REACT_APP_API_URL;
    }

    static get AuthInfo(): {
        authority: string;
        clientId: string;
        vitalScope: string;
    } {
        return {
            authority: process.env.REACT_APP_API_AUTHORITY || '',
            clientId: process.env.REACT_APP_API_CLIENT_ID || '',
            vitalScope: process.env.REACT_APP_API_VITAL_SCOPE || '',
        };
    }
}
