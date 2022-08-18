import { createReducer, on } from "@ngrx/store";
import * as action from "./actions.translation";
import { initialState } from "./state.translation";

export const translationReducer = createReducer(
    initialState,
    on(action.LoadTranslations, (state, prop) => {
        return { ...state, languageCode: prop.code }
    }),
    on(action.LoadTranslationsSuccess, (state, prop) => {
        return { ...state, translations: prop.translations }
    }),
    on(action.LoadTranslationsError, (state, _) => {
        return { ...state, translations: {} }
    }),
)