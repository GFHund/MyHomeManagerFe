import { RecipeEditComponent } from './page/recipe-edit/recipe-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './page/index/index.component';
import { LoginComponent } from './page/login/login.component';
import { RecipeListComponent } from './page/recipe-list/recipe-list.component';
import { RecipeShowComponent } from './page/recipe-show/recipe-show.component';
import { ShoppingListEditComponent } from './page/shopping-list-edit/shopping-list-edit.component';
import { ShoppingListViewComponent } from './page/shopping-list-view/shopping-list-view.component';
import { ShoppingListComponent } from './page/shopping-list/shopping-list.component';
import { ProductListComponent } from './page/product-list/product-list.component';
import { ProductEditComponent } from './page/product-edit/product-edit.component';
import { ToDoListOverviewComponent } from './page/to-do-list-overview/to-do-list-overview.component';
import { ToDoListViewComponent } from './page/to-do-list-view/to-do-list-view.component';
import { WikiListComponent } from './page/wiki-list/wiki-list.component';
import { UserManagmentListComponent } from './page/user-managment-list/user-managment-list.component';
import { SettingComponent } from './page/setting/setting.component';
import { MagazineListComponent } from './page/magazine-list/magazine-list.component';

const routes: Routes = [
{path: '', component: IndexComponent},
{path: 'login', component: LoginComponent},
{path: 'shopping-list', component: ShoppingListComponent},
{path: 'shopping-list/:id/view', component: ShoppingListViewComponent},
{path: 'shopping-list/:id/edit', component: ShoppingListEditComponent},
{path: 'shopping-list/new', component: ShoppingListEditComponent},
{path: 'recipe', component: RecipeListComponent},
{path: 'recipe/:id/view', component: RecipeShowComponent},
{path: 'recipe/:id/edit',component: RecipeEditComponent},
{path: 'recipe/new',component: RecipeEditComponent},
{path: 'product/list',component: ProductListComponent},
{path: 'product/:id/edit', component: ProductEditComponent},
{path: 'product/new', component: ProductEditComponent},
{path: 'todo/list', component: ToDoListOverviewComponent},
{path: 'todo/:id/view',component: ToDoListViewComponent},
{path: 'wiki/list',component: WikiListComponent},
{path: 'magazine',component: MagazineListComponent},
{path: 'user-managment/list', component: UserManagmentListComponent},
{path: 'settings',component: SettingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
