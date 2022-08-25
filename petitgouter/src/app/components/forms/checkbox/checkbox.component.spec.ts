import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggle()', () => {
    [ true, false ].forEach(initialSelection => {
      it('should toggle the selection', () => {
        // Given the selection is set
        component.selected = initialSelection;

        // When the toggle() is called
        component.toggle();

        // Then it should invert the selection
        expect(component.selected).toEqual(!initialSelection);
      });
    });
  });
});
