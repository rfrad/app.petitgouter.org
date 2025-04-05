import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of, switchMap, tap, withLatestFrom } from "rxjs";
import { LoadTranslations, LoadTranslationsSuccess } from "./translation.actions";
import { TranslateService } from "@ngx-translate/core";
import { Store } from "@ngrx/store";
import { getPreference } from "../preferences/preferences.selectors";
import { Preference } from "../../model/preferences.model";
import { AppState } from "../store.state";

@Injectable({ providedIn: 'root' })
export class TranslationEffects {

    constructor(
        private actions$: Actions,
        private translate: TranslateService,
        private store: Store<AppState>,
    ) {}

    loadTranslations$ = createEffect(() => 
        this.actions$.pipe(
            ofType(LoadTranslations),
            withLatestFrom(
                this.store.select(getPreference(Preference.preferences))
            ),
            tap(([action, savePreferences]) => {
                if(savePreferences) {
                    localStorage.setItem('translations.languageCode', action.code);
                }
            }),
            switchMap(([action, _]) => {
                this.translate.use(action.code);
                return of(LoadTranslationsSuccess({ 
                    translations: {} 
                }));
            })
        )
    );
}