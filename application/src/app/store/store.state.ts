import { PreferencesState } from "./preferences/preferences.state"
import { TranslationState } from "./translation/translation.state"

export type AppState = {
    translations: TranslationState,
    preferences: PreferencesState
}