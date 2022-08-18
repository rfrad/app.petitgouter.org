import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { BehaviorSubject } from "rxjs";
import { LanguageCode } from "src/app/model/translation.model";
import { LoadTranslations, TranslationAction } from "./actions.translation";
import { TranslationEffects } from "./effects.translation";

describe('TranslationEffects', () => {
    let effects: TranslationEffects;
    let actionPublisher: BehaviorSubject<Action>;
  
    beforeEach(() => {
        actionPublisher = new BehaviorSubject(<Action>{ type: 'initForTest' });
        TestBed.configureTestingModule({
            providers: [{
                provide: Actions,
                useValue: actionPublisher
            }]
        });
        effects = TestBed.inject(TranslationEffects);
    });
  
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    it('should load the default translations', done => {
        // Given a LoadTranslation action 
        const action = LoadTranslations({ code: LanguageCode.en });

        // When the action is dispatched
        const sub = effects.loadTranslations$.subscribe(action => {
            // Then is should load a dummy translation set (for now)
            expect(action.type).toEqual(TranslationAction.LOAD_TRANSLATIONS_SUCCESS);
            expect(action.translations).toEqual({ name: 'HARRY'});

            sub.unsubscribe();
            done();
        });
        actionPublisher.next(action);
    });
});