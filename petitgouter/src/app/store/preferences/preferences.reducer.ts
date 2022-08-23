import { createReducer, on } from "@ngrx/store";
import * as action from "./preferences.actions";
import { initialState } from "./preferences.state";

export const preferencesReducer = createReducer(
    initialState,
    on(action.SavePreferences, (state, prop) => {
        return { ...state, hasBeenSet: true, preferences: prop.preferences }
    }),
    on(action.SavePreferencesSuccess, (state, prop) => {
        return { ...state }
    })
)