import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SvgIconComponent } from '../../utils/svg-icon/svg-icon.component';
import { AuthService } from '@auth0/auth0-angular';

import { LoginButtonComponent } from './login-button.component';

describe('LoginButtonComponent', () => {
  let component: LoginButtonComponent;
  let fixture: ComponentFixture<LoginButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        LoginButtonComponent,
        SvgIconComponent 
      ],
      providers: [
        { provide: AuthService, useValue: { loginWithRedirect: () => {} }}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
