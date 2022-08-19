import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of, switchMap } from "rxjs";
import { LoadTranslations, LoadTranslationsSuccess } from "./actions.translation";
import { HttpClient } from '@angular/common/http'
import { Translations } from "src/app/model/translation.model";

@Injectable({ providedIn: 'root' })
export class TranslationEffects {

    constructor(
        private actions$: Actions,
        private httpClient: HttpClient
    ) {}

    loadTranslations$ = createEffect(() => 
        this.actions$.pipe(
            ofType(LoadTranslations),
            switchMap(action => 
                this.httpClient.get(`assets/config/translation/${action.code}.json`).pipe(
                    switchMap(translations => 
                        of(LoadTranslationsSuccess({ 
                            translations: <Translations>translations 
                        }))
                    )
                )
            )
        )
    );
}