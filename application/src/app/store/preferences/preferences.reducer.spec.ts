import { SavePreferences, SavePreferencesSuccess } from "./preferences.actions";
import { preferencesReducer } from "./preferences.reducer";
import { PreferencesState } from "./preferences.state";

describe('preferencesReducer', () => {
    describe('SavePreferences', () => {
        it('should update the preferences', () => {
            // Given preferences are already set up in the store
            const oldStore: PreferencesState = {
                hasBeenSet: false,
                preferences: {
                    mandatory: true,
                    preferences: false,
                    analytics: true,
                    marketing: false
                }
            }

            // When reducing a SavePreferences action
            const newState = preferencesReducer(
                oldStore, 
                SavePreferences({ preferences: {
                    mandatory: false,
                    preferences: true,
                    analytics: false,
                    marketing: true
                }})
            );

            // Then it should update the preferences
            expect(newState).toEqual({
                hasBeenSet: true,
                preferences: {
                    mandatory: false,
                    preferences: true,
                    analytics: false,
                    marketing: true
                }
            });
        });
    });
    
    describe('SavePreferencesSuccess', () => {
        it('should NOT update the preferences', () => {
            // Given preferences are already set up in the store
            const oldStore: PreferencesState = {
                hasBeenSet: false,
                preferences: {
                    mandatory: true,
                    preferences: false,
                    analytics: true,
                    marketing: false
                }
            }

            // When reducing a SavePreferences action
            const newState = preferencesReducer(
                oldStore, 
                SavePreferencesSuccess({ preferences: {
                    mandatory: false,
                    preferences: true,
                    analytics: false,
                    marketing: true
                }})
            );

            // Then it should NOT update the preferences
            expect(newState).toEqual({
                hasBeenSet: false,
                preferences: {
                    mandatory: true,
                    preferences: false,
                    analytics: true,
                    marketing: false
                }
            });
        });
    });
});