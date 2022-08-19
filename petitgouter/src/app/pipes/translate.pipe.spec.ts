import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslatePipe } from './translate.pipe';

describe('TranslatePipe', () => {
  let pipe: TranslatePipe;
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
          provideMockStore()
        ],
        imports: [
        ]
    });
    const store = TestBed.inject(MockStore);
    pipe = new TranslatePipe(store);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
