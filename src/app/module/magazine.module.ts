import { CommonModule } from '@angular/common';
import { MhmFormsModule } from './mhm-forms.module';
import { CommonComponentModule } from './common-component.module';
import { Routes, RouterModule } from '@angular/router';
import { MagazineEditComponent } from './../page/magazine-edit/magazine-edit.component';
import { MagazineListComponent } from './../page/magazine-list/magazine-list.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {path: '', component: MagazineListComponent},
  {path: ':id/edit', component: MagazineEditComponent},
];


@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), CommonComponentModule],
  exports: [RouterModule],
  declarations: [
    MagazineListComponent,
    MagazineEditComponent,
  ]
})
export class MagazineModule{}
