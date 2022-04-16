import { CommonComponentModule } from './../../module/common-component.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";

const routes: Routes = [
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonComponentModule, FormsModule],
  exports: [RouterModule],
  declarations:[
    LoginComponent
  ]
})
export class LoginModule{}
