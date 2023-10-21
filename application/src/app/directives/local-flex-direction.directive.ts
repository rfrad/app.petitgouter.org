import { Directive, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appLocalFlexDirection]'
})
export class LocalFlexDirectionDirective implements OnInit, OnDestroy {

  private sub: Subscription;
  
  @HostBinding('class') flexClass = 'left-to-right';

  constructor(
    private translations: TranslateService
  ) {}

  ngOnInit(): void {
    this.sub = this.translations.onLangChange.subscribe((event: LangChangeEvent) => {
      this.flexClass = event.translations['language:direction'];
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
