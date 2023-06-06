import { Preference } from "src/app/model/preferences.model";
import { AppState } from "../store.state";
import { getPreference, preferenceHasBeenSet } from "./preferences.selectors";

describe('preferences.selector', () => {
    describe('preferenceHasBeenSet', () => {
        it('should retrieve the value defining if the permissions have been set when is true', () => {
            // Given the permissions have already been set up in the store
            const state: AppState = <AppState>{
                preferences: {
                    hasBeenSet: true
                }
            }

            // When selecting the preference status
            const hasBeenSet = preferenceHasBeenSet(state);

            // Then it should return the status
            expect(hasBeenSet).toEqual(true);
        });

        it('should retrieve the value defining if the permissions have been set when is false', () => {
            // Given the permissions have already been set up in the store
            const state: AppState = <AppState>{
                preferences: {
                    hasBeenSet: false
                }
            }

            // When selecting the preference status
            const hasBeenSet = preferenceHasBeenSet(state);

            // Then it should return the status
            expect(hasBeenSet).toEqual(false);
        });
    });
    
    describe('getPreference', () => {
        [
            {
                description: 'when preference is true',
                preferenceValue: true,
                expectedPrefValue: true
            },
            {
                description: 'when preference is false',
                preferenceValue: false,
                expectedPrefValue: false
            },
            {
                description: 'when preference is undefined',
                preferenceValue: undefined,
                expectedPrefValue: false
            },
        ].forEach(scenario => {
            it(`should retrieve the preference value ${scenario.description}`, () => {
                // Given the preference key exists
                const state: AppState = <AppState>{
                    preferences: {
                        preferences: {
                            analytics: scenario.preferenceValue
                        }
                    }
                };
    
                // When selecting a preference
                const pref = getPreference(Preference.analytics)(state);
    
                // Then it should find it
                expect(pref).toEqual(scenario.expectedPrefValue);
            });
        });
        
        
        [
            {
                description: 'when the preference does not exist',
                preferences: {
                    preferences: {}
                }
            },
            {
                description: 'when no preference exists',
                preferences: {}
            }
        ].forEach(scenario => {
            it(`should return false ${scenario.description} in the store`, () => {
                // Given the preference key exists
                const state: AppState = <AppState><unknown>{
                    preferences: scenario.preferences
                };

                // When selecting a preference
                const pref = getPreference(Preference.analytics)(state);

                // Then it should return false
                expect(pref).toEqual(false);
            });
        });
        
    });
});