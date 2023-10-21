import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'pg-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CheckboxComponent
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {

  public selected: boolean
  private onChange = (isSelected: boolean) => {};
  private onTouched = () => {};
  private touched = false;

  @Input()
  public disabled = false;

  constructor() { }

  public writeValue(isSelected: any): void {
    this.selected = !!isSelected
  }

  public registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  public setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  public toggle(): void {
    this.markAsTouched();
    if(!this.disabled) {
      this.selected = !this.selected;
      this.onChange(this.selected);
    }
  }

  private markAsTouched() {
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }
}
