import { CommonModule } from '@angular/common';
import { MhmFormsModule } from './mhm-forms.module';
import { CommonComponentModule } from './common-component.module';
import { Routes, RouterModule } from '@angular/router';
import { UserManagmentListComponent } from './../page/user-managment-list/user-managment-list.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {path: 'list', component: UserManagmentListComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    UserManagmentListComponent,
  ]
})
export class UserManagmentModule{}
