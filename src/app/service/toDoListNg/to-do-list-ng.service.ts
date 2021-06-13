import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoListNg } from 'src/app/model/ToDoListNg';
import { ToDoListGet } from 'src/OpenApi';

@Injectable({
  providedIn: 'root'
})
export class ToDoListNgService {

  constructor() { }

  getList():Observable<ToDoListNg[]>{
    return new Observable<ToDoListNg[]>((subscriber) => {
      setTimeout(() => {
        const toDoLists = this.getMockup();
        let ret:ToDoListNg[] = [];
        for(let i in toDoLists){
          if(!toDoLists.hasOwnProperty(i)) continue;
          ret.push(this.convert(toDoLists[i]));
        }
        subscriber.next(ret);
      },1000);
    });
  }

  getItem(id:string):Observable<ToDoListNg>{
    return new Observable<ToDoListNg>((subscriber) => {
      setTimeout(() => {
        const toDoLists = this.getMockup();
        let toDoList = toDoLists.filter(item => item.id === id);
        if(toDoLists.length > 0){
          let toDoListNg = this.convert(toDoList[0]);
          subscriber.next(toDoListNg);
        } else {
          subscriber.error('Entity not Found');
        }
        
      });
    })
  }

  convert(toDoList:ToDoListGet):ToDoListNg{
    return {
      id: toDoList.id ?? '',
      title: toDoList.title ?? '',
      active: toDoList.active ?? false,
      items:[]
    };
  }
  getMockup():ToDoListGet[]{
    return [
      {id:'list1',title:'List 1',active:true},
      {id:'list2',title:'List 2',active:true},
      {id:'list3',title:'List 3',active:false},
    ];
  }
}
