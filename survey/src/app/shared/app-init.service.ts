import { Injectable } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {
  constructor(private oauthService: OAuthService) {}

  Init() {
    return new Promise<void>((resolve, reject) => {
      this.oauthService.configure(environment);
      this.oauthService.tokenValidationHandler = new JwksValidationHandler();
      this.oauthService.loadDiscoveryDocumentAndLogin();
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
}
