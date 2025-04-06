import { createAction, props } from "@ngrx/store";
import { AppError } from "src/app/model/error.model";
import { LanguageCode, Translations } from "src/app/model/translation.model";
import { NoProps } from "../common/common.actions";

export enum TranslationAction {
    LOAD_TRANSLATIONS = "[Translation] Load",
    LOAD_TRANSLATIONS_SUCCESS = "[Translation] Load success",
    SET_DEFAULT_LANGUAGE_SUCCESS = "[Translation] Set default language success",
}

export type LoadTranslationsProps = { code: LanguageCode };
export const LoadTranslations = createAction(
    TranslationAction.LOAD_TRANSLATIONS,
    props<LoadTranslationsProps>()
);

export const LoadTranslationsSuccess = createAction(
    TranslationAction.LOAD_TRANSLATIONS_SUCCESS,
    props<NoProps>()
);