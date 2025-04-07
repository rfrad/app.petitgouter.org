import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of, switchMap, tap, withLatestFrom } from "rxjs";
import { LoadTranslations, LoadTranslationsProps, LoadTranslationsSuccess, SetDefaultLanguageSuccess } from "./translation.actions";
import { TranslateService } from "@ngx-translate/core";
import { Store } from "@ngrx/store";
import { getPreference } from "../preferences/preferences.selectors";
import { Preference } from "../../model/preferences.model";
import { AppState } from "../store.state";
import { InitaliseApplication } from "../common/common.actions";
import { LanguageCode } from "src/app/model/translation.model";

@Injectable({ providedIn: 'root' })
export class TranslationEffects {

    constructor(
        private actions$: Actions,
        private translate: TranslateService,
        private store: Store<AppState>,
    ) {}

    setDefaultLanguage$ = createEffect(() => 
        this.actions$.pipe(
            ofType(InitaliseApplication),
            tap(() => {
                this.translate.setDefaultLang(LanguageCode.en);
            }),
            switchMap(() => of(SetDefaultLanguageSuccess({})))
        )
    );

    restoreSerialisedTranslations$ = createEffect(() => 
        this.actions$.pipe(
            ofType(InitaliseApplication),
            switchMap(() => of(LoadTranslations({
                code: localStorage.getItem('translations.languageCode') as LanguageCode || LanguageCode.en
            })))
        )
    );

    loadTranslations$ = createEffect(() => 
        this.actions$.pipe(
            ofType(LoadTranslations),
            tap((action: LoadTranslationsProps) => {
                this.translate.use(action.code);
            }),
            withLatestFrom(
                this.store.select(getPreference(Preference.preferences))
            ),
            tap(([action, savePreferences]: [LoadTranslationsProps, boolean]) => {
                if(savePreferences) {
                    localStorage.setItem('translations.languageCode', action.code);
                } else {
                    localStorage.removeItem('translations.languageCode');
                }
            }),
            switchMap(() => of(LoadTranslationsSuccess({})))
        )
    );
}