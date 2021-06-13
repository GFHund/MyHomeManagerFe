import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  set(key:string,value:string){
    if(window.sessionStorage){
      window.sessionStorage.setItem(key,value);
    }
  }
  get(key:string):string|null{
    if(window.sessionStorage){
      return window.sessionStorage.getItem(key);
    }
    return null;
  }
}
