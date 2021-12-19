import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormSelectInterface, SelectOptions } from 'src/app/interfaces/formSelectInterface';

@Component({
  selector: 'app-form-entity-select',
  templateUrl: './form-entity-select.component.html',
  styleUrls: ['./form-entity-select.component.scss'],
  providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: FormEntitySelectComponent,
			multi: true
		}
	]
})
export class FormEntitySelectComponent implements OnInit, ControlValueAccessor {

  @Input() entityService?:FormSelectInterface;
  @Input() label = '';
  labelClass = '';
  public propagateChange = Function.prototype;
	public propagateTouched = Function.prototype;
  shownValue = '';
  value = '';
  selectedValue: SelectOptions = {id:'',text:''};
  options:SelectOptions[] = [];

  searchText='';
  openSelect = false;
  debounceObservable = new Subject<string>();

  constructor() { }

  ngOnInit(): void {
    if(this.value.length > 0){
      this.labelClass = 'not-empty';
    }
    this.debounceObservable.pipe(debounceTime(400),distinctUntilChanged()).subscribe((inputValue:string) => {
      this.entityService?.getSelectOptions(inputValue).subscribe((options:SelectOptions[])=>{
        //console.log(options);
        this.options = options;
      });
    });
  }

  onKeyup(evt: Event){
    console.log(evt);
    //this.value = (evt.target as HTMLInputElement).value;
    let value = (evt.target as HTMLInputElement).value;
    
    if(this.value.length > 0){
      this.labelClass = 'not-empty';
    }
    
    this.debounceObservable.next(value);
    
    
  }

  public registerOnChange(fn: any) {
		this.propagateChange = fn;
	}
	public registerOnTouched(fn: any) {
		this.propagateTouched = fn;
  }
  public writeValue(value: string): void {
    //this.value = value;
    this.value = value;
    //this.selectedValue = value;
    if(this.value){
      this.entityService?.getLabelFromId(this.value).subscribe((label:string) => {
        this.shownValue = label;
        this.labelClass = 'not-empty';
      });
    }
    
  }

  onClickOption(value: SelectOptions){
    
    this.value = value.text;
    this.shownValue = value.text;
    console.log(value);
    this.labelClass = 'not-empty';
    this.propagateChange(value.id);
		this.propagateTouched();
    this.openSelect = false;
  }

  toggleSelectMenu(){
    this.openSelect = ! this.openSelect;
  }
}
