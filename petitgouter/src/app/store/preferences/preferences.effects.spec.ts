import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { BehaviorSubject } from "rxjs";
import { Preferences } from "src/app/model/preferences.model";
import { PreferencesAction, SavePreferences } from "./preferences.actions";
import { PreferencesEffects } from "./preferences.effects";

describe('TranslationEffects', () => {
    let effects: PreferencesEffects;
    let actionPublisher: BehaviorSubject<Action>;
  
    beforeEach(() => {
        actionPublisher = new BehaviorSubject(<Action>{ type: 'initForTest' });
        TestBed.configureTestingModule({
            providers: [{
                provide: Actions,
                useValue: actionPublisher
            }]
        });
        effects = TestBed.inject(PreferencesEffects);
    });
  
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    describe('save/delete items from localStorage', () => {
        // BE AWARE: these two tests have to run in this order
        it('(1) should save preferences when specified', done => {
            // Given preferences should be stored
            const action = SavePreferences({
                preferences: <Preferences>{
                    preferences: true, // SHOULD BE STORED
                    analytics: true,
                    marketing: false
                }
            });
    
            // When the action is dispatched
            const sub = effects.savePreferences$.subscribe(action => {
                // Then is should store the data in the localStore
                expect(action.type).toEqual(PreferencesAction.SAVE_PREFERENCES_SUCCESS);
                expect(localStorage.getItem('preference.hasBeenSet')).toEqual('true');
                expect(localStorage.getItem('preference.preferences')).toEqual('true');
                expect(localStorage.getItem('preference.analytics')).toEqual('true');
                expect(localStorage.getItem('preference.marketing')).toEqual('false');
    
                sub.unsubscribe();
                done();
            });
            actionPublisher.next(action);
        });
        
        it('(2) should delete preferences when NOT specified', done => {
            // Given preferences are already stored
            localStorage.setItem('preference.hasBeenSet', 'true');
            localStorage.setItem('preference.preferences', 'true');
            localStorage.setItem('preference.analytics', 'true');
            localStorage.setItem('preference.marketing', 'false');

            // And a new action not storing data will be dispatched
            const action = SavePreferences({
                preferences: <Preferences>{
                    preferences: false, // SHOULD NOT BE STORED
                    analytics: true,
                    marketing: false
                }
            });
    
            // When the action is dispatched
            const sub = effects.savePreferences$.subscribe(action => {
                // Then is should NOT store the data in the localStore
                expect(action.type).toEqual(PreferencesAction.SAVE_PREFERENCES_SUCCESS);
                expect(localStorage.getItem('preference.hasBeenSet')).toBeNull();
                expect(localStorage.getItem('preference.preferences')).toBeNull();
                expect(localStorage.getItem('preference.analytics')).toBeNull();
                expect(localStorage.getItem('preference.marketing')).toBeNull();
    
                sub.unsubscribe();
                done();
            });
            actionPublisher.next(action);
        });
    });
});