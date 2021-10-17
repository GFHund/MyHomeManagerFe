import { Injectable } from '@angular/core';
import {Capacitor} from '@capacitor/core';
import { Storage } from '@capacitor/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(key:string,value:string){
    if(Capacitor.isNativePlatform()){
      Storage.set({key: key, value:''+value}).then(() => {
        Storage.keys().then((res)=>{ console.log(res)});
      },(reason) => {
        console.log(reason);
      });
      
    } else {
      if(window.localStorage){
        window.localStorage.setItem(key,value);
        console.log('save on local Storage');
      }
      else{
        console.log('Could not save setting');
      }
    }
    
  }

  get(key:string): Observable<string|null>{
    if(Capacitor.isNativePlatform()){
      console.log('get LocalStorage')
      console.log(key);
      return new Observable<string|null>((subscriber) => {
        Storage.get({key:key}).then((value) => {
          console.log(value);
          subscriber.next(value.value??'');
        }).catch((reason) => {
          subscriber.error(reason);
        });
      })
    } else {
      if(window.localStorage){
        return new Observable<string|null>((subscriber) => {
          let value = window.localStorage.getItem(key);
          
          if(value){
            subscriber.next(value)
          } else {
            //subscriber.error('key Not Found');
            subscriber.next(null);
          }
          
        })
        
      } else {
        return new Observable<string>((subscriber) => {
          Storage.get({key:key}).then((value) => {
            subscriber.next(value.value??'');
          }).catch((reason) => {
            subscriber.error(reason);
          });
        });
      }
    }
  }

  getBoolean(key:string):Observable<boolean|null>{
    return this.get(key).pipe(map((value) => {
      if(value === null){
        return value;
      }
      return key === 'true';
    }));
  }

  getNumber(key:string):Observable<number|null>{
    return this.get(key).pipe(map((value)=> {
      if(value === null){
        return value;
      }
      let iValue = parseInt(value);
      if(isNaN(iValue)){
        throw new Error('value is not a number Request Key: '+key);
      }else {
        return iValue;
      }
    }));
  }
}
