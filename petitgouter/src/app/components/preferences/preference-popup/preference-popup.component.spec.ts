import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Preference } from 'src/app/model/preferences.model';
import { MockTranslatePipe } from 'src/app/pipes/mock.pipe.spec';
import { PreferencesAction } from 'src/app/store/preferences/preferences.actions';
import { PopupComponent } from '../../utils/popup/popup.component';

import { PreferencePopupComponent } from './preference-popup.component';

describe('PreferencePopupComponent', () => {
  let component: PreferencePopupComponent;
  let fixture: ComponentFixture<PreferencePopupComponent>;
  let formBuilder: FormBuilder;
  const mockStore = { 
    dispatch: () => {}
  };
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();
    await TestBed.configureTestingModule({
      declarations: [ 
        PreferencePopupComponent,
        MockTranslatePipe
      ],
      providers: [
        { provide: Store, useValue: mockStore },
        FormBuilder
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferencePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('constructor()', () => {
    for (let preference in Preference) {
      it(`should create a form field for ${preference}`, () => {
        const controls: any = component.form.controls;
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
        const controls: any = component.form.controls;
        expect(controls[scenario.pref].value).toEqual(scenario.value);
      });
    });
  });
  
  describe('saveAll()', () => {
    it('should save all the preferences as true', () => {
      // When calling the method
      component.saveAll();

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
        component.form = <any><unknown>scenario.buildForm();

        // When calling the method
        component.saveSelected();

        // Then is should call dispatch with the right premissions
        const dispatchedAction = dispatchSpy.calls.mostRecent().args[0];
        expect(dispatchedAction.type).toEqual(PreferencesAction.SAVE_PREFERENCES);
        expect(dispatchedAction.preferences).toEqual(scenario.expectedPreferences)
      });
    })
  });

  describe('open()', () => {
    it("should call the popup's open method", () => {
      // Given the preferences has NOT already been set
      const popupComponent = { open: () => {} } as PopupComponent
      spyOn(popupComponent, 'open');
      component.preferencePopup = popupComponent;

      // When opening the component
      component.open();

      // Then the popup should open
      expect(popupComponent.open).toHaveBeenCalledWith();
    });
  });
});
