import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.scss'],
  providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: FormTextareaComponent,
			multi: true
		}
	]
})
export class FormTextareaComponent implements OnInit, ControlValueAccessor {

  	@Input() label = '';
  	value = '';
	public propagateChange = Function.prototype;
	public propagateTouched = Function.prototype;

  	constructor() { }

  	ngOnInit(): void {
  	}
  	public writeValue(value: any): void {
		this.value = value;
	}
	public registerOnChange(fn: any) {
		this.propagateChange = fn;
	}
	public registerOnTouched(fn: any) {
		this.propagateTouched = fn;
	}
	public onChange(evt: Event) {
	
		let val = (<HTMLTextAreaElement>evt.target).value;
		console.log(val);
		this.value = val;
		this.propagateChange(val);
		this.propagateTouched();
	}
}
