import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent } from '@angular/common/http';
import { SessionStorageService } from 'src/app/service/sessionStorage/session-storage.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private sessionStorage: SessionStorageService) { }

  intercept(req: HttpRequest<any>,next: HttpHandler):Observable<HttpEvent<any>>{
    console.log('drin Interceptor');
    let token = this.sessionStorage.get('token');
    console.log(token);
    let newReq;
    if(token !== null){
      newReq = req.clone({headers: req.headers.set('Authorization','Bearer ' + token)});
    } else {
      newReq = req;
    }
    
    return next.handle(newReq);
  }
}
