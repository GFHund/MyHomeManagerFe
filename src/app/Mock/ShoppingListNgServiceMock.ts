import { Observable } from "rxjs";
import { SelectOptions } from "../interfaces/formSelectInterface";
import { ShoppingListNg } from "../model/ShoppingListNg";
import { ShoppingListProductNg } from "../model/ShoppingListProductNg";

export class ShoppingListNgServiceMock{
    getList(): Observable<ShoppingListNg[]> {
        return new Observable<ShoppingListNg[]>(subscriber => {          
            subscriber.next([
            {id: 'sl250221', title: '25.02.21'},
            {id: 'sl180221', title: '18.02.21'},
            {id: 'sl110221', title: '11.02.21'},
            {id: 'sl040221', title: '04.02.21'}
            ] as ShoppingListNg[]);
          });
    }
    delete(id: string): void{}
    get(id: string): Observable<ShoppingListNg>{
        return new Observable<ShoppingListNg>(subscriber => {
            if (id === 'sl250221'){
                subscriber.next({
                    id: 'sl250221',
                    title: '18.02.21'
                } as ShoppingListNg);
            }
            
          })
    }

    getShoppingListItems(id: string): Observable<ShoppingListProductNg[]>{
        return new Observable<ShoppingListProductNg[]>(subscriber => {
            subscriber.next([
                {
                    id:'abc123',
                    amount:5,
                    productId:'abc123',
                    productTitle:'productTitle',
                    shoppingListId:'abc123',
                    unit:'g',
                    active:true
                }
            ]);
        });
    }
    /*
    getSelectOptions(search:string):Observable<SelectOptions[]>{}
    getLabelFromId(id:string):Observable<string>{}
    addShoppingList(newShoppingList:ShoppingListNg){}
    updateShoppingList(newShoppingList:ShoppingListNg){}
    addShoppingListMapping(newMapping:ShoppingListProductNg):Observable<ShoppingListProductNg>{}
    updateShoppingListMapping(newMapping:ShoppingListProductNg):Observable<void>{}
    */
}