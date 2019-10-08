import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private oauthService: OAuthService
  ) { }

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

  getId(){
    const id = this.getClaims().sub;
    return id;
  }
}
