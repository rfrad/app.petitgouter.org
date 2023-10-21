import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SvgIcon } from 'src/app/model/utils/svg-icon.model';
import { SvgIconService } from 'src/app/services/utils/svg-icon.service';

import { SvgIconComponent } from './svg-icon.component';

describe('SvgIconComponent', () => {
  @Component({
    selector: 'test-svg-icon-wrapper',
    template: '<pg-svg-icon [icon]="SvgIcon.login"></pg-svg-icon>'
  })
  class SvgIconWrapper {
    SvgIcon = SvgIcon;

    @ViewChild(SvgIconComponent)
    child: SvgIconComponent;
  }

  let component: SvgIconWrapper;
  let fixture: ComponentFixture<SvgIconWrapper>;

  const svgIconServiceMock = {
    getSvgFileFor: (icon: SvgIcon) => "MOCK_FILE"
  }

  beforeEach(async () => {
    spyOn(svgIconServiceMock, 'getSvgFileFor').and.callThrough();
    await TestBed.configureTestingModule({
      declarations: [ 
        SvgIconWrapper, 
        SvgIconComponent 
      ],
      providers: [
        { provide: SvgIconService, useValue: svgIconServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgIconWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.child).toBeTruthy();
  });

  it('should call the SvgIconService and extract file location at start up', () => {
    expect(svgIconServiceMock.getSvgFileFor).toHaveBeenCalledOnceWith(SvgIcon.login);
    expect(component.child.location).toEqual("MOCK_FILE");
  });
});
