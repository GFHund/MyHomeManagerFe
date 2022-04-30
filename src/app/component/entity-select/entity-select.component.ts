import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { FormSelectInterface, SelectOptions } from "src/app/interfaces/formSelectInterface";

@Component({
    selector: 'app-entity-select',
    templateUrl: './entity-select.component.html',
    styleUrls: [ './entity-select.component.scss']
})
export class EntitySelectComponent implements OnInit{
    
    @Input() entityService?: FormSelectInterface;
    @Input() label = '';
    @Output('valueChanged') changeEvent: EventEmitter<string>;
    labelClass = '';
    shownValue = '';
    openSelect = false;
    searchText = '';
    debounceObservable = new Subject<string>();
    value = '';
    options: SelectOptions[] = [];

    constructor(){
        this.changeEvent = new EventEmitter<string>();
    }

    ngOnInit(): void {
        if (this.value.length > 0){
            this.labelClass = 'not-empty';
          }
          this.debounceObservable.pipe(debounceTime(400),distinctUntilChanged()).subscribe((inputValue:string) => {
            this.entityService?.getSelectOptions(inputValue).subscribe((options:SelectOptions[])=>{
              // console.log(options);
              this.options = options;
            });
          });
    }

    onKeyup(evt: Event){
        let value = (evt.target as HTMLInputElement).value;
    
        if(this.value.length > 0){
          this.labelClass = 'not-empty';
        }
    
        this.debounceObservable.next(value);
    }

    onClickOption(value: SelectOptions){

    this.value = value.text;
    this.shownValue = value.text;
    console.log(value);
    this.labelClass = 'not-empty';    
    this.openSelect = false;
    this.changeEvent.emit(this.value);

    }

    toggleSelectMenu(){
        this.openSelect = ! this.openSelect;
      }
}