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
import { TranslatePipe } from './pipes/translate.pipe';
import { HttpClientModule } from '@angular/common/http';
import { PopupComponent } from './components/utils/popup/popup.component';
import { CheckboxComponent } from './components/forms/checkbox/checkbox.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LanguagePickerComponent,
    TranslatePipe,
    PopupComponent,
    CheckboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // ngrx related imports
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !environment.debugStore, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([TranslationEffects, PreferencesEffects]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
