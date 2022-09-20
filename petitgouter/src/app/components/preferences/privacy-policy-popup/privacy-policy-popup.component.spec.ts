import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockTranslatePipe } from 'src/app/pipes/mock.pipe.spec';
import { PopupComponent } from '../../utils/popup/popup.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { PrivacyPolicyPopupComponent } from './privacy-policy-popup.component';
import { LanguageCode } from 'src/app/model/translation.model';
import { getCurrentLanguage } from 'src/app/store/translation/translation.selectors';
import { LegalEnglishModule } from 'src/app/modules/legal/legal-english/legal-english.module';
import { ViewContainerRef } from '@angular/core';

describe('PrivacyPolicyPopupComponent', () => {
  let component: PrivacyPolicyPopupComponent;
  let fixture: ComponentFixture<PrivacyPolicyPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        PrivacyPolicyPopupComponent,
        MockTranslatePipe,
        PopupComponent
      ],
      providers: [
        provideMockStore({
          initialState: {
            translations: {
              languageCode: LanguageCode.en
            }
          }
        })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.popup = <PopupComponent>{
      open: () => {},
      close: () => {}
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  for(let code in LanguageCode) {
    it(`should populate the popup content for language ${code}`, done => {
      // When the language is selected
      const mockStore = TestBed.inject(MockStore);
      mockStore.overrideSelector(
        getCurrentLanguage,
        <LanguageCode>code
      );

      const fixture = TestBed.createComponent(PrivacyPolicyPopupComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      component.privacyPolicyContent = <ViewContainerRef><unknown>{
        clear: () => {},
        createComponent: () => {}
      }

      spyOn(component.privacyPolicyContent, 'clear').and.stub();
      const injectedContentSpy = spyOn(component.privacyPolicyContent, 'createComponent').and.stub();

      // When creating the component
      // Then it should populate the popup content
      setTimeout(() => {
        expect(component.privacyPolicyContent.clear).toHaveBeenCalledWith();
        expect(component.privacyPolicyContent.createComponent).toHaveBeenCalled();
        const injectedContent = injectedContentSpy.calls.mostRecent().args[0];
        expect(injectedContent).toBeDefined();

        mockStore.resetSelectors();
        done();
      }, 2);
    });
  }

  it('should open the popup', () => {
    // Given the popup is found
    spyOn(component.popup, 'open').and.stub();

    // When closing the component
    component.open();

    // Thn it should open the popup
    expect(component.popup.open).toHaveBeenCalledWith();
  });

  it('should close the popup', () => {
    // Given the popup is found
    spyOn(component.popup, 'close').and.stub();

    // When closing the component
    component.close();

    // Thn it should close the popup
    expect(component.popup.close).toHaveBeenCalledWith();
  });
});
