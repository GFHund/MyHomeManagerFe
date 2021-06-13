import { Injectable } from '@angular/core';
import { ProductService, ProductGet, ProductWrite } from 'src/OpenApi';
import { Observable } from 'rxjs';
import { mergeMap,map } from 'rxjs/operators';
import { ProductNg } from 'src/app/model/ProductNg';
import { FormSelectInterface, SelectOptions } from 'src/app/interfaces/formSelectInterface';


@Injectable({
  providedIn: 'root'
})
export class ProductNgService implements FormSelectInterface {

  constructor(public productService: ProductService) {
    this.productService.configuration.basePath = 'http://127.0.0.1:8080';
   }

  getList(ids?: string[]): Observable<ProductNg[]>{
    //this.productService.getProducts();
    let observable:Observable<ProductGet[]>;
    if(true){
      observable = this.productService.getProducts();
    }else{
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
  }

  getProduct(productId:string): Observable<ProductNg>{
    //this.productService.getProduct
    let observable:Observable<ProductGet>;
    if(true){
      observable = this.productService.getProduct(productId);
    }else {
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
    }
    let observable2 = observable.pipe(map((product:ProductGet)=>{
			return this.convert(product);
		}));
    return observable2;
  }
	createProduct(product:ProductNg):Observable<ProductNg>{
    if(true){
      let productWrite: ProductWrite = {productName:product.productName};
      return this.productService.createProduct(productWrite).pipe(map((product:ProductGet)=>{
        return this.convert(product);
      }));
    }
    else {
      product.id = product.productName;
      return new Observable<ProductNg>(subscriber => {
        setTimeout(() => {
          subscriber.next(product);
        },1000);
      });
    }
	}
	updateProduct(product:ProductNg){
		return new Observable<void>(subscriber => {
			setTimeout(() => {
				subscriber.next();
			},1000);
		});
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
