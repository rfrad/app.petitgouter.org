import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { LanguageCode } from './model/translation.model';
import { AppState } from './store/state.store';
import { LoadTranslations } from './store/translation/actions.translation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'petitgouter';
  env = environment.envName;
  backend = environment.apiServer;
  appVersion = environment.appVersion;

  constructor(
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.store.dispatch(LoadTranslations({ code: LanguageCode.en }));
  }
}
