import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'CSP',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44386/',
    redirectUri: baseUrl,
    clientId: 'CSP_App',
    responseType: 'code',
    scope: 'offline_access CSP',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://localhost:44386',
      rootNamespace: 'CSP',
    },
  },
} as Environment;
