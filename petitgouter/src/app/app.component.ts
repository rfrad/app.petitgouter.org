import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PopupComponent } from './components/utils/popup/popup.component';
import { Preference, Preferences } from './model/preferences.model';
import { LanguageCode } from './model/translation.model';
import { OverLayerService } from './services/utils/over-layer.service';
import { SavePreferences } from './store/preferences/preferences.actions';
import { preferenceHasBeenSet } from './store/preferences/preferences.selectors';
import { AppState } from './store/store.state';
import { LoadTranslations } from './store/translation/translation.actions';

type PreferenceForm = {
  name: string;
  description: string;
  preference: Preference;
  defaultValue: boolean;
  updatable: boolean;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  appVersion = environment.appVersion;

  private subs: Subscription[] = [];

  @ViewChild(PopupComponent)
  preferencePopup: PopupComponent;

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

  form = this.formBuilder.group({
    ...this.preferenceFields.reduce((obj: any, pref) => {
      const name: string = pref.preference;
      obj[name] = [pref.defaultValue, []];
      return obj;
    }, {})
  });

  constructor(
    private store: Store<AppState>,
    readonly overlayerService: OverLayerService,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.store.dispatch(LoadTranslations({ code: LanguageCode.fr }));
  }

  ngAfterViewInit(): void {
    const popupTrigger$ = this.store.select(preferenceHasBeenSet);
    this.subs.push(
      popupTrigger$.subscribe(hasBeenSet => {
        if (!hasBeenSet) { 
          this.preferencePopup.open();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  saveAll(): void {
    const prefs: Preferences = <Preferences>{};
    this.preferenceFields.forEach(field => {
      prefs[field.preference] = true;
    });
    this.store.dispatch(SavePreferences({ preferences: prefs }));
  }

  saveSelected(): void {
    const prefs: Preferences = <Preferences>{};
    this.preferenceFields.forEach(field => {
      prefs[field.preference] = <boolean>this.form.controls[field.preference].value;
    });
    this.store.dispatch(SavePreferences({ preferences: prefs }));
  }
}
