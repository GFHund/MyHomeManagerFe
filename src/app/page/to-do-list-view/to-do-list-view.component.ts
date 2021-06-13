import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToDoListNg } from 'src/app/model/ToDoListNg';
import { ToDoListNgService } from 'src/app/service/toDoListNg/to-do-list-ng.service';

@Component({
  selector: 'app-to-do-list-view',
  templateUrl: './to-do-list-view.component.html',
  styleUrls: ['./to-do-list-view.component.scss']
})
export class ToDoListViewComponent implements OnInit {

  toDoList: ToDoListNg = {id:'',title:'',active:false,items:[]};

  constructor(private toDoListService:ToDoListNgService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.toDoListService.getItem(id).subscribe((entity) => {
        this.toDoList = entity;
      })
    })
  }

}
