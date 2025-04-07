import { LanguageCode } from "src/app/model/translation.model";
import { LoadTranslations } from "./translation.actions";
import { translationReducer } from "./translation.reducer";
import { TranslationState } from "./translation.state";

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
});