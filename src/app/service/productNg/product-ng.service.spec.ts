import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ProductNgService } from './product-ng.service';

fdescribe('ProductNgService', () => {
  let service: ProductNgService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ProductNgService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get List',() => {
    let ret = service.getList();
    ret.subscribe(list => {
      expect(list.length > 0).toBeTruthy();
      expect(list[0].id).toEqual('eier');
      expect(list[0].productName).toEqual('Eier');  
    })
  })
});
