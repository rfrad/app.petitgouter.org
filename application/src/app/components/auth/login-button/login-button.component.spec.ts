import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SvgIconComponent } from '../../utils/svg-icon/svg-icon.component';
 
import { LoginButtonComponent } from './login-button.component';
import { AuthenticationService } from '../../../services/authentication.service';

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
        { provide: AuthenticationService, useValue: { loginWithRedirect: () => {} }}
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
