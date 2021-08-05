import { Injectable } from '@angular/core';
import { Observable, forkJoin, combineLatest, Subscriber } from 'rxjs';
import {ShoppingListService } from 'src/OpenApi/api/shoppingList.service';
import { ShoppingList } from 'src/OpenApi/model/shoppingList';
import { ShoppingListGet, ShoppingListMappingGet, ProductGet, ShoppingListWrite, ShoppingListMappingWrite } from 'src/OpenApi';
import { ShoppingListProductNg} from 'src/app/model/ShoppingListProductNg';
import { mergeMap, map, tap } from 'rxjs/operators'
import { FormSelectInterface, SelectOptions } from 'src/app/interfaces/formSelectInterface';
import { ShoppingListNg } from 'src/app/model/ShoppingListNg';
import { ShoppingListProductGet } from 'src/OpenApi/model/shoppingListProductGet';
import { ProductNgService } from '../productNg/product-ng.service';
import { ProductNg } from 'src/app/model/ProductNg';
import { AppSettingsService } from '../appSettings/app-settings.service';
import { AppModes } from 'src/app/model/AppSettings';
import { LocalStorageService } from '../localStorage/local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class ShoppingListNgService implements FormSelectInterface {

  constructor(public shoppingList:ShoppingListService,
    public productService:ProductNgService,
    private appSetting:AppSettingsService,
    private localStorage:LocalStorageService) { 
      this.shoppingList.configuration.basePath = 'http://127.0.0.1:8080';
    }
  //--------------------------------------------------------------------
  getList(): Observable<ShoppingListNg[]> {
    return this.appSetting.getMode().pipe(mergeMap((mode) => {
      var observable: Observable<ShoppingListGet[]>;
      if(mode == AppModes.DEMO){
        observable = new Observable<ShoppingListGet[]>(subscriber => {
          setTimeout(() => {
            subscriber.next([
              {id: 'sl250221', title: '25.02.21'},
              {id: 'sl180221', title: '18.02.21'},
              {id: 'sl110221', title: '11.02.21'},
              {id: 'sl040221', title: '04.02.21'}
            ] as ShoppingList[]);
          }, 1000);
        });
      } else if(mode == AppModes.OFFLINE){
        observable = new Observable<ShoppingListNg[]>((subscriber) => {
          let sObj = this.localStorage.get('ShoppingList').subscribe((sObj) => {
            if(sObj === null){
              subscriber.next([]);
            } else {
              let oObj = JSON.parse(sObj);
              let ret:ShoppingListNg[] = oObj.obj as ShoppingListNg[];
              subscriber.next(ret);
            }
            
          },(error) => {
            subscriber.error('offline Data not found');
          });
        });
      }
      else {
        observable = this.shoppingList.getShoppingLists().pipe(tap((shoppingList) => {
          let cacheObj = {time:((new Date()).getTime() / 1000),obj:shoppingList};
            let sCacheObj = JSON.stringify(cacheObj);
            this.localStorage.set('ShoppingList',sCacheObj);
        }));
      }
      return observable.pipe(map((shoppingLists:ShoppingListGet[]) => {
        let ret: ShoppingListNg[] = [];
        for(let index in shoppingLists){
          if(!shoppingLists.hasOwnProperty(index)){
            continue;
          }
          ret.push({id:shoppingLists[index].id??'',title:shoppingLists[index].title??''});
        }
        return ret;
      }));
    }))
  }
  //--------------------------------------------------------------------
  delete(id: string): void{

  }
  //--------------------------------------------------------------------
  get(id: string): Observable<ShoppingListNg>{
    return this.appSetting.getMode().pipe(mergeMap((mode) => {
      let observable: Observable<ShoppingListGet>
      if(mode == AppModes.DEMO){
        observable = new Observable<ShoppingListGet>(subscriber => {
          setTimeout(()=> {
            if (id === 'sl250221'){
              subscriber.next({
                id: 'sl250221',
                title: '18.02.21'
              } as ShoppingListGet);
            }
          }, 1000);
        })
      } else if(mode == AppModes.OFFLINE){
        observable = new Observable<ShoppingListGet>((subscriber)=>{
          let sObj = this.localStorage.get('ShoppingList'+id).subscribe((sObj) => {
            if(sObj === null){
              subscriber.next({id:'',title:''});
            } else {
              let oObj = JSON.parse(sObj);
              let ret:ShoppingListGet = oObj.obj as ShoppingListGet;
              subscriber.next(ret);
            }
            
          },(error) => {
            subscriber.error('offline Data not found');
          });
        });
      } else {
        observable = this.shoppingList.getShoppingList(id).pipe(tap((shoppingList) => {
          let cacheObj = {time:((new Date()).getTime() / 1000),obj:shoppingList};
          let sCacheObj = JSON.stringify(cacheObj);
          this.localStorage.set('ShoppingList'+id,sCacheObj);
        }));
      }
      return observable.pipe(map((shoppingList:ShoppingListGet) => {
        return this.convert(shoppingList);
      }))
    }));
  }
  //--------------------------------------------------------------------
  private getMappings(id: string): Observable<ShoppingListMappingGet[]>{
    return this.appSetting.getMode().pipe(mergeMap((mode) => {
      if(mode == AppModes.DEMO){
        return new Observable<ShoppingListMappingGet[]>(subscriber => {
          setTimeout(() => {
            console.log('drinMapping');
            subscriber.next([{
              amount: 250,
              unit: 'g',
              productId: 'linsen',
              shoppingListId: 'sl250221'
            }, {
              amount: 1,
              unit: 'Flasche',
              productId: 'brennweinessig',
              shoppingListId: 'sl250221'
            }
            ] as ShoppingListMappingGet[]);
          }, 1000);
        });
      } else if(mode == AppModes.OFFLINE){
        return new Observable<ShoppingListMappingGet[]>((subscriber)=>{
          let sObj = this.localStorage.get('ShoppingListMapping'+id).subscribe((sObj) => {
            if(sObj === null){
              subscriber.next([]);
            } else {
              let oObj = JSON.parse(sObj);
              let ret:ShoppingListMappingGet[] = oObj.obj as ShoppingListMappingGet[];
              subscriber.next(ret);
            }
            
          },(error) => {
            subscriber.error('offline Data not found');
          });
        });
      } else {
        return this.shoppingList.getShoppingListMapping(id).pipe(tap((mapping) => {
          let cacheObj = {time:((new Date()).getTime() / 1000),obj:mapping};
          let sCacheObj = JSON.stringify(cacheObj);
          this.localStorage.set('ShoppingListMapping'+id,sCacheObj);
        }));
      }
    }));
    //this.shoppingList.getShoppingListMapping();
    if(true){
      
    }else {
      
    }
  }
  //--------------------------------------------------------------------
  private getProducts(id: string): Observable<ProductGet[]>{
    return this.appSetting.getMode().pipe(mergeMap((mode) => {
      if(mode == AppModes.DEMO){
        return new Observable<ProductGet[]>(subscriber => {
          setTimeout(() => {
            console.log('drinProducts');
            subscriber.next([{
                id: 'linsen',
                productName: 'Linsen'
              }, {
                id: 'brennweinessig',
                productName: 'Brennweisessig'
              }
            ] as ProductGet[]);
          }, 1000);
        });
      } else if(mode == AppModes.OFFLINE){
        return new Observable<ProductGet[]>((subscriber) => {
          let sObj = this.localStorage.get('ShoppingListProducts'+id).subscribe((sObj) => {
          if(sObj === null){
            subscriber.next([]);
          } else {
            let oObj = JSON.parse(sObj);
            let ret:ProductGet[] = oObj.obj as ProductGet[];
            subscriber.next(ret);
          }
          
          },(error) => {
            subscriber.error('offline Data not found');
          });
        })
      } else {
        return this.shoppingList.getShoppingListProducts(id).pipe(tap((products) => {
          let cacheObj = {time:((new Date()).getTime() / 1000),obj:products};
          let sCacheObj = JSON.stringify(cacheObj);
          this.localStorage.set('ShoppingListProducts'+id,sCacheObj);
        }));
      }
    }));
  }
//--------------------------------------------------------------------
  getShoppingListItems(id: string): Observable<ShoppingListProductNg[]>{
    let observable: Observable<ShoppingListMappingGet[]>;
    observable = this.getMappings(id);
    
    return observable
    .pipe(
      mergeMap((mappings) => {
        //console.log(mappings);
        
        return this.getProducts(id).pipe(map((products) => {
          let ret: ShoppingListProductNg[] = [];
          for (const index in mappings){
            if (!mappings.hasOwnProperty(index)) {
              continue;
            }
            const obj: ShoppingListProductNg = {
              amount: mappings[index].amount??0,
              unit: mappings[index].unit??'',
              productTitle: '',
              productId:'',
              id:mappings[index].id ?? '',
              shoppingListId:id
            };
  
            for (const index2 in products){
              if (!products.hasOwnProperty(index2)){
                continue;
              }
              console.log(products[index2].id);
              console.log(mappings[index].productId);
              if (products[index2].id === mappings[index].productId){
                obj.productTitle = (products[index2].productName) ?? '';
                obj.productId = (products[index2].id) ?? '';
                console.log(products);
                console.log(index2);
                console.log(obj);
                break;
              }
            }
            ret.push(obj);
          }
          console.log(ret);
          return ret;
        }));
        
      }))
  }
  //--------------------------------------------------------------------
  getSelectOptions(search:string):Observable<SelectOptions[]>{
    return new Observable<SelectOptions[]>(subscriber => {
      setTimeout(()=>{
        const options = [
          {
            id: 'sl250221',
            text: '18.02.21'
          }
        ];
        subscriber.next(options);
      },1000);
    })
  }
  //--------------------------------------------------------------------
  getLabelFromId(id:string):Observable<string>{
    return this.get(id).pipe(map((shoppingList:ShoppingListNg) => {
      return shoppingList.title;
    }));
  }
  //--------------------------------------------------------------------
  addShoppingList(newShoppingList:ShoppingListNg){
    return this.appSetting.getMode().pipe(mergeMap((mode) => {
      let data: ShoppingListWrite = {title:newShoppingList.title};
      let observable: Observable<ShoppingListGet>;
      if(mode == AppModes.DEMO){
        newShoppingList.id = newShoppingList.title;
        return new Observable<ShoppingListNg>(subscriber => {
          setTimeout(() => {
            subscriber.next(newShoppingList);
          },1000);
        });
      } else if(mode == AppModes.OFFLINE){
        return new Observable<ShoppingListNg>((subscriber) => {
          subscriber.error('App is in offline mode');
        });
      } else {
        return this.shoppingList.createShoppingList(data).pipe(map(
          (returnSl:ShoppingListGet)=>{
            return {id: returnSl.id??'',title:returnSl.title??''};
          })
        );
      }
    }));
  }
  //--------------------------------------------------------------------
  updateShoppingList(newShoppingList:ShoppingListNg){
    return new Observable<void>(subscriber => {
			setTimeout(() => {
				subscriber.next();
			},1000);
		});
  }
  //--------------------------------------------------------------------
  private convert(shoppingList: ShoppingListGet){
    const ret: ShoppingListNg = {
      id: shoppingList.id ?? '',
      title: shoppingList.title ?? ''
    }
    return ret;
  }
  //--------------------------------------------------------------------
  addShoppingListMapping(newMapping:ShoppingListProductNg):Observable<ShoppingListProductNg>{
    let write: ShoppingListMappingWrite = {amount:newMapping.amount,unit:newMapping.unit};
    return this.shoppingList.createShoppingListProduct(newMapping.shoppingListId,newMapping.productId,write)
    .pipe(map((createdObj:ShoppingListMappingGet) => {
      return {
        id:createdObj.id??'',
        amount:createdObj.amount??'',
        productId: createdObj.productId??'',
        productTitle:'',
        shoppingListId:createdObj.shoppingListId??'',
        unit:createdObj.unit??''
      } as ShoppingListProductNg;
    },mergeMap((createdObj:ShoppingListProductNg) => {
      return this.productService.getProduct(createdObj.productId)
      .pipe(map((product:ProductNg) => {
        createdObj.productTitle = product.productName;
        return createdObj;
      }))
    })));
    /*
    return new Observable<ShoppingListProductNg>(subscriber => {
      setTimeout(() => {
        subscriber.next(newMapping);
      },1000);
    })
    */
  }
  //--------------------------------------------------------------------
  updateShoppingListMapping(newMapping:ShoppingListProductNg):Observable<void>{
    return new Observable<void>(subscriber => {
      setTimeout(() => {
        subscriber.next();
      },1000);
    })
  }
}
