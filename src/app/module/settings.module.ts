import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MhmFormsModule } from './mhm-forms.module';
import { CommonComponentModule } from './common-component.module';
import { Routes, RouterModule } from '@angular/router';
import { SettingListComponent } from './../component/setting-list/setting-list.component';
import { SettingComponent } from './../page/setting/setting.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {path: '', component: SettingComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, CommonComponentModule, MhmFormsModule],
  exports: [RouterModule],
  declarations: [
    SettingComponent,
    SettingListComponent,
  ]
})
export class SettingsModule{}
