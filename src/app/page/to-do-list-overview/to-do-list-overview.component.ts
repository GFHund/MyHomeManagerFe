import { Component, OnInit } from '@angular/core';
import { ToDoListNg } from 'src/app/model/ToDoListNg';
import { ToDoListNgService } from 'src/app/service/toDoListNg/to-do-list-ng.service';

@Component({
  selector: 'app-to-do-list-overview',
  templateUrl: './to-do-list-overview.component.html',
  styleUrls: ['./to-do-list-overview.component.scss']
})
export class ToDoListOverviewComponent implements OnInit {

  toDoLists: ToDoListNg[] = [];

  constructor(private toDoListService:ToDoListNgService) { }

  ngOnInit(): void {
    this.toDoListService.getList().subscribe((toDoList) => {
      this.toDoLists = toDoList;
    });
  }

  onDelete(id:string){
    
  }

}
