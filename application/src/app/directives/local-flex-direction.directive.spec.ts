import { Component } from '@angular/core';
import { LocalFlexDirectionDirective } from './local-flex-direction.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

describe('LocalFlexDirectionDirective', () => {
  @Component({
    template: '<div appLocalFlexDirection></div>'
  })
  class Wrapper {}

  const translateServiceMock = {
    onLangChange: new BehaviorSubject({ 
      translations: { "language:direction": "vertical" }
    })
  };

  let fixture: ComponentFixture<Wrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: TranslateService, useValue: translateServiceMock },
      ],
      declarations: [
        Wrapper,
        LocalFlexDirectionDirective
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(Wrapper);
    fixture.detectChanges();
  });

  it('should have the default class when initilised', () => {
    expect(fixture.nativeElement.querySelector('div').classList).toContain('vertical');
  });

  it('should have updated the class when language direction has changed', () => {
    translateServiceMock.onLangChange.next({
      translations: { "language:direction": "horizontal" }
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div').classList).not.toContain('vertical');
    expect(fixture.nativeElement.querySelector('div').classList).toContain('horizontal');
  });
});
