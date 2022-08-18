import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { TranslationEffects } from './store/effects.store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/reducers.store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // ngrx related imports
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([TranslationEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
