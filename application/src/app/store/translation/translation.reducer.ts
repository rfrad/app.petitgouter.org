import { createReducer, on } from "@ngrx/store";
import * as action from "./translation.actions";
import { initialState } from "./translation.state";

export const translationReducer = createReducer(
    initialState,
    on(action.LoadTranslations, (state, prop) => {
        return { ...state, languageCode: prop.code }
    }),
)