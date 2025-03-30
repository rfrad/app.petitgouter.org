import { TestBed } from '@angular/core/testing';

import { AuthenticatedUser, AuthenticationService } from './authentication.service';
import { AuthService } from '@auth0/auth0-angular';
import { Subject } from 'rxjs';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  let mockAuth0Service: {
    isAuthenticated$: Subject<boolean>;
    user$: Subject<AuthenticatedUser>,
    loginWithRedirect: () => any,
    logout: (_: any) => any
  }

  beforeEach(() => {
    mockAuth0Service = {
      isAuthenticated$: new Subject<boolean>(),
      user$: new Subject<AuthenticatedUser>(),
      loginWithRedirect: () => {},
      logout: () => {}
    }

    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: mockAuth0Service
        }
      ]
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isAuthenticated$', () => {
    [ true, false, null, undefined ].forEach(scenario => {
      it(`should return as per Auth0Service when value is ${scenario}`, done => {
        // Given the provider has an authentication status
        const currentAuth = scenario as boolean;

        service.isAuthenticated$.subscribe(isAuthenticated => {
          // Then it should be as per the Auth0Service
          expect(isAuthenticated).toEqual(currentAuth);
          done();
        })
        // When the service is requested
        mockAuth0Service.isAuthenticated$.next(currentAuth);
      });
    });
  });

  describe('user$', () => {
    [
      {
        description: 'undefined'
      },
      {
        description: 'empty object',
        user: {}
      },
      {
        description: 'full object',
        user: {
          name: 'HARRY',
          surname: 'POTTER',
          address: {
            number: 4,
            street: 'Privet Drive',
            town: 'Little Whinging'
          }
        }
      }
    ].forEach(scenario => {
      it(`should return as per Auth0Service when value is ${scenario.description}`, done => {
        // Given the provider has an authenticated user
        const user = scenario.user as AuthenticatedUser;

        service.user$.subscribe(authenticatedUser => {
          // Then it should be as per the Auth0Service
          expect(authenticatedUser).toEqual(user);
          done();
        })
        // When the service is requested
        mockAuth0Service.user$.next(user);
      });
    });
  });

  describe('loginWithRedirect()', () => {
    it('should call the AuthService method', () => {
      // Given the AuthService is known
      const authService = TestBed.inject(AuthService);
      spyOn(authService, 'loginWithRedirect');

      // When calling wraping service
      service.loginWithRedirect();

      // Then is should call inner service
      expect(authService.loginWithRedirect).toHaveBeenCalledTimes(1);
    });
  });

  describe('logout()', () => {
    it('should call the AuthService method', () => {
      // Given the AuthService is known
      const authService = TestBed.inject(AuthService);
      spyOn(authService, 'logout');

      // When calling wraping service
      service.logout({ when: 'NOW', who: 'HARRY' });

      // Then is should call inner service
      expect(authService.logout).toHaveBeenCalledTimes(1);
      expect(authService.logout).toHaveBeenCalledWith(<any>{ when: 'NOW', who: 'HARRY' });
    });
  });
});
