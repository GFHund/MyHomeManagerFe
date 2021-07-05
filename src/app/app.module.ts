import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiModule } from 'src/OpenApi';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShoppingListComponent } from './page/shopping-list/shopping-list.component';
import { ShoppingListViewComponent } from './page/shopping-list-view/shopping-list-view.component';
import { ShoppingListEditComponent } from './page/shopping-list-edit/shopping-list-edit.component';
import { LayoutFrameComponent } from './component/layout-frame/layout-frame.component';
import { IndexComponent } from './page/index/index.component';
import { IconComponent } from './component/icon/icon.component';
import { LoginComponent } from './page/login/login.component';
import { FormInputComponent } from './component/form-input/form-input.component';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './page/product-list/product-list.component';
import { ProductEditComponent } from './page/product-edit/product-edit.component';
import { RecipeListComponent } from './page/recipe-list/recipe-list.component';
import { RecipeShowComponent } from './page/recipe-show/recipe-show.component';
import { RecipeEditComponent } from './page/recipe-edit/recipe-edit.component';
import { FormSubmitComponent } from './component/form-submit/form-submit.component';
import { LinkButtonComponent } from './component/link-button/link-button.component';
import { AccordeonComponent } from './component/accordeon/accordeon.component';
import { ShoppingListMappingComponent } from './component/shopping-list-mapping/shopping-list-mapping.component';
import { FormSelectComponent } from './component/form-select/form-select.component';
import { RecipeIncredientEditComponent } from './component/recipe-incredient-edit/recipe-incredient-edit.component';
import { RecipeStepEditComponent } from './component/recipe-step-edit/recipe-step-edit.component';
import { ActionButtonComponent } from './component/action-button/action-button.component';
import { FormEntitySelectComponent } from './component/form-entity-select/form-entity-select.component';
import { FormTextareaComponent } from './component/form-textarea/form-textarea.component';
import { ToDoListOverviewComponent } from './page/to-do-list-overview/to-do-list-overview.component';
import { ToDoListViewComponent } from './page/to-do-list-view/to-do-list-view.component';
import { ListItemComponent } from './component/list-item/list-item.component';
import { WikiListComponent } from './page/wiki-list/wiki-list.component';
import { UserManagmentListComponent } from './page/user-managment-list/user-managment-list.component';
import { CheckboxActionComponent } from './component/checkbox-action/checkbox-action.component';
import { AuthInterceptorService } from './core/interceptor/auth-interceptor.service';
import { SettingComponent } from './page/setting/setting.component';
import { SettingListComponent } from './component/setting-list/setting-list.component';
import { FormCheckboxComponent } from './component/form-checkbox/form-checkbox.component';
import { MagazineListComponent } from './page/magazine-list/magazine-list.component';
import { MagazineEditComponent } from './page/magazine-edit/magazine-edit.component';
import { WikiEditComponent } from './page/wiki-edit/wiki-edit.component';
import { FormMarkdownEditorComponent } from './component/form-markdown-editor/form-markdown-editor.component';
import { WikiShowComponent } from './page/wiki-show/wiki-show.component';
import { Mk2htmlPipe } from './pipe/mk2html.pipe';
import { LoadingSpinnerComponent } from './component/loading-spinner/loading-spinner.component';
import { ModalComponent } from './component/modal/modal.component';
import { ToastComponent } from './component/toast/toast.component';
import { ErrorInterceptorService } from './core/interceptor/error-interceptor.service';
import { AppSettingComponent } from './page/app-setting/app-setting.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingListViewComponent,
    ShoppingListEditComponent,
    LayoutFrameComponent,
    IndexComponent,
    IconComponent,
    LoginComponent,
    FormInputComponent,
    ProductListComponent,
    ProductEditComponent,
    RecipeListComponent,
    RecipeShowComponent,
    RecipeEditComponent,
    FormSubmitComponent,
    LinkButtonComponent,
    AccordeonComponent,
    ShoppingListMappingComponent,
    FormSelectComponent,
    RecipeIncredientEditComponent,
    RecipeStepEditComponent,
    ActionButtonComponent,
    FormEntitySelectComponent,
    FormTextareaComponent,
    ToDoListOverviewComponent,
    ToDoListViewComponent,
    ListItemComponent,
    WikiListComponent,
    UserManagmentListComponent,
    CheckboxActionComponent,
    SettingComponent,
    SettingListComponent,
    FormCheckboxComponent,
    MagazineListComponent,
    MagazineEditComponent,
    WikiEditComponent,
    FormMarkdownEditorComponent,
    WikiShowComponent,
    Mk2htmlPipe,
    LoadingSpinnerComponent,
    ModalComponent,
    ToastComponent,
    AppSettingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	  ApiModule,
	  HttpClientModule,
	  FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService,multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
