import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencePopupComponent } from './preference-popup.component';

describe('PreferencePopupComponent', () => {
  let component: PreferencePopupComponent;
  let fixture: ComponentFixture<PreferencePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferencePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferencePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
