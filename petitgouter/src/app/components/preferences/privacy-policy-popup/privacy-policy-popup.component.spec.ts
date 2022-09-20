import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockTranslatePipe } from 'src/app/pipes/mock.pipe.spec';
import { PopupComponent } from '../../utils/popup/popup.component';

import { PrivacyPolicyPopupComponent } from './privacy-policy-popup.component';

describe('PrivacyPolicyPopupComponent', () => {
  let component: PrivacyPolicyPopupComponent;
  let fixture: ComponentFixture<PrivacyPolicyPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        PrivacyPolicyPopupComponent,
        MockTranslatePipe
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
