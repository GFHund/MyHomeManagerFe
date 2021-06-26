import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { ModalComponent } from 'src/app/component/modal/modal.component';
import { ModalConfig } from 'src/app/model/ModalConfig';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalComponent?:ComponentRef<ModalComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef:ApplicationRef,
    private injector: Injector
  ) { }

  createModal(modalConfig:ModalConfig){
    const componentFactory = this.componentFactoryResolver
    .resolveComponentFactory(ModalComponent);
    this.modalComponent = 
    componentFactory.create(this.injector);

    this.modalComponent.instance.modalConfig = modalConfig;

    this.appRef.attachView(this.modalComponent.hostView);

    const domElem = (this.modalComponent.hostView as EmbeddedViewRef<any>)
    .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
  }

  closeModal(){
    if(this.modalComponent){
      this.appRef.detachView(this.modalComponent?.hostView);
    }
    this.modalComponent?.destroy();
  }
}
