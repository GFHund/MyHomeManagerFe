import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { ToastComponent } from 'src/app/component/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef:ApplicationRef,
    private injector: Injector
  ) { }

  createToast(message:string,timeShown?:number):Promise<void>{
    const toastComponent = this.componentFactoryResolver
    .resolveComponentFactory(ToastComponent).create(this.injector);

    toastComponent.instance.message = message;

    this.appRef.attachView(toastComponent.hostView);

    const domElem = (toastComponent.hostView as EmbeddedViewRef<any>)
    .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);

    const timeoutTime = timeShown ? timeShown:5000;
    return new Promise((resolve,rejects) => {
      setTimeout(()=>{
        this.appRef.detachView(toastComponent.hostView);
        toastComponent.destroy();
        resolve();
      },timeoutTime);
    })
    
  }
}
