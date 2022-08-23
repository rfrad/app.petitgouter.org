import { Preference } from "src/app/model/preferences.model"
import { initialState } from "./preferences.state"

describe('preferences.state', () => {
    for(let pref in Preference) {
        it(`should have a default value in the initial state for ${pref}`, () => {
            const prefs: any = initialState.preferences;
            expect(prefs[pref]).toBeDefined();
        });
    }
});