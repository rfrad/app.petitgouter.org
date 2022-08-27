import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject, from } from 'rxjs';
import { AppComponent } from './app.component';
import { PopupComponent } from './components/utils/popup/popup.component';
import { Preference } from './model/preferences.model';
import { MockTranslatePipe } from './pipes/mock.pipe.spec';
import { PreferencesAction } from './store/preferences/preferences.actions';

describe('AppComponent', () => {
  let app: AppComponent;
  let formBuilder: FormBuilder;
  const mockStore = { 
    dispatch: () => {},
    select: (selector: any) => from(preferencePublisher)
  };
  let dispatchSpy: jasmine.Spy;

  const preferencePublisher: BehaviorSubject<boolean> = new BehaviorSubject(true);
  beforeEach(async () => {
    dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: Store, useValue: mockStore },
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
  
  describe('saveAll()', () => {
    it('should save all the preferences as true', () => {
      // When calling the method
      app.saveAll();

      // Then is should call dispatch with all the premissions to true
      const dispatchedAction = dispatchSpy.calls.mostRecent().args[0];
      expect(dispatchedAction.type).toEqual(PreferencesAction.SAVE_PREFERENCES);
      expect(Object.keys(dispatchedAction.preferences).length).toEqual(Object.keys(Preference).length)
      for (let pref in Preference) {
        expect(dispatchedAction.preferences[pref]).toEqual(true);
      }
    });
  });
  
  describe('saveSelected()', () => {
    [
      {
        description: 'with mandatory = true',
        buildForm: () => 
          formBuilder.group({
            mandatory: [true, []],
            preferences: [false, []],
            analytics: [false, []],
            marketing: [false, []]
          }),
        expectedPreferences: {
          mandatory: true,
          preferences: false,
          analytics: false,
          marketing: false
        }
      }, {
        description: 'with analytics = true',
        buildForm: () => 
          formBuilder.group({
            mandatory: [false, []],
            preferences: [false, []],
            analytics: [true, []],
            marketing: [false, []]
          }),
        expectedPreferences: {
          mandatory: false,
          preferences: false,
          analytics: true,
          marketing: false
        }
      }, {
        description: 'with all true',
        buildForm: () => 
          formBuilder.group({
            mandatory: [true, []],
            preferences: [true, []],
            analytics: [true, []],
            marketing: [true, []]
          }),
        expectedPreferences: {
          mandatory: true,
          preferences: true,
          analytics: true,
          marketing: true
        }
      }
    ].forEach(scenario => {
      it(`should save all the preferences as they are in the form ${scenario.description}`, () => {
        // Given the form is defined
        app.form = <any><unknown>scenario.buildForm();

        // When calling the method
        app.saveSelected();

        // Then is should call dispatch with the right premissions
        const dispatchedAction = dispatchSpy.calls.mostRecent().args[0];
        expect(dispatchedAction.type).toEqual(PreferencesAction.SAVE_PREFERENCES);
        expect(dispatchedAction.preferences).toEqual(scenario.expectedPreferences)
      });
    })
    
  });
});
