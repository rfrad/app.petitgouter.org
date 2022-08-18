import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Actions, ofType } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { LanguageCode } from 'src/app/model/translation.model';
import { reducers } from 'src/app/store/reducers.store';
import { LoadTranslations } from 'src/app/store/translation/actions.translation';

import { LanguagePickerComponent } from './language-picker.component';

describe('LanguagePickerComponent', () => {
  let component: LanguagePickerComponent;
  let fixture: ComponentFixture<LanguagePickerComponent>;
  let actions$: Actions;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguagePickerComponent ],
      providers: [
        Store,
        Actions
      ],
      imports: [
        StoreModule.forRoot(reducers, {}),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguagePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    actions$ = TestBed.inject(Actions)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action when selecting a language', done => {
    // Then it should dispatch an action
    actions$.pipe(
      ofType(LoadTranslations)
    ).subscribe(action => {
      expect(action.code).toEqual(LanguageCode.fr);
      done();
    });

    // When selecting a new language
    component.selectLanguage(LanguageCode.fr);
  });
});
