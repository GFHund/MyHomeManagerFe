import { Injectable } from '@angular/core';
import { ProductService, ProductGet, ProductWrite } from 'src/OpenApi';
import { Observable } from 'rxjs';
import { mergeMap,map, tap } from 'rxjs/operators';
import { ProductNg } from 'src/app/model/ProductNg';
import { FormSelectInterface, SelectOptions } from 'src/app/interfaces/formSelectInterface';
import { AppSettingsService } from '../appSettings/app-settings.service';
import { AppModes } from 'src/app/model/AppSettings';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductNgService implements FormSelectInterface {

  constructor(public productService: ProductService,
    private appSetting:AppSettingsService,
    private localStorage:LocalStorageService) {
    this.productService.configuration.basePath = environment.serverUrl;
   }

  getList(ids?: string[]): Observable<ProductNg[]>{
    return this.appSetting.getMode().pipe(mergeMap((mode) => {
      let observable:Observable<ProductGet[]>;
      if(mode == AppModes.DEMO){
        observable = new Observable<ProductGet[]>(subscriber => {
          setTimeout(() => {
            const list = this.getMockData();
            if(ids){
              let ret = [];
              for(const i in ids){
                if(!ids.hasOwnProperty(i)){
                  continue;
                }
    
                for(const k in list){
                  if(!list.hasOwnProperty(k)){
                    continue;
                  }
    
                  if(ids[i] === list[k].id){
                    ret.push(list[k]);
                  }
                }
              }
              subscriber.next(ret);
            }else {
              subscriber.next(list);
            }
          }, 1000);
        });
      } else if(mode == AppModes.OFFLINE){
        observable = new Observable((subscriber) => {
          let sObj = this.localStorage.get('products').subscribe((sObj) => {
            if(sObj === null){
              subscriber.next([]);
            }else {
              let oObj = JSON.parse(sObj);
              let ret:ProductGet[] = oObj.obj as ProductGet[];
              subscriber.next(ret);
            }
            
          },(error) => {
            subscriber.error('offline Data not found');
          });
        });
      } else {
        observable = this.productService.getProducts().pipe(tap((products) => {
          let cacheObj = {time:((new Date()).getTime() / 1000),obj:products};
          let sCacheObj = JSON.stringify(cacheObj);
          this.localStorage.set('products',sCacheObj);
        }));
      }

      let observable2 = observable.pipe(map((products:ProductGet[]) => {
        let ret:ProductNg[] =[];
        for(const product in products){
          if(!products.hasOwnProperty(product)) continue;
          ret.push(this.convert(products[product]));
        }
        return ret;
      }));
      return observable2;
    }));
  }

  getProduct(productId:string): Observable<ProductNg>{
    return this.appSetting.getMode().pipe(mergeMap((mode) => {
      let observable:Observable<ProductGet>;
      if(mode == AppModes.DEMO){
        observable = new Observable<ProductGet>(subscriber => {
          setTimeout(() => {
            const list = this.getMockData();
            let ret = null;
            for(const k in list){
              if(!list.hasOwnProperty(k)){
                continue;
              }
              if(list[k].id === productId){
                ret = list[k];
              }
            }
            if(ret){
              subscriber.next(ret);
            } else {
              subscriber.next({id: 'notFound', productName: 'Not Found'} as ProductGet)
            }
          },1000);
        });
      } else if(mode == AppModes.OFFLINE){
        observable = new Observable((subscriber) => {
          let sObj = this.localStorage.get('product'+productId).subscribe((sObj) => {
            if(sObj === null){
              subscriber.next({id:'',productName:''});
            } else {
              let oObj = JSON.parse(sObj);
              let ret:ProductGet = oObj.obj as ProductGet;
              subscriber.next(ret);
            }
            
          },(error) => {
            subscriber.error('offline Data not found');
          });
        })
      } else {
        observable = this.productService.getProduct(productId).pipe(tap((product) => {
          let cacheObj = {time:((new Date()).getTime() / 1000),obj:product};
          let sCacheObj = JSON.stringify(cacheObj);
          this.localStorage.set('product'+productId,sCacheObj);
        }));
      }
      let observable2 = observable.pipe(map((product:ProductGet)=>{
        return this.convert(product);
      }));
      return observable2;
    }));
    
  }
	createProduct(product:ProductNg):Observable<ProductNg>{
    return this.appSetting.getMode().pipe(mergeMap((mode) => {
      if(mode == AppModes.DEMO){
        product.id = product.productName;
        return new Observable<ProductNg>(subscriber => {
          setTimeout(() => {
            subscriber.next(product);
          },1000);
        });
      } else if(mode == AppModes.OFFLINE){
        return new Observable<ProductNg>((subscriber) => {
          subscriber.error('App is in Offline Mode');
        })
      } else {
        let productWrite: ProductWrite = {productName:product.productName};
        return this.productService.createProduct(productWrite).pipe(map((product:ProductGet)=>{
          return this.convert(product);
        }));
      }
    }));
    if(true){
      
    }
    else {
      
    }
	}
	updateProduct(product:ProductNg){
		return new Observable<void>(subscriber => {
			setTimeout(() => {
				subscriber.next();
			},1000);
		});
	}
  deleteProduct(productId:string){
    return this.productService.deleteProduct(productId);
  }
	convert(productInput:ProductGet){
		let ret:ProductNg = {
			id:productInput.id ?? '',
			productName: productInput.productName ?? ''
		};
		return ret;
	}

  getSelectOptions(search?:string):Observable<SelectOptions[]>{
    let observable: Observable<ProductGet[]>;
    if(true){
      if(search){
        observable = this.productService.getProducts(search);
      } else {
        observable = this.productService.getProducts();
      }
      
    } else {
      observable = new Observable<ProductGet[]>(subscriber => {
        setTimeout(()=>{
          const list = this.getMockData();
          const optionsToReturn = list.filter(list => {
            const name = list.productName ?? '';
            if(!search)return true;
            return (name.indexOf(search)>-1);
          });
          subscriber.next(optionsToReturn);
        },1000);
      });
    }
    return observable.pipe(map((products:ProductGet[])=>{
      let ret: SelectOptions[] = [];
      for(const i in products){
        if(!products.hasOwnProperty(i)) continue;
        const id = products[i].id ?? '';
        const productName = products[i].productName ?? '';
        ret.push({id: id,text: productName});
      }
      return ret;
    }))
  }
  getLabelFromId(id:string):Observable<string>{
    return this.getProduct(id).pipe(map((product:ProductNg) => {
      return product.productName;
    }));
  }
  getMockData(){
    const list = [
      {
        id: 'eier',
        productName: 'Eier'
      }, {
        id: 'rapsoel',
        productName: 'Rapsöl'
      }, {
        id: 'milch',
        productName: 'Milch'
      }, {
        id: 'zucker',
        productName: 'Zucker'
      }, {
        id: 'mehl',
        productName: 'Mehl'
      },{
        id: 'magerquark',
        productName: 'Magerquark'
      }, {
        id: 'gries',
        productName: 'Grieß'
      }, {
        id: 'backpulver',
        productName: 'Backpulver'
      }, {
        id: 'butter',
        productName: 'Butter'
      }, {
        id: 'vanillezucker',
        productName: 'Vanillezucker'
      }, {
        id: 'vanillepuddingpulver',
        productName: 'Vanillepuddingpulver'
      }, {
        id: 'zitronensaft',
        productName: 'Zitronensaft'
      }, {
        id: 'linsen',
        productName: 'Linsen'
      }, {
        id: 'brennweinessig',
        productName: 'Brennweinessig'
      }
    ] as ProductGet[];
    return list;
  }
}
