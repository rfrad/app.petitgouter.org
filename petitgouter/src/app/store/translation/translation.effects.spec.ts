import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
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

    const translateService = {
        use: (code: LanguageCode) => {}
    }

    beforeEach(() => {
        actionPublisher = new BehaviorSubject(<Action>{ type: 'initForTest' });
        spyOn(translateService, 'use').and.stub();
        spyOn(fileLoaderMock, 'get').and.callThrough()
        TestBed.configureTestingModule({
            providers: [{
                provide: Actions,
                useValue: actionPublisher
            }, {
                provide: TranslateService,
                useValue: translateService
            }]
        });
        effects = TestBed.inject(TranslationEffects);
    });
  
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    describe('loadTranslations$', () => {
        [ LanguageCode.en, LanguageCode.fr ].forEach(language => {
            it('should set the default translations', done => {
                // Given a LoadTranslation action 
                const action = LoadTranslations({ code: language });

                // When the action is dispatched
                const sub = effects.loadTranslations$.subscribe(action => {
                    // Then is should use the specific language
                    expect(translateService.use).toHaveBeenCalledOnceWith(language);
                    expect(action.type).toEqual(TranslationAction.LOAD_TRANSLATIONS_SUCCESS);
                    expect(action.translations).toEqual({});

                    sub.unsubscribe();
                    done();
                });
                actionPublisher.next(action);
            });
        });
    });
});