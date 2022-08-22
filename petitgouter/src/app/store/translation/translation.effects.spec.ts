import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { BehaviorSubject, of } from "rxjs";
import { LanguageCode } from "src/app/model/translation.model";
import { LoadTranslations, TranslationAction } from "./translation.actions";
import { TranslationEffects } from "./translation.effects";

describe('TranslationEffects', () => {
    let effects: TranslationEffects;
    let actionPublisher: BehaviorSubject<Action>;

    const fileLoaderMock = {
        get: (file: string) => of({
            name: 'HARRY'
        })
    }
  
    beforeEach(() => {
        actionPublisher = new BehaviorSubject(<Action>{ type: 'initForTest' });
        spyOn(fileLoaderMock, 'get').and.callThrough()
        TestBed.configureTestingModule({
            providers: [{
                provide: Actions,
                useValue: actionPublisher
            }, {
                provide: HttpClient,
                useValue: fileLoaderMock
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
            expect(fileLoaderMock.get).toHaveBeenCalledWith(`assets/config/translation/${LanguageCode.en}.json`)
            expect(action.translations).toEqual({ name: 'HARRY'});

            sub.unsubscribe();
            done();
        });
        actionPublisher.next(action);
    });
});