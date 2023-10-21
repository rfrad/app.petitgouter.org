import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { from, Subscription, switchMap } from 'rxjs';
import { LanguageCode } from 'src/app/model/translation.model';
import { AppState } from 'src/app/store/store.state';
import { getCurrentLanguage } from 'src/app/store/translation/translation.selectors';
import { PopupComponent } from '../../utils/popup/popup.component';

@Component({
  selector: 'pg-privacy-policy-popup',
  templateUrl: './privacy-policy-popup.component.html',
  styleUrls: ['./privacy-policy-popup.component.scss']
})
export class PrivacyPolicyPopupComponent implements OnInit, OnDestroy {

  @ViewChild(PopupComponent)
  public popup: PopupComponent;

  @ViewChild("privacyPolicyContent", { read: ViewContainerRef })
  public privacyPolicyContent!: ViewContainerRef;

  private popupContentSub: Subscription;

  private privacyPolicies: Map<LanguageCode, () => Promise<any>> = new Map([
    [ 
      LanguageCode.en, 
      () => import('../../../modules/legal/legal-english/privacy-policy/privacy-policy.component')
        .then(({ PrivacyPolicyComponent }) => {
          return PrivacyPolicyComponent;
        })
    ],[ 
      LanguageCode.fr, 
      () => import('../../../modules/legal/legal-french/privacy-policy/privacy-policy.component')
        .then(({ PrivacyPolicyComponent }) => {
          return PrivacyPolicyComponent;
        })
    ]
  ])

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.popupContentSub = this.store.select(getCurrentLanguage).pipe(
      switchMap((langCode: LanguageCode) => {
        return from(Promise.resolve()
          .then(() => {
            return this.privacyPolicies.get(langCode)!();
          })
        );
      })
    ).subscribe(privacyPolicyComponent => {
      this.privacyPolicyContent.clear();
      this.privacyPolicyContent.createComponent(privacyPolicyComponent);
    });
  }

  ngOnDestroy(): void {
    this.popupContentSub.unsubscribe();
  }

  public open(): void {
    this.popup.open();
  }

  public close(): void {
    this.popup.close();
  }

}
