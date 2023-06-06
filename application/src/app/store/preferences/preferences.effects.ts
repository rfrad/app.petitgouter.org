import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of, switchMap } from "rxjs";
import { SavePreferences, SavePreferencesSuccess } from "./preferences.actions";

@Injectable({ providedIn: 'root' })
export class PreferencesEffects {

    constructor(
        private actions$: Actions
    ) {}

    savePreferences$ = createEffect(() => 
        this.actions$.pipe(
            ofType(SavePreferences),
            switchMap(action => {
                const isToBeSaved = action.preferences.preferences;

                if (isToBeSaved) {
                    localStorage.setItem('preference.hasBeenSet', "" + true);
                    Object.entries(action.preferences).forEach(([preference, prefValue]) => {
                        const storageName = 'preference.' + preference;
                        localStorage.setItem(storageName, "" + prefValue);
                    });
                } else {
                    localStorage.removeItem('preference.hasBeenSet')
                    Object.keys(action.preferences).forEach((preference) => {
                        const storageName = 'preference.' + preference;
                        localStorage.removeItem(storageName);
                    });
                }

                return of(SavePreferencesSuccess({ 
                    preferences: action.preferences
                }));
            })
        )
    );
}