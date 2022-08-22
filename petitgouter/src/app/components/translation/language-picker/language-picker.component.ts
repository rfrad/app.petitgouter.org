import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LanguageCode } from 'src/app/model/translation.model';
import { AppState } from 'src/app/store/store.state';
import { LoadTranslations } from 'src/app/store/translation/translation.actions';

@Component({
  selector: 'app-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss']
})
export class LanguagePickerComponent {
  LanguageCode = LanguageCode;

  constructor(
    private store: Store<AppState>
  ) { }

    selectLanguage(language: LanguageCode) {
      this.store.dispatch(LoadTranslations({ code: language }))
    }

}
