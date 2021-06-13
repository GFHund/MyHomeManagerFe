import { Component, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent implements OnInit, ControlValueAccessor {

  @Input() options = [];
  @Input() label = '';
  labelClass = '';
  value = '';
  
  public propagateChange = Function.prototype;
	public propagateTouched = Function.prototype;

  constructor() { }

  ngOnInit(): void {
  }

  onKeyup(evt: Event){
    console.log(evt);
    this.value = (evt.target as HTMLInputElement).value;
    this.propagateChange((evt.target as HTMLInputElement).value);
    this.propagateTouched();
    if (this.value.length !== 0){
      this.labelClass = 'not-empty';
    } else {
      this.labelClass = '';
    }
  }

  public registerOnChange(fn: any) {
		this.propagateChange = fn;
	}
	public registerOnTouched(fn: any) {
		this.propagateTouched = fn;
  }
  public writeValue(value: any): void {
    this.value = value;
  }

  onClickOption(value: string){
    this.value = value;
    this.labelClass = 'not-empty';
    this.propagateChange(value);
		this.propagateTouched();
  }
}
