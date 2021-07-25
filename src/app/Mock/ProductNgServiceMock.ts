import { Observable } from "rxjs";
import { ProductNg } from "../model/ProductNg";

export class ProductNgServiceMock{
    getList(ids?: string[]): Observable<ProductNg[]>{
        return new Observable<ProductNg[]>(subscriber => {
            subscriber.next(this.getMockData());
        });
    }

    getProduct(productId:string): Observable<ProductNg>{
        return new Observable<ProductNg>(subscriber => {
            const productArr = this.getMockData();
            const product = productArr.find(element => element.id === productId);
            if(product){
                subscriber.next(product);
            } else {
                subscriber.error('not Found');
            }
            
        });
    }

    private getMockData():ProductNg[]{
        return [
            {id:'abc123',productName:'AnyProductName'},
            {id:'abc124',productName:'AnyProductName2'}
        ];
    }
}