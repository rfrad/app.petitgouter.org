import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Preference, Preferences } from 'src/app/model/preferences.model';
import { SavePreferences } from 'src/app/store/preferences/preferences.actions';
import { AppState } from 'src/app/store/store.state';
import { PopupComponent } from '../../utils/popup/popup.component';

type PreferenceForm = {
  name: string;
  description: string;
  preference: Preference;
  defaultValue: boolean;
  updatable: boolean;
};

@Component({
  selector: 'app-preference-popup',
  templateUrl: './preference-popup.component.html',
  styleUrls: ['./preference-popup.component.scss']
})
export class PreferencePopupComponent {
  
  @ViewChild(PopupComponent)
  public preferencePopup: PopupComponent;

  readonly preferenceFields: PreferenceForm[] = [{
    name: "preferences:mandatory:name",
    description: "preferences:mandatory:description",
    preference: Preference.mandatory,
    defaultValue: true,
    updatable: false
  }, {
    name: "preferences:preferences:name",
    description: "preferences:preferences:description",
    preference: Preference.preferences,
    defaultValue: false,
    updatable: true
  }, {
    name: "preferences:analytics:name",
    description: "preferences:analytics:description",
    preference: Preference.analytics,
    defaultValue: false,
    updatable: true
  }, {
    name: "preferences:marketing:name",
    description: "preferences:marketing:description",
    preference: Preference.marketing,
    defaultValue: false,
    updatable: true
  }]

  public form = this.formBuilder.group({
    ...this.preferenceFields.reduce((obj: any, pref) => {
      const name: string = pref.preference;
      obj[name] = [pref.defaultValue, []];
      return obj;
    }, {})
  });

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ){}

  public saveAll(): void {
    const prefs: Preferences = <Preferences>{};
    this.preferenceFields.forEach(field => {
      prefs[field.preference] = true;
    });
    this.store.dispatch(SavePreferences({ preferences: prefs }));
  }

  public saveSelected(): void {
    const prefs: Preferences = <Preferences>{};
    this.preferenceFields.forEach(field => {
      prefs[field.preference] = <boolean>this.form.controls[field.preference].value;
    });
    this.store.dispatch(SavePreferences({ preferences: prefs }));
  }

  public open(): void {
    this.preferencePopup.open();
  }

}
