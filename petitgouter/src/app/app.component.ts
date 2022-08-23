import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { LanguageCode } from './model/translation.model';
import { OverLayerService } from './services/utils/over-layer.service';
import { AppState } from './store/store.state';
import { LoadTranslations } from './store/translation/translation.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appVersion = environment.appVersion;

  constructor(
    private store: Store<AppState>,
    readonly overlayerService: OverLayerService
  ){}

  ngOnInit(): void {
    this.store.dispatch(LoadTranslations({ code: LanguageCode.fr }));
  }
}
