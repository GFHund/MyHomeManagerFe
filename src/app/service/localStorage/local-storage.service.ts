import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(key:string,value:string){
    if(window.localStorage){
      window.localStorage.setItem(key,value);
    }
  }
  get(key:string): string|null{
    if(window.localStorage){
      return window.localStorage.getItem(key);
    }
    return null;
  }
}
