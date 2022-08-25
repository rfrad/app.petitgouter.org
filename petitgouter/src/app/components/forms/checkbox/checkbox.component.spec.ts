import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  const mock = {
    onChange: (val: boolean) => {},
    onTouched: () => {}
  }

  beforeEach(async () => {
    spyOn(mock, 'onChange').and.callThrough();
    spyOn(mock, 'onTouched').and.callThrough();

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

  describe('writeValue()', () => {
    [{
      description: 'when value is true',
      initialValue: true,
      expectedValue: true
    },{
      description: 'when value is false',
      initialValue: false,
      expectedValue: false
    },{
      description: 'when value is an object',
      initialValue: { object: true },
      expectedValue: true
    },{
      description: 'when value is null',
      initialValue: null,
      expectedValue: false
    },{
      description: 'when value is undefined',
      initialValue: undefined,
      expectedValue: false
    }].forEach(scenario => {
      it(`should define the initial value ${scenario.description}`, () => {
        // When the value is set
        component.writeValue(scenario.initialValue);

        // Then it should be defined
        expect(component.selected).toEqual(scenario.expectedValue);
      });
    });
  });

  describe('setDisabledState()', () => {
    [ true, false ].forEach(disabled => {
      it(`should define the disabled state with ${disabled}`, () => {
        // When the disabled state is set
        component.setDisabledState(disabled);

        // Then it should be defined
        expect(component.disabled).toEqual(disabled);
      });
    });
  });

  describe('toggle()', () => {
    [ true, false ].forEach(initialSelection => {
      it('should toggle the selection - with initial value: ' + initialSelection, () => {
        // Given the selection is set
        component.selected = initialSelection;

        // When the toggle() is called
        component.toggle();

        // Then it should invert the selection
        expect(component.selected).toEqual(!initialSelection);
      });
    });
    
    [ true, false ].forEach(initialSelection => {
      it('should NOT toggle the selection when disabled - with initial value: ' + initialSelection, () => {
        // Given the selection is set but the component is disabled
        component.selected = initialSelection;
        component.disabled = true;

        // When the toggle() is called
        component.toggle();

        // Then it should NOT invert the selection
        expect(component.selected).toEqual(initialSelection);
      });
    });
    
    [ true, false ].forEach(initialSelection => {
      it('should broadcast a change - with initial value: ' + initialSelection, () => {
        // Given the selection is set
        component.selected = initialSelection;
        component.registerOnChange(mock.onChange);

        // When the toggle() is called
        component.toggle();

        // Then it should call onChange
        expect(mock.onChange).toHaveBeenCalledWith(!initialSelection);
      });
    });
    
    [ true, false ].forEach(initialSelection => {
      it('should NOT broadast a change when disabled - with initial value: ' + initialSelection, () => {
        // Given the selection is set but the component is disabled
        component.selected = initialSelection;
        component.disabled = true;
        component.registerOnChange(mock.onChange);

        // When the toggle() is called
        component.toggle();

        // Then it should NOT invert the selection
        expect(mock.onChange).not.toHaveBeenCalled();
      });
    });
    
    it('should call onTouched when toggle is called', () => {
      // Given onTouched is registered
      component.registerOnTouched(mock.onTouched);

      // When the toggle() is called
      component.toggle();

      // Then it should call onTouched
      expect(mock.onTouched).toHaveBeenCalledTimes(1);
    });
    
    it('should call onTouched only once when toggle is called multiple times', () => {
      // Given onTouched is registered
      component.registerOnTouched(mock.onTouched);

      // When the toggle() is called multiple times
      component.toggle();
      component.toggle();
      component.toggle();
      component.toggle();

      // Then it should call onTouched only once
      expect(mock.onTouched).toHaveBeenCalledTimes(1);
    });
  });
});
