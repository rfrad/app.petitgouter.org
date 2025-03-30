import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

type LogoutOptions = any; // This is to replicate the Lougoutoptions of Auth0
export type AuthenticatedUser = any; // This is to replicate the User of Auth0

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly isAuthenticated$: Observable<boolean> = this.auth.isAuthenticated$;
  readonly user$: Observable<AuthenticatedUser> = this.auth.user$;

  constructor(
    private auth: AuthService
  ) {}

  public loginWithRedirect(): Observable<void> {
    return this.auth.loginWithRedirect();
  }

  public logout(params: LogoutOptions): void {
    this.auth.logout(params);
  }
}
