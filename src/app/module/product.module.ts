import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MhmFormsModule } from './mhm-forms.module';
import { CommonComponentModule } from './common-component.module';
import { Routes, RouterModule } from '@angular/router';
import { ProductEditComponent } from './../page/product-edit/product-edit.component';
import { ProductListComponent } from './../page/product-list/product-list.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {path: 'list', component: ProductListComponent},
  {path: ':id/edit', component: ProductEditComponent},
  {path: 'new', component: ProductEditComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), CommonComponentModule, MhmFormsModule, FormsModule],
  exports: [RouterModule],
  declarations: [
    ProductListComponent,
    ProductEditComponent,
  ]
})
export class ProductModule{}
