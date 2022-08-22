import { LanguageCode } from "src/app/model/translation.model";
import { AppState } from "../store.state";
import { getCurrentLanguage, getTranslation } from "./translation.selectors";

describe('selectors.translation', () => {
    describe('getCurrentLanguage', () => {
        it('should retrieve the language code', () => {
            // Given a language is already set up in the store
            const state: AppState = <AppState>{
                translations: {
                    translations: {},
                    languageCode: LanguageCode.fr
                }
            }

            // When selecting the current language
            const code = getCurrentLanguage(state);

            // Then it should return the language code
            expect(code).toEqual(LanguageCode.fr);
        });
    });
    
    describe('getTranslation', () => {
        it('should retrieve the translation for the key when it exists', () => {
            // Given the translation key exists
            const state: AppState = <AppState>{
                translations: {
                    translations: {
                        name: 'RON WEASLEY'
                    },
                    languageCode: LanguageCode.fr
                }
            }

            // When selecting a translation
            const translation = getTranslation('name')(state);

            // Then it should find it
            expect(translation).toEqual('RON WEASLEY');
        });
        
        it('should return the key when the key does not exists in the store', () => {
            // Given the translation key does not exist
            const state: AppState = <AppState>{
                translations: {
                    translations: {},
                    languageCode: LanguageCode.fr
                }
            }

            // When selecting a translation
            const translation = getTranslation('KEY')(state);

            // Then it should return the key
            expect(translation).toEqual('KEY');
        });
    });
});