import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ModalService } from 'src/app/service/modal/modal.service';

@Component({
  selector: 'app-index-component',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  onclick(){
    this.modalService.createModal({title:'Test',message:'Dies ist ein Test',okButtonEvent:()=>{
      this.modalService.closeModal();
    }});
  }

}
