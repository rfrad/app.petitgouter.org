import { initialState as initialTranslationState, TranslationState } from "./translation/translation.state"

export type AppState = {
    translations: TranslationState
}

export const initialState: AppState = {
    translations: initialTranslationState
}