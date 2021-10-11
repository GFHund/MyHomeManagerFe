import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tab-table-item',
  templateUrl: './tab-table-item.component.html',
  styleUrls: ['./tab-table-item.component.scss']
})
export class TabTableItemComponent implements OnInit {

  @Input() label = '';
  @Input() index:number = 0;
  @Output() onclick:EventEmitter<number> = new EventEmitter<number>();

  constructor() {
    
   }

  ngOnInit(): void {
  }


  onClick(){
    console.log('tabTableItemCLick');
    this.onclick.emit(this.index);
  }
}
