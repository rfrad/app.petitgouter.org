import { Component } from '@angular/core';
import { LocalTextDirectionDirective } from './local-text-direction.directive';
import { BehaviorSubject } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

describe('LocalTextDirectionDirective', () => {  
  @Component({
    template: '<div pgLocalTextDirection></div>'
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
        LocalTextDirectionDirective
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(Wrapper);
    fixture.detectChanges();
  });

  it('should have the default class when initilised', () => {
    expect(fixture.nativeElement.querySelector('div').classList).toContain('text-vertical');
  });

  it('should have updated the class when language direction has changed', () => {
    translateServiceMock.onLangChange.next({
      translations: { "language:direction": "horizontal" }
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div').classList).not.toContain('text-vertical');
    expect(fixture.nativeElement.querySelector('div').classList).toContain('text-horizontal');
  });

  it('should use the default left-to-right when no language:direction is provided', () => {
    translateServiceMock.onLangChange.next({
      translations: <any>{}
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div').classList).not.toContain('text-vertical');
    expect(fixture.nativeElement.querySelector('div').classList).not.toContain('text-horizontal');
    expect(fixture.nativeElement.querySelector('div').classList).toContain('text-left-to-right');
  });

  it('should use the default left-to-right when no translations is provided', () => {
    translateServiceMock.onLangChange.next(<any>{});
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div').classList).not.toContain('text-vertical');
    expect(fixture.nativeElement.querySelector('div').classList).not.toContain('text-horizontal');
    expect(fixture.nativeElement.querySelector('div').classList).toContain('text-left-to-right');
  });
});
