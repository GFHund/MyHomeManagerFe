import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MhmFormsModule } from './mhm-forms.module';
import { CommonComponentModule } from './common-component.module';
import { Routes, RouterModule } from '@angular/router';
import { AppSettingComponent } from './../page/app-setting/app-setting.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {path: '', component: AppSettingComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), CommonComponentModule, MhmFormsModule, FormsModule],
  exports: [RouterModule],
  declarations: [
    AppSettingComponent,
  ]
})
export class AppSettingsModule{}
