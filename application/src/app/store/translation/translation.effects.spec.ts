import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject, of } from "rxjs";
import { LanguageCode } from "src/app/model/translation.model";
import { LoadTranslations, TranslationAction } from "./translation.actions";
import { TranslationEffects } from "./translation.effects";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Preference } from "src/app/model/preferences.model";
import { InitaliseApplication } from "../common/common.actions";

describe('TranslationEffects', () => {
    let effects: TranslationEffects;
    let actionPublisher: BehaviorSubject<Action>;

    const fileLoaderMock = {
        get: (file: string) => of({
            name: 'HARRY'
        })
    }

    const translateService = {
        use: (code: LanguageCode) => {},
        setDefaultLang: (code: LanguageCode) => {},
    }

    beforeEach(() => {
        actionPublisher = new BehaviorSubject(<Action>{ type: 'initForTest' });
        spyOn(translateService, 'use');
        spyOn(translateService, 'setDefaultLang');
        spyOn(fileLoaderMock, 'get').and.callThrough()
        TestBed.configureTestingModule({
            providers: [{
                provide: Actions,
                useValue: actionPublisher
            }, {
                provide: TranslateService,
                useValue: translateService
            },
            provideMockStore({
                initialState: {
                    preferences: {
                        preferences: {
                            [Preference.preferences]: true
                        }
                    }
                }
            })
        ]
        });
        effects = TestBed.inject(TranslationEffects);
    });
  
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    describe('setDefaultLanguage$', () => {
        it('should set the default language to en', done => {
            // Given an InitaliseApplication action 
            const action = InitaliseApplication({});

            // When the action is dispatched
            const sub = effects.setDefaultLanguage$.subscribe(action => {
                expect(action.type).toEqual(TranslationAction.SET_DEFAULT_LANGUAGE_SUCCESS);
                // Then is should default the language to English
                expect(translateService.setDefaultLang).toHaveBeenCalledOnceWith(LanguageCode.en);

                sub.unsubscribe();
                done();
            });
            actionPublisher.next(action);
        });
    });

    describe('loadTranslations$', () => {
        [ LanguageCode.en, LanguageCode.fr ].forEach(language => {
            [ true, false ].forEach(storePreferences => {
                it(`should set the default translations to ${language} when storing preferences is set to ${storePreferences}`, done => {
                    // Given a LoadTranslation action 
                    const action = LoadTranslations({ code: language });
                    const mockStore = TestBed.inject(MockStore);
                    mockStore.setState({
                        preferences: {
                            preferences: {
                                [Preference.preferences]: storePreferences
                            }
                        }
                    });

                    // When the action is dispatched
                    const sub = effects.loadTranslations$.subscribe(action => {
                        expect(action.type).toEqual(TranslationAction.LOAD_TRANSLATIONS_SUCCESS);
                        // Then is should use the specific language
                        expect(translateService.use).toHaveBeenCalledOnceWith(language);

                        sub.unsubscribe();
                        done();
                    });
                    actionPublisher.next(action);
                });
            });
        });

        it('should save language when preferences flag is true', done => {
            // Given the preferences flag is true
            const mockStore = TestBed.inject(MockStore);
            mockStore.setState({
                preferences: {
                    preferences: {
                        [Preference.preferences]: true
                    }
                }
            });
            spyOn(localStorage, 'setItem');
            spyOn(localStorage, 'removeItem');

            // When loading a new language
            const action = LoadTranslations({ code: LanguageCode.fr });
            const sub = effects.loadTranslations$.subscribe(() => {
                // Then is should store the language in the local storage
                expect(localStorage.setItem).toHaveBeenCalledOnceWith('translations.languageCode', LanguageCode.fr);
                expect(localStorage.removeItem).not.toHaveBeenCalled();
                sub.unsubscribe();
                done();
            });
            actionPublisher.next(action);
        });
        

        it('should NOT save language when preferences flag is false', done => {
            // Given the preferences flag is false
            const mockStore = TestBed.inject(MockStore);
            mockStore.setState({
                preferences: {
                    preferences: {
                        [Preference.preferences]: false
                    }
                }
            });
            spyOn(localStorage, 'setItem');
            spyOn(localStorage, 'removeItem');

            // When loading a new language
            const action = LoadTranslations({ code: LanguageCode.fr });
            const sub = effects.loadTranslations$.subscribe(() => {
                // Then is should NOT store the language in the local storage
                expect(localStorage.removeItem).toHaveBeenCalledOnceWith('translations.languageCode');
                expect(localStorage.setItem).not.toHaveBeenCalled();
                sub.unsubscribe();
                done();
            });
            actionPublisher.next(action);
        });
    });
});