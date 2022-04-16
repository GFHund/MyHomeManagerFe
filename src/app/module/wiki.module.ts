import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MhmFormsModule } from './mhm-forms.module';
import { CommonComponentModule } from './common-component.module';
import { RouterModule, Routes } from '@angular/router';
import { Mk2htmlPipe } from 'src/app/pipe/mk2html.pipe';
import { WikiShowComponent } from './../page/wiki-show/wiki-show.component';
import { WikiEditComponent } from './../page/wiki-edit/wiki-edit.component';
import { WikiListComponent } from './../page/wiki-list/wiki-list.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {path: 'list', component: WikiListComponent},
  {path: 'new', component: WikiEditComponent},
  {path: ':id/edit', component: WikiEditComponent},
  {path: ':id/view', component: WikiShowComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), CommonComponentModule, MhmFormsModule, FormsModule],
  exports: [RouterModule],
  declarations: [
    WikiListComponent,
    WikiEditComponent,
    WikiShowComponent,
    Mk2htmlPipe,
  ]
})
export class WikiModule{}
