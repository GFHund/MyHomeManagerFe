import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChildren, Input, OnChanges, OnInit, QueryList } from '@angular/core';
import { SliderItemComponent } from '../slider-item/slider-item.component';
import { TabTableItemComponent } from '../tab-table-item/tab-table-item.component';

@Component({
  selector: 'app-slider-container',
  templateUrl: './slider-container.component.html',
  styleUrls: ['./slider-container.component.scss']
})
export class SliderContainerComponent implements OnInit, AfterContentInit,AfterViewInit,OnChanges {

  @ContentChildren(SliderItemComponent,{descendants:true}) sliderItems!: QueryList<SliderItemComponent>;
  @ContentChildren(TabTableItemComponent,{descendants:true}) tabItems!: QueryList<TabTableItemComponent>;
  @Input() table:boolean = false;
  selectedItem = 0;

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterContentInit(){
  }
  ngAfterViewInit(){
    this.setSlideActive();
    this.addOnClickOnTabItems();
  }
  ngOnChanges(){
    
  }

  setSlideActive(){
    let i = 0;
    for(const slider of this.sliderItems){
      if(i == this.selectedItem){
        slider.setShow(true);
      } else {
        slider.setShow(false);
      }
      i++;
    }
  }

  slideLeft(){
    console.log('slideLeft');
    this.selectedItem--;
    /*
    if(this.selectedItem >= this.sliderItems.length){
      this.selectedItem = 0;
    }
    */
   if(this.selectedItem < 0){
     this.selectedItem = 0;
   }
    this.setSlideActive();
  }
  slideRight(){
    console.log('slideRight');
    this.selectedItem++;
    /*
    if(this.selectedItem < 0){
      this.selectedItem = this.sliderItems.length - 1;
    }
    */
   if(this.selectedItem >= this.sliderItems.length){
    this.selectedItem = this.sliderItems.length - 1;
   }
    this.setSlideActive();
  }

  selectActiveSlide(slideNum:number){
    this.selectedItem = slideNum;
    this.setSlideActive();
  }
  addOnClickOnTabItems(){
    for(const tabItems of this.tabItems){
      let observersLength = tabItems.onclick.observers.length;
      if(observersLength <= 0){
        tabItems.onclick.subscribe((index) => {
          console.log('tabItemInSliderContainerCLick');
          this.selectedItem = index;
          this.setSlideActive();
        });
      }
      
      
    }
  }
  update(){
    this.addOnClickOnTabItems();
  }
}
