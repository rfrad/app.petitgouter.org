import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/store.state';
import { getTranslation } from '../store/translation/translation.selectors';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(
    private store: Store<AppState>,
  ) {}

  transform(key: any, ...args: unknown[]): any {
    const translationSelector = getTranslation(key);
    const translation$ = <Observable<string>>this.store.select(translationSelector);
    return translation$;
  }

}
