import { MhmFormsModule } from './module/mhm-forms.module';
import { CommonComponentModule } from './module/common-component.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiModule } from 'src/OpenApi';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IndexComponent } from './page/index/index.component';
import { FormsModule } from '@angular/forms';
import { ListItemComponent } from './component/list-item/list-item.component';
import { AuthInterceptorService } from './core/interceptor/auth-interceptor.service';
import { ErrorInterceptorService } from './core/interceptor/error-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ListItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
		ApiModule,
		HttpClientModule,
		FormsModule,
    CommonComponentModule,
    MhmFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService,multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
