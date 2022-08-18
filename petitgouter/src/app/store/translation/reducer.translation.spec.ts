import { LanguageCode } from "src/app/model/translation.model";
import { LoadTranslations, LoadTranslationsError, LoadTranslationsSuccess } from "./actions.translation";
import { translationReducer } from "./reducer.translation";
import { TranslationState } from "./state.translation";

describe('translationReducer', () => {
    describe('LoadTranslations', () => {
        it('should update the language code', () => {
            // Given a language is already set up in the store
            const oldStore: TranslationState = {
                translations: {
                    name: 'HARRY POTTER'
                },
                languageCode: LanguageCode.fr
            }

            // When reducing a LoadTranslations action
            const newState = translationReducer(
                oldStore, 
                LoadTranslations({ code: LanguageCode.en })
            );

            // Then it should update the language code
            expect(newState).toEqual({
                translations: {
                    name: 'HARRY POTTER'
                },
                languageCode: LanguageCode.en
            });
        });
    });
    
    describe('LoadTranslationsSuccess', () => {
        it('should update the translations', () => {
            // Given the translations are already set up in the store
            const oldStore: TranslationState = {
                translations: {
                    name: 'HARRY POTTER'
                },
                languageCode: LanguageCode.fr
            }

            // When reducing a LoadTranslationsSuccess action
            const newState = translationReducer(
                oldStore, 
                LoadTranslationsSuccess({ translations: { newName: 'VOLDEMORT' }})
            );

            // Then it should update the translations
            expect(newState).toEqual({
                translations: {
                    newName: 'VOLDEMORT'
                },
                languageCode: LanguageCode.fr
            });
        });
    });
    
    describe('LoadTranslationsError', () => {
        it('should reset the translations', () => {
            // Given the translations are already set up in the store
            const oldStore: TranslationState = {
                translations: {
                    name: 'HARRY POTTER'
                },
                languageCode: LanguageCode.fr
            }

            // When reducing a LoadTranslationsError action
            const newState = translationReducer(
                oldStore, 
                LoadTranslationsError({ error: { message: 'OH NO!' }})
            );

            // Then it should reset the translations
            expect(newState).toEqual({
                translations: {},
                languageCode: LanguageCode.fr
            });
        });
    });
});