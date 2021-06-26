import { Component, Input, OnInit } from '@angular/core';
import { ModalConfig } from 'src/app/model/ModalConfig';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() modalConfig:ModalConfig = {title:'',message:''};
  constructor() { }

  ngOnInit(): void {}

  onOkClicked(){
    if(this.modalConfig.okButtonEvent){
      this.modalConfig.okButtonEvent();
    }
  }
  onCancelClicked(){
    if(this.modalConfig.cancelButtonEvent){
      this.modalConfig.cancelButtonEvent();
    }
  }
}
