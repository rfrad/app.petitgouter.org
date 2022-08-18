import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './state.store';
import { translationReducer } from './translation/reducer.translation';

export const reducers: ActionReducerMap<AppState> = {
    translations: translationReducer
};