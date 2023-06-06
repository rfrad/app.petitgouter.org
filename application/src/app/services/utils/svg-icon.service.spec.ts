import { TestBed } from '@angular/core/testing';
import { SvgIcon } from 'src/app/model/utils/svg-icon.model';

import { SvgIconService } from './svg-icon.service';

describe('SvgIconService', () => {
  let service: SvgIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvgIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  for(let icon in SvgIcon) {
    const svgIcon: SvgIcon = <SvgIcon>icon;
    it(`should have a defined file for ${svgIcon}`, () => {
      expect(service.getSvgFileFor(svgIcon)).toBeDefined();
    });
  }

  [
    { icon: SvgIcon.login, expectedFile: 'assets/icons/login.svg#img' },
    { icon: SvgIcon.logout, expectedFile: 'assets/icons/logout.svg#img' }
  ].forEach(scenario => {
    it(`should link icon ${scenario.icon} to file ${scenario.expectedFile}`, () => {
      expect(service.getSvgFileFor(scenario.icon)).toEqual(scenario.expectedFile);
    });
  });
});
