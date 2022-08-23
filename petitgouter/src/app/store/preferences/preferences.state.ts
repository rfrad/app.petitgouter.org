import { Preferences } from "src/app/model/preferences.model";

export type PreferencesState = {
    hasBeenSet: boolean,
    preferences: Preferences
}

export const initialState: PreferencesState = {
    hasBeenSet: localStorage.getItem('preference.hasBeenSet') === 'true',
    preferences: {
        mandatory: true,
        preferences: localStorage.getItem('preference.preferences') === 'true',
        analytics: localStorage.getItem('preference.analytics') === 'true',
        marketing: localStorage.getItem('preference.marketing') === 'true',
    }
}