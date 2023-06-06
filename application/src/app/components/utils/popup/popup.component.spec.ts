import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverLayerService } from 'src/app/services/utils/over-layer.service';

import { PopupComponent } from './popup.component';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;
  let overLayerMock: OverLayerService = {
    add: (layer, context) => {},
    remove: (layer) => {}
  } as OverLayerService;

  beforeEach(async () => {
    spyOn(overLayerMock, 'add').and.stub();
    spyOn(overLayerMock, 'remove').and.stub();

    await TestBed.configureTestingModule({
      declarations: [ PopupComponent ],
      providers: [
        { provide: OverLayerService, useValue: overLayerMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('open()', () => {
    it('should add the popup as an overlayer', () => {
      // When opening the popup
      component.open();

      // Then it should add the popup as an overlayer
      expect(overLayerMock.add).toHaveBeenCalledOnceWith(component.popup, {});
    });
  });

  describe('close()', () => {
    it('should remove the popup from the overlayers', () => {
      // When closing the popup
      component.close();

      // Then it should remove the popup from the overlayers
      expect(overLayerMock.remove).toHaveBeenCalledOnceWith(component.popup);
    });
  });

  describe('primaryCall()', () => {
    it('should emit a primaryAction', () => {
      // Given there is a primary action
      spyOn(component.primaryAction, 'emit').and.stub();

      // When calling the primaryCall
      component.primaryCall();

      // Then it should emit a primary action
      expect(component.primaryAction.emit).toHaveBeenCalledOnceWith();
    });

    it('should remove the popup from the overlayer', () => {
      // When calling the primaryCall
      component.primaryCall();

      // Then the overlayer should be removed
      expect(overLayerMock.remove).toHaveBeenCalledOnceWith(component.popup);
    });
  });

  describe('secondaryCall()', () => {
    it('should emit a secondaryAction', () => {
      // Given there is a secondary action
      spyOn(component.secondaryAction, 'emit').and.stub();

      // When calling the secondaryCall
      component.secondaryCall();

      // Then it should emit a secondary action
      expect(component.secondaryAction.emit).toHaveBeenCalledOnceWith();
    });

    it('should remove the popup from the overlayer', () => {
      // When calling the secondaryCall
      component.secondaryCall();

      // Then the overlayer should be removed
      expect(overLayerMock.remove).toHaveBeenCalledOnceWith(component.popup);
    });
  });
});
