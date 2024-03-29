import { ActionReducerMap } from '@ngrx/store';
import { preferencesReducer } from './preferences/preferences.reducer';
import { AppState } from './store.state';
import { translationReducer } from './translation/translation.reducer';

export const reducers: ActionReducerMap<AppState> = {
    translations: translationReducer,
    preferences: preferencesReducer
};