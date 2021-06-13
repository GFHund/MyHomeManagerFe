import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox-action',
  templateUrl: './checkbox-action.component.html',
  styleUrls: ['./checkbox-action.component.scss']
})
export class CheckboxActionComponent implements OnInit {

  @Input() label: string = '';
  @Output() onClickEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(bChecked: boolean){
    console.log(bChecked);
    this.onClickEvent.emit(bChecked);
  }

}
