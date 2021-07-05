import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ModalService } from 'src/app/service/modal/modal.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(public modalService:ModalService) { }

  intercept(req: HttpRequest<any>,next: HttpHandler):Observable<HttpEvent<any>>{
    return next.handle(req).pipe(catchError((err,caught) => {
      if(err.status == 401){
        this.modalService.createModal({
          title:'Nicht Authorisiert',
          message:'Anfrage schlug fehl weil sie nicht angemeldet sind',
          bShowCancelButton:false,
          okButtonEvent:()=>{this.modalService.closeModal()}
        });
      } else {
        this.modalService.createModal({
          title:'Fehler',
          message:'Bei der Anfrage an den Server gab es einen Fehler, Vergewissere dich, dass du mit dem Internet verbunden bist',
          bShowCancelButton:false,
          okButtonEvent:()=>{this.modalService.closeModal()}
        });
      }
      throw 'error';
    }));
  }
}
