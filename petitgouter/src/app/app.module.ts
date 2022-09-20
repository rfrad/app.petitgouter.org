import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { PreferencesEffects, TranslationEffects } from './store/store.effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/store.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { LanguagePickerComponent } from './components/translation/language-picker/language-picker.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PopupComponent } from './components/utils/popup/popup.component';
import { CheckboxComponent } from './components/forms/checkbox/checkbox.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreferencePopupComponent } from './components/preferences/preference-popup/preference-popup.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PrivacyPolicyPopupComponent } from './components/preferences/privacy-policy-popup/privacy-policy-popup.component';

// Use github documentation for setup:
// https://github.com/ngx-translate/core
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/config/translation/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LanguagePickerComponent,
    PopupComponent,
    CheckboxComponent,
    PreferencePopupComponent,
    PrivacyPolicyPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // ngrx related imports
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !environment.debugStore, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([TranslationEffects, PreferencesEffects]),
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
