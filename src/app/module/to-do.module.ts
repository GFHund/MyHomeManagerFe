import { CommonModule } from '@angular/common';
import { MhmFormsModule } from './mhm-forms.module';
import { CommonComponentModule } from './common-component.module';
import { RouterModule, Routes } from '@angular/router';
import { ToDoListViewComponent } from './../page/to-do-list-view/to-do-list-view.component';
import { ToDoListOverviewComponent } from './../page/to-do-list-overview/to-do-list-overview.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {path: 'list', component: ToDoListOverviewComponent},
  {path: ':id/view', component: ToDoListViewComponent},
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), CommonComponentModule],
  exports: [RouterModule],
  declarations: [
    ToDoListOverviewComponent,
    ToDoListViewComponent,
  ]
})
export class ToDoModule{}
