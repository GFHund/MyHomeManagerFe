import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './api/auth.service';
import { IncredientService } from './api/incredient.service';
import { MagazinesService } from './api/magazines.service';
import { ProductService } from './api/product.service';
import { RecipeService } from './api/recipe.service';
import { SettingService } from './api/setting.service';
import { ShoppingListService } from './api/shoppingList.service';
import { TodoService } from './api/todo.service';
import { UserService } from './api/user.service';
import { WikiService } from './api/wiki.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
