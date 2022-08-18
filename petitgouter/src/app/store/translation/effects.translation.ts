import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of, switchMap } from "rxjs";
import { LoadTranslations, LoadTranslationsSuccess } from "./actions.translation";

@Injectable({ providedIn: 'root' })
export class TranslationEffects {

    constructor(
        private actions$: Actions
    ) {}

    loadTranslations$ = createEffect(() => 
        this.actions$.pipe(
            ofType(LoadTranslations),
            switchMap(action => {
                return of(LoadTranslationsSuccess({
                    translations: {
                        name: 'HARRY'
                    }
                }));
            })
        )
    );
}