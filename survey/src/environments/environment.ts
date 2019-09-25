export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000',

  // Url of the Identity Provider
  issuer: 'http://localhost:5000',

  // URL of the SPA to redirect the user to after login
  redirectUri: 'http://localhost:4200/signin-oidc',

  // The SPA's id. The SPA is registered with this id at the auth-server
  clientId: 'ComData.Survey',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'profile openid ComData.SAS.BI.Metadata.API',
  // AuthConfig: {

  //   issuer: 'http://localhost:5000',

  //   redirectUri: 'http://localhost:4200/signin-oidc',

  //   postLogoutRedirectUri: 'http://localhost:4200',

  //   clientId: 'ComData.Survey',

  //   scope: 'profile openid ComData.SAS.BI.Metadata.API',
  //   disablePKCE: true,
  //   requireHttps: false
  // }

};

