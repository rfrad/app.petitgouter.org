import { Component } from '@angular/core';
import { LocalTextDirectionDirective } from './local-text-direction.directive';
import { BehaviorSubject } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

describe('LocalTextDirectionDirective on component without any classes', () => {  
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
      translations: { "language:direction": "VERTICAL" }
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
    expect(fixture.nativeElement.querySelector('div').classList).toContain('text-VERTICAL');
  });

  it('should have updated the class when language direction has changed', () => {
    translateServiceMock.onLangChange.next({
      translations: { "language:direction": "DIAGONAL" }
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div').classList).not.toContain('text-VERTICAL');
    expect(fixture.nativeElement.querySelector('div').classList).toContain('text-DIAGONAL');
  });

  it('should use the default left-to-right when no language:direction is provided', () => {
    translateServiceMock.onLangChange.next({
      translations: <any>{}
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div').classList).not.toContain('text-VERTICAL');
    expect(fixture.nativeElement.querySelector('div').classList).not.toContain('text-DIAGONAL');
    expect(fixture.nativeElement.querySelector('div').classList).toContain('text-left-to-right');
  });

  it('should use the default left-to-right when no translations is provided', () => {
    translateServiceMock.onLangChange.next(<any>{});
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div').classList).not.toContain('text-VERTICAL');
    expect(fixture.nativeElement.querySelector('div').classList).not.toContain('text-DIAGONAL');
    expect(fixture.nativeElement.querySelector('div').classList).toContain('text-left-to-right');
  });
});

describe('LocalTextDirectionDirective on component with other classes', () => {  
  @Component({
    template: '<div pgLocalTextDirection class="klass1 klass2"></div>'
  })
  class Wrapper2 {}

  const translateServiceMock = {
    onLangChange: new BehaviorSubject({ 
      translations: { "language:direction": "flat" }
    })
  };

  let fixture: ComponentFixture<Wrapper2>;

  beforeEach(async () => {
    translateServiceMock.onLangChange.next({ 
      translations: { "language:direction": "IN_3D" }
    });
    await TestBed.configureTestingModule({
      providers: [
        { provide: TranslateService, useValue: translateServiceMock },
      ],
      declarations: [
        Wrapper2,
        LocalTextDirectionDirective
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(Wrapper2);
    fixture.detectChanges();
  });

  it('should have the default class when initilised', () => {
    expect(fixture.nativeElement.querySelector('div').classList).toContain('klass1');
    expect(fixture.nativeElement.querySelector('div').classList).toContain('klass2');
    expect(fixture.nativeElement.querySelector('div').classList).toContain('text-IN_3D');
  });

  it('should have updated the class when language direction has changed', () => {
    translateServiceMock.onLangChange.next({
      translations: { "language:direction": "HORIZONTAL" }
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div').classList).toContain('klass1');
    expect(fixture.nativeElement.querySelector('div').classList).toContain('klass2');
    expect(fixture.nativeElement.querySelector('div').classList).not.toContain('text-IN_3D');
    expect(fixture.nativeElement.querySelector('div').classList).toContain('text-HORIZONTAL');
  });

  it('should use the default left-to-right when no language:direction is provided', () => {
    translateServiceMock.onLangChange.next({
      translations: <any>{}
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div').classList).not.toContain('text-IN_3D');
    expect(fixture.nativeElement.querySelector('div').classList).not.toContain('text-HORIZONTAL');
    expect(fixture.nativeElement.querySelector('div').classList).toContain('klass1');
    expect(fixture.nativeElement.querySelector('div').classList).toContain('klass2');
    expect(fixture.nativeElement.querySelector('div').classList).toContain('text-left-to-right');
  });

  it('should use the default left-to-right when no translations is provided', () => {
    translateServiceMock.onLangChange.next(<any>{});
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div').classList).not.toContain('text-IN_3D');
    expect(fixture.nativeElement.querySelector('div').classList).not.toContain('text-HORIZONTAL');
    expect(fixture.nativeElement.querySelector('div').classList).toContain('klass1');
    expect(fixture.nativeElement.querySelector('div').classList).toContain('klass2');
    expect(fixture.nativeElement.querySelector('div').classList).toContain('text-left-to-right');
  });
});