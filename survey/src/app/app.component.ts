import { Component } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private oauthService: OAuthService) {}

  public get name() {
    const token = this.oauthService.getAccessToken();
    const claims = JSON.parse(atob(token.split('.')[1]));
    if (!claims) {
      return null;
    }

    return claims;
  }

  getClaims() {
    const data = this.name;
    return data;
  }
}
