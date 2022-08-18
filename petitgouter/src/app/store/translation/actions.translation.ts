import { createAction, props } from "@ngrx/store";
import { AppError } from "src/app/model/error.model";
import { LanguageCode, Translations } from "src/app/model/translation.model";

export enum TranslationAction {
    LOAD_TRANSLATIONS = "[Translation] Load",
    LOAD_TRANSLATIONS_SUCCESS = "[Translation] Load success",
    LOAD_TRANSLATIONS_ERROR = "[Translation] Load error",
}

export const LoadTranslations = createAction(
    TranslationAction.LOAD_TRANSLATIONS,
    props<{ code: LanguageCode }>()
)

export const LoadTranslationsSuccess = createAction(
    TranslationAction.LOAD_TRANSLATIONS_SUCCESS,
    props<{ translations: Translations }>()
)

export const LoadTranslationsError = createAction(
    TranslationAction.LOAD_TRANSLATIONS_ERROR,
    props<{ error: AppError }>()
)