import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './page/index/index.component';


const routes: Routes = [
{path: '', component: IndexComponent},
{path: 'login', loadChildren: () => import('src/app/page/login/login.module').then(m => m.LoginModule)},
{path: 'shopping-list', loadChildren: () => import('src/app/module/shopping-list.module').then(m => m.ShoppingListModule)},
{path: 'recipe', loadChildren: () => import('src/app/module/recipe.module').then(m => m.RecipeModule)},
{path: 'product', loadChildren: () => import('src/app/module/product.module').then(m => m.ProductModule)},
{path: 'todo', loadChildren: () => import('src/app/module/to-do.module').then(m => m.ToDoModule)},
{path: 'wiki', loadChildren: () => import('src/app/module/wiki.module').then(m => m.WikiModule)},
{path: 'magazine', loadChildren: () => import('src/app/module/magazine.module').then(m => m.MagazineModule)},
{path: 'user-managment', loadChildren: () => import('src/app/module/user-managment.module').then(m => m.UserManagmentModule)},
{path: 'app-settings', loadChildren: () => import('src/app/module/app-settings.module').then(m => m.AppSettingsModule)},
{path: 'settings', loadChildren: () => import('src/app/module/settings.module').then(m => m.SettingsModule)},
{path: 'traffic', loadChildren: () => import('src/app/module/traffic.module').then(m => m.TrafficModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
