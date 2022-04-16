import { RouterModule } from '@angular/router';
import { TabTableItemComponent } from './../component/tab-table-item/tab-table-item.component';
import { TabTableComponent } from './../component/tab-table/tab-table.component';
import { SearchInputComponent } from './../component/search-input/search-input.component';
import { ToastComponent } from 'src/app/component/toast/toast.component';
import { ModalComponent } from 'src/app/component/modal/modal.component';
import { CheckboxActionComponent } from './../component/checkbox-action/checkbox-action.component';
import { ActionButtonComponent } from './../component/action-button/action-button.component';
import { AccordeonComponent } from './../component/accordeon/accordeon.component';
import { LinkButtonComponent } from './../component/link-button/link-button.component';
import { IconComponent } from './../component/icon/icon.component';
import { SliderContainerComponent } from 'src/app/component/slider-container/slider-container.component';
import { SliderItemComponent } from './../component/slider-item/slider-item.component';
import { LoadingSpinnerComponent } from './../component/loading-spinner/loading-spinner.component';
import { LayoutFrameComponent } from './../component/layout-frame/layout-frame.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    LayoutFrameComponent,
    LoadingSpinnerComponent,
    SliderContainerComponent,
    SliderItemComponent,
    IconComponent,
    LinkButtonComponent,
    AccordeonComponent,
    ActionButtonComponent,
    CheckboxActionComponent,
    ModalComponent,
    ToastComponent,
    SearchInputComponent,
    TabTableComponent,
    TabTableItemComponent,
  ],
  exports: [
    LayoutFrameComponent,
    LoadingSpinnerComponent,
    SliderContainerComponent,
    SliderItemComponent,
    IconComponent,
    LinkButtonComponent,
    AccordeonComponent,
    ActionButtonComponent,
    CheckboxActionComponent,
    ModalComponent,
    ToastComponent,
    SearchInputComponent,
    TabTableComponent,
    TabTableItemComponent,
  ]
})
export class CommonComponentModule{}
