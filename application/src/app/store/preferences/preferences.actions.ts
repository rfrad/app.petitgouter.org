import { createAction, props } from "@ngrx/store";
import { Preferences } from "src/app/model/preferences.model";

export enum PreferencesAction {
    SAVE_PREFERENCES = "[Preferences] Load",
    SAVE_PREFERENCES_SUCCESS = "[Preferences] Load success"
}

export const SavePreferences = createAction(
    PreferencesAction.SAVE_PREFERENCES,
    props<{ preferences: Preferences }>()
)

export const SavePreferencesSuccess = createAction(
    PreferencesAction.SAVE_PREFERENCES_SUCCESS,
    props<{ preferences: Preferences }>()
)