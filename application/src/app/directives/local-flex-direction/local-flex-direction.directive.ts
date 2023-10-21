import { Directive, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

const DEFAULT_LANGUAGE_DIRECTION_CLASS: string = 'left-to-right';

@Directive({
  selector: '[pgLocalFlexDirection]'
})
export class LocalFlexDirectionDirective implements OnInit, OnDestroy {

  private sub: Subscription;
  
  @HostBinding('class') flexClass = DEFAULT_LANGUAGE_DIRECTION_CLASS;

  constructor(
    private translations: TranslateService
  ) {}

  ngOnInit(): void {
    this.sub = this.translations.onLangChange.subscribe((event: LangChangeEvent) => {
      this.flexClass = `flex-${event.translations?.['language:direction'] || DEFAULT_LANGUAGE_DIRECTION_CLASS}`;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
