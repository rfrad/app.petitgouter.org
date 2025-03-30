import { Component } from '@angular/core';
import { SvgIcon } from '../../../model/utils/svg-icon.model';
import { environment } from '../../../../environments/environment';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'pg-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent {
  SvgIcon = SvgIcon
  env = environment;
  
  constructor(
    readonly auth: AuthenticationService
  ) { }

}
