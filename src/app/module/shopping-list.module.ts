import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MhmFormsModule } from './mhm-forms.module';
import { ShoppingListMappingComponent } from './../component/shopping-list-mapping/shopping-list-mapping.component';
import { CommonComponentModule } from './common-component.module';
import { LayoutFrameComponent } from './../component/layout-frame/layout-frame.component';
import { ShoppingListEditComponent } from './../page/shopping-list-edit/shopping-list-edit.component';
import { ShoppingListViewComponent } from './../page/shopping-list-view/shopping-list-view.component';
import { ShoppingListComponent } from './../page/shopping-list/shopping-list.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {path: '', component: ShoppingListComponent},
  {path: ':id/view', component: ShoppingListViewComponent},
  {path: ':id/edit', component: ShoppingListEditComponent},
  {path: 'new', component: ShoppingListEditComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), CommonComponentModule, MhmFormsModule, FormsModule],
  exports: [RouterModule],
  declarations: [
    ShoppingListComponent,
    ShoppingListViewComponent,
    ShoppingListEditComponent,
    ShoppingListMappingComponent
  ]
})
export class ShoppingListModule{}
