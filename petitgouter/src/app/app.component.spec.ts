import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject, from } from 'rxjs';
import { AppComponent } from './app.component';
import { PopupComponent } from './components/utils/popup/popup.component';
import { Preference } from './model/preferences.model';
import { MockTranslatePipe } from './pipes/mock.pipe.spec';

describe('AppComponent', () => {
  let app: AppComponent;
  let formBuilder: FormBuilder;

  const preferencePublisher: BehaviorSubject<boolean> = new BehaviorSubject(true);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: Store, useValue: { 
          dispatch: () => {},
          select: (selector: any) => from(preferencePublisher)
        }},
        FormBuilder
      ],
      declarations: [
        AppComponent,
        MockTranslatePipe
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();
    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  for (let preference in Preference) {
    it(`should create a form field for ${preference}`, () => {
      const controls: any = app.form.controls;
      expect(controls[preference]).toBeDefined();
    });
  }

  [
    {
      pref: Preference.mandatory,
      value: true
    }, {
      pref: Preference.preferences,
      value: false
    }, {
      pref: Preference.analytics,
      value: false
    }, {
      pref: Preference.marketing,
      value: false
    }, 
  ].forEach(scenario => {
    it(`should be defaulted to ${scenario.value} for ${scenario.pref}`, () => {
      const controls: any = app.form.controls;
      expect(controls[scenario.pref].value).toEqual(scenario.value);
    });
  });

  describe('preference popup', () => {
    it('should be called when the preferences have not been set', () => {
      // Given the preferences has NOT already been set
      const popupComponent = { open: () => {} } as PopupComponent
      spyOn(popupComponent, 'open');
      app.preferencePopup = popupComponent;

      // When the preference is NOT set
      preferencePublisher.next(false)

      // Then the popup should open
      expect(popupComponent.open).toHaveBeenCalled();
    });
    
    it('should NOT be called when the preferences have been set', () => {
      // Given the preferences has already been set
      const popupComponent = { open: () => {} } as PopupComponent
      spyOn(popupComponent, 'open');
      app.preferencePopup = popupComponent;

      // When the preference is set
      preferencePublisher.next(true)

      // Then the popup should NOT open
      expect(popupComponent.open).not.toHaveBeenCalled();
    });
  });
  
});
