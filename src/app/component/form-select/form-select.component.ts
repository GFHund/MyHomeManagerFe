import { Component, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
  providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: FormSelectComponent,
			multi: true
		}
	]
})
export class FormSelectComponent implements OnInit, ControlValueAccessor {

  @Input() options:string[] = [];
  @Input() label = '';
  labelClass = '';
  value = 0;
  shownValue = '';
  
  public propagateChange = Function.prototype;
	public propagateTouched = Function.prototype;

  constructor() { }

  ngOnInit(): void {
  }

  onKeyup(evt: Event){
    console.log(evt);
    this.shownValue = (evt.target as HTMLInputElement).value;
    this.propagateChange((evt.target as HTMLInputElement).value);
    this.propagateTouched();
    this.hasInput();
  }

  hasInput(){
    if (this.shownValue.length !== 0){
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
    if(!this.options.hasOwnProperty(value)) return;
    this.shownValue = this.options[value];
    this.hasInput();
  }

  onClickOption(value: number){
    this.value = value;
    this.shownValue = this.options[value];
    this.labelClass = 'not-empty';
    this.propagateChange(value);
		this.propagateTouched();
  }
}
