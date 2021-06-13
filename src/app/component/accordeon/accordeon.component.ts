import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-accordeon',
  templateUrl: './accordeon.component.html',
  styleUrls: ['./accordeon.component.scss']
})
export class AccordeonComponent implements OnInit {

  @Input() title = '';
  accordeonOpen = false;
  accordeonPercentOpen = '';
  accordeonValueOpen = 0;
  intervalNumber = 0;
  accordeonClass = 'accordeon-content';
  @ViewChild('content') content?: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onClickOpenAccordeon(){
    this.accordeonOpen = !this.accordeonOpen;
    if (this.accordeonOpen){
     if (this.content){
       let children = this.content.nativeElement.children;
       let height = 0;
       for (let i in children){
          if (!children.hasOwnProperty(i)) {
            continue;
          }
          height += children[i].offsetHeight;
       }
       this.accordeonPercentOpen = height + 'px';
       setTimeout(() => {
        this.accordeonClass = 'accordeon-content accordeon-open';
       },500);
       
     }
    } else {
      
      setTimeout(() => {
        this.accordeonPercentOpen = 0 + 'px';
      },500);
      this.accordeonPercentOpen = this.getContentHeight() + 'px';
      this.accordeonClass = 'accordeon-content';
    }
    
  }
  getContentHeight(){
    let height = 0;
    if (this.content){
      let children = this.content.nativeElement.children;
      for (let i in children){
        if (!children.hasOwnProperty(i)) {
          continue;
        }
        height += children[i].offsetHeight;
      }
    }
    return height;
  }
}
