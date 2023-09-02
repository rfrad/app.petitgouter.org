import { Injectable } from '@angular/core';
import { SvgIcon } from '../../model/utils/svg-icon.model';

const files: Map<SvgIcon, string> = new Map([
  [ SvgIcon.login, 'assets/icons/login.svg#img' ],
  [ SvgIcon.logout, 'assets/icons/logout.svg#img' ],
  [ SvgIcon.mainLogo, 'assets/icons/mainLogo.svg#img' ],
]);

@Injectable({
  providedIn: 'root'
})
export class SvgIconService {

  constructor() { }

  getSvgFileFor(icon: SvgIcon): string {
    return files.get(icon)!;
  }
}
