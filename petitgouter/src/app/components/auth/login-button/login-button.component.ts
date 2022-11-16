import { Component } from '@angular/core';
import { AuthService} from '@auth0/auth0-angular';
import { SvgIcon } from '../../../model/utils/svg-icon.model';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent {
  SvgIcon = SvgIcon

  constructor(readonly auth: AuthService) { }

}
