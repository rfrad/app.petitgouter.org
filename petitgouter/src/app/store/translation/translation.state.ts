import { LanguageCode, Translations } from "src/app/model/translation.model";

export type TranslationState = {
    translations: Translations,
    languageCode: LanguageCode
}

export const initialState: TranslationState = {
    translations: {},
    languageCode: LanguageCode.en
}