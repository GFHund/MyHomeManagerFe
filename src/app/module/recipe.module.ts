import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MhmFormsModule } from './mhm-forms.module';
import { RecipeStepEditComponent } from './../component/recipe-step-edit/recipe-step-edit.component';
import { RecipeIncredientEditComponent } from './../component/recipe-incredient-edit/recipe-incredient-edit.component';
import { CommonComponentModule } from './common-component.module';
import { RecipeEditComponent } from './../page/recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './../page/recipe-list/recipe-list.component';
import { RecipeShowComponent } from './../page/recipe-show/recipe-show.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {path: '', component: RecipeListComponent},
  {path: ':id/view', component: RecipeShowComponent},
  {path: ':id/edit', component: RecipeEditComponent},
  {path: 'new', component: RecipeEditComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, CommonComponentModule, MhmFormsModule],
  exports: [RouterModule],
  declarations: [
    RecipeListComponent,
    RecipeShowComponent,
    RecipeEditComponent,
    RecipeIncredientEditComponent,
    RecipeStepEditComponent,
  ]
})
export class RecipeModule{}
