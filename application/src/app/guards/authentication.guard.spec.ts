import { TestBed } from '@angular/core/testing';

import { AuthenticationGuard } from './authentication.guard';
import { AuthenticationService } from '../services/authentication.service';
import { Observable, Subject } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;
  let mockAuthService : {
    isAuthenticated$: Subject<boolean>,
    loginWithRedirect: () => any
  }

  beforeEach(() => {
    mockAuthService = {
      isAuthenticated$: new Subject<boolean>(),
      loginWithRedirect: () => {}
    };

    TestBed.configureTestingModule({
      providers: [
        { 
          provide: AuthenticationService,
          useValue: mockAuthService
        }
      ]
    });
    guard = TestBed.inject(AuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true when the user is authenticated', done => {
    // Given the auth service is available
    const authService = TestBed.inject(AuthenticationService);
    spyOn(authService, 'loginWithRedirect');

    (guard.canActivate(
      {} as ActivatedRouteSnapshot, 
      {} as RouterStateSnapshot
    ) as Observable<boolean | UrlTree>).subscribe(loggedIn => {
      // Then it should return true
      expect(loggedIn).toBeTrue();
      expect(authService.loginWithRedirect).not.toHaveBeenCalled();
      done();
    });

    // When the user is logged in
    mockAuthService.isAuthenticated$.next(true);
  });

  it('should return false and redirect to login when the user is NOT authenticated', done => {
    // Given the auth service is available
    const authService = TestBed.inject(AuthenticationService);
    spyOn(authService, 'loginWithRedirect');

    (guard.canActivate(
      {} as ActivatedRouteSnapshot, 
      {} as RouterStateSnapshot
    ) as Observable<boolean | UrlTree>).subscribe(loggedIn => {
      // Then it should return false
      expect(loggedIn).toBeFalse();
      // Then it should be redirected to login
      expect(authService.loginWithRedirect).toHaveBeenCalledTimes(1);
      done();
    });

    // When the user is NOT logged in
    mockAuthService.isAuthenticated$.next(false);
  });
});
