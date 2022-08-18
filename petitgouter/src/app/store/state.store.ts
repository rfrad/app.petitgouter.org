import { initialState as initialTranslationState, TranslationState } from "./translation/state.translation"

export type AppState = {
    translations: TranslationState
}

export const initialState: AppState = {
    translations: initialTranslationState
}