import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider-item',
  templateUrl: './slider-item.component.html',
  styleUrls: ['./slider-item.component.scss']
})
export class SliderItemComponent implements OnInit,OnChanges {
  @Input() label:string = '';
  show:boolean = false;
  preShow:boolean = false;

  constructor(private cd:ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  ngOnChanges(){
    //this.show = this.preShow;
  }

  setShow(bValue:boolean){
    //this.preShow = bValue;
    this.show = bValue;
    this.cd.detectChanges();
  }
  getLabel(){
    return this.label;
  }

}
