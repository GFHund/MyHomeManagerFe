import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.scss'],
  providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: FormCheckboxComponent,
			multi: true
		}
	]
})
export class FormCheckboxComponent implements OnInit,ControlValueAccessor {

  @Input() label = '';
  @Input() disable: boolean = false;
  @ViewChild('checkbox') checkbox?: HTMLInputElement;
  public propagateChange = Function.prototype;
	public propagateTouched = Function.prototype;
  bValue = false;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(bChecked: boolean){
    console.log(bChecked);
    //this.onClickEvent.emit(bChecked);
    this.propagateChange(bChecked);
		this.propagateTouched();
  }

  public writeValue(value:boolean): void {
    console.log(this.checkbox);
    console.log(value);
    if(this.checkbox){
      //this.checkbox.checked = value;
      this.bValue = value;
    }
  }
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }
  public registerOnTouched(fn: any) {
    this.propagateTouched = fn;
  }
}
