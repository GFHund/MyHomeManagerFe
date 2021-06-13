import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
	selector: 'app-form-input',
	templateUrl: './form-input.component.html',
	styleUrls: ['./form-input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: FormInputComponent,
			multi: true
		}
	]
})
export class FormInputComponent implements OnInit, ControlValueAccessor, OnChanges {

	@Input() type = 'text';
	@Input() label = '';
	labelClass = '';
	value = '';
	public propagateChange = Function.prototype;
	public propagateTouched = Function.prototype;

	constructor() { }

	ngOnInit(): void {
	}

	ngOnChanges(): void {
		if (this.value.length != 0) {
			this.labelClass = 'not-empty';
		}
		else {
			this.labelClass = '';
		}
	}

	public writeValue(value: any): void {
		this.value = value;
		if (this.value !== null) {
			if (this.value.length !== 0) {
				this.labelClass = 'not-empty';
			}
			else {
				this.labelClass = '';
			}
		}
	}
	public registerOnChange(fn: any) {
		this.propagateChange = fn;
	}
	public registerOnTouched(fn: any) {
		this.propagateTouched = fn;
	}
	public onChange(evt: Event) {
		let val = (<HTMLInputElement>evt.target).value;
		this.value = val;
		if (val.length != 0) {
			this.labelClass = 'not-empty';
		}
		else {
			this.labelClass = '';
		}
		this.propagateChange(val);
		this.propagateTouched();
	}
}
