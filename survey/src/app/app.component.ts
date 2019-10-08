import { Component } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private oauthService: OAuthService) {
   
  }

  ngOnInit() {
    this.getClaims()
  }

  public login() {
    this.oauthService.initImplicitFlow();
  }

  public logoff() {
    this.oauthService.logOut();
  }

  public get name() {
    let token = this.oauthService.getAccessToken();
    let claims = JSON.parse(atob(token.split('.')[1]));
    if (!claims) return null;
    return claims;
  }

  getClaims() {
    let data = this.name;
    return data;
  }

}
