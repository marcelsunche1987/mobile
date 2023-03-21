export const AZURE_BASE_URL: string = 'https://login.microsoftonline.com/';
export const AZURE_TENANT_ID: string = 'd0f7f33f-8d1f-4ac0-bccd-2ecda8bf422b';
export const AZURE_CLIENT_ID: string = '779fcd48-381a-4706-b84e-6c98f7f4e773';
export const AZURE_REDIRECT_URI: string = 
  // 'http://localhost:8081';
     'msauth.com.sorenson.vital://auth/';

//   'com.sorenson.vital://oauth/redirect/';
export const AZURE_REDIRECT_LOGOUT_URI: string =
  'msauth.com.sorenson.vital://auth/logout/';
export const AZURE_ISSUER: string = `${AZURE_BASE_URL}${AZURE_TENANT_ID}`;
export const AZURE_END_SESSION_ENDPOINT: string = `${AZURE_BASE_URL}${AZURE_TENANT_ID}/saml2/`;
export const AZURE_AUTH_ENDPOINT: string = `${AZURE_BASE_URL}${AZURE_TENANT_ID}/oauth2/v2.0/authorize/`;
export const AZURE_TOKEN_ENDPOINT: string = `${AZURE_BASE_URL}${AZURE_TENANT_ID}/oauth2/v2.0/token/`;
export const AZURE_SCOPES: string[] = ['https://sorenson.indeo.net/dev_api/vital_scope', 'openid', 'profile'];
//https://sorenson.indeo.net/dev_api

export const ANDROID_TENANT_ID: string = 'd0f7f33f-8d1f-4ac0-bccd-2ecda8bf422b'
export const ANDROID_REDIRECT_URI: string = 'msauth://com.sorenson.vitalinterpreterapp/2jmj7l5rSw0yVb%2FvlWAYkK%2FYBwk%3D'
export const ANDROID_ISSUER: string = `${AZURE_BASE_URL}${ANDROID_TENANT_ID}`;
export const ANDROID_END_SESSION_ENDPOINT: string = `${AZURE_BASE_URL}${ANDROID_TENANT_ID}/saml2/`;
export const ANDROID_AUTH_ENDPOINT: string = `${AZURE_BASE_URL}${ANDROID_TENANT_ID}/oauth2/v2.0/authorize/`;
export const ANDROID_TOKEN_ENDPOINT: string = `${AZURE_BASE_URL}${ANDROID_TENANT_ID}/oauth2/v2.0/token/`;
