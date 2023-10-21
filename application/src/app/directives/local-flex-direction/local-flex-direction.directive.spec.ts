import { Component } from '@angular/core';
import { LocalFlexDirectionDirective } from './local-flex-direction.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

describe('LocalFlexDirectionDirective', () => {
  @Component({
    template: '<div pgLocalFlexDirection></div>'
  })
  class Wrapper {}

  const translateServiceMock = {
    onLangChange: new BehaviorSubject({ 
      translations: { "language:direction": "flat" }
    })
  };

  let fixture: ComponentFixture<Wrapper>;

  beforeEach(async () => {
    translateServiceMock.onLangChange.next({ 
      translations: { "language:direction": "vertical" }
    });
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
    expect(fixture.nativeElement.querySelector('div').classList).toContain('flex-vertical');
  });

  it('should have updated the class when language direction has changed', () => {
    translateServiceMock.onLangChange.next({
      translations: { "language:direction": "horizontal" }
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div').classList).not.toContain('flex-vertical');
    expect(fixture.nativeElement.querySelector('div').classList).toContain('flex-horizontal');
  });

  it('should use the default left-to-right when no language:direction is provided', () => {
    translateServiceMock.onLangChange.next({
      translations: <any>{}
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div').classList).not.toContain('flex-vertical');
    expect(fixture.nativeElement.querySelector('div').classList).not.toContain('flex-horizontal');
    expect(fixture.nativeElement.querySelector('div').classList).toContain('flex-left-to-right');
  });

  it('should use the default left-to-right when no translations is provided', () => {
    translateServiceMock.onLangChange.next(<any>{});
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div').classList).not.toContain('flex-vertical');
    expect(fixture.nativeElement.querySelector('div').classList).not.toContain('flex-horizontal');
    expect(fixture.nativeElement.querySelector('div').classList).toContain('flex-left-to-right');
  });
});
