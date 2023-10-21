import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PreferencePopupComponent } from './components/preferences/preference-popup/preference-popup.component';
import { LanguageCode } from './model/translation.model';
import { SvgIcon } from './model/utils/svg-icon.model';
import { OverLayerService } from './services/utils/over-layer.service';
import { preferenceHasBeenSet } from './store/preferences/preferences.selectors';
import { AppState } from './store/store.state';
import { LoadTranslations } from './store/translation/translation.actions';

@Component({
  selector: 'pg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  SvgIcon = SvgIcon;
  appVersion = environment.app.version;
  appName = environment.app.name;

  private subs: Subscription[] = [];

  @ViewChild(PreferencePopupComponent)
  preferencePopup: PreferencePopupComponent;

  constructor(
    private store: Store<AppState>,
    readonly overlayerService: OverLayerService,
    translate: TranslateService
  ){
    translate.setDefaultLang(LanguageCode.en);
  }

  ngOnInit(): void {
    this.store.dispatch(LoadTranslations({ code: LanguageCode.fr }));
  }

  ngAfterViewInit(): void {
    const popupTrigger$ = this.store.select(preferenceHasBeenSet);
    this.subs.push(
      popupTrigger$.subscribe(hasBeenSet => {
        if (!hasBeenSet) { 
          this.preferencePopup.open();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
