export * from './auth.service';
import { AuthService } from './auth.service';
export * from './incredient.service';
import { IncredientService } from './incredient.service';
export * from './magazines.service';
import { MagazinesService } from './magazines.service';
export * from './product.service';
import { ProductService } from './product.service';
export * from './recipe.service';
import { RecipeService } from './recipe.service';
export * from './setting.service';
import { SettingService } from './setting.service';
export * from './shoppingList.service';
import { ShoppingListService } from './shoppingList.service';
export * from './todo.service';
import { TodoService } from './todo.service';
export * from './user.service';
import { UserService } from './user.service';
export * from './wiki.service';
import { WikiService } from './wiki.service';
export const APIS = [AuthService, IncredientService, MagazinesService, ProductService, RecipeService, SettingService, ShoppingListService, TodoService, UserService, WikiService];