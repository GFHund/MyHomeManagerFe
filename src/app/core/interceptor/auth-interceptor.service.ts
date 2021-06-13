import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent } from '@angular/common/http';
import { SessionStorageService } from 'src/app/service/sessionStorage/session-storage.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private sessionStorage: SessionStorageService) { }

  intercept(req: HttpRequest<any>,next: HttpHandler):Observable<HttpEvent<any>>{
    let token = this.sessionStorage.get('token');
    if(token !== null){
      req.headers.set('Authorization','Bearer ' + token);
    }
    
    return next.handle(req);
  }
}
