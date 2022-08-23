import { createSelector } from "@ngrx/store";
import { Preference } from "src/app/model/preferences.model";
import { AppState } from "../store.state";

export const preferenceHasBeenSet = createSelector(
    (state: AppState) => state.preferences,
    preferencesState => preferencesState.hasBeenSet
);

export const getPreference = (key: Preference) => createSelector(
    (state: AppState) => state.preferences,
    preferencesState => !!preferencesState.preferences?.[key]
)

