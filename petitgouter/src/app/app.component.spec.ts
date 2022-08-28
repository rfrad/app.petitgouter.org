import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject, from } from 'rxjs';
import { AppComponent } from './app.component';
import { PreferencePopupComponent } from './components/preferences/preference-popup/preference-popup.component';
import { MockTranslatePipe } from './pipes/mock.pipe.spec';

describe('AppComponent', () => {
  let app: AppComponent;
  const mockStore = { 
    dispatch: () => {},
    select: (selector: any) => from(preferencePublisher)
  };

  const preferencePublisher: BehaviorSubject<boolean> = new BehaviorSubject(true);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: Store, useValue: mockStore },
      ],
      declarations: [
        AppComponent,
        MockTranslatePipe
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();
    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  describe('preference popup', () => {
    it('should be called when the preferences have not been set', () => {
      // Given the preferences has NOT already been set
      const popupComponent = { open: () => {} } as PreferencePopupComponent
      spyOn(popupComponent, 'open');
      app.preferencePopup = popupComponent;

      // When the preference is NOT set
      preferencePublisher.next(false);

      // Then the popup should open
      expect(popupComponent.open).toHaveBeenCalled();
    });
    
    it('should NOT be called when the preferences have been set', () => {
      // Given the preferences has already been set
      const popupComponent = { open: () => {} } as PreferencePopupComponent
      spyOn(popupComponent, 'open');
      app.preferencePopup = popupComponent;

      // When the preference is set
      preferencePublisher.next(true);

      // Then the popup should NOT open
      expect(popupComponent.open).not.toHaveBeenCalled();
    });
  });
});
