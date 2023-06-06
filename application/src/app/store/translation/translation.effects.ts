import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of, switchMap } from "rxjs";
import { LoadTranslations, LoadTranslationsSuccess } from "./translation.actions";
import { TranslateService } from "@ngx-translate/core";

@Injectable({ providedIn: 'root' })
export class TranslationEffects {

    constructor(
        private actions$: Actions,
        private translate: TranslateService
    ) {}

    loadTranslations$ = createEffect(() => 
        this.actions$.pipe(
            ofType(LoadTranslations),
            switchMap(action => {
                this.translate.use(action.code);
                return of(LoadTranslationsSuccess({ 
                    translations: {} 
                }));
            })
        )
    );
}