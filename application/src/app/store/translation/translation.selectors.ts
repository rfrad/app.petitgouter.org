import { createSelector } from "@ngrx/store";
import { AppState } from "../store.state";

export const getCurrentLanguage = createSelector(
    (state: AppState) => state.translations,
    translationState => translationState.languageCode
);

export const getTranslation = (key: string) => createSelector(
    (state: AppState) => state.translations,
    translationState => translationState.translations[key] || key
)

