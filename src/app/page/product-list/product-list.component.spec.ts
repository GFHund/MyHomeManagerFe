import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductNgServiceMock } from 'src/app/Mock/ProductNgServiceMock';
import { ProductNgService } from 'src/app/service/productNg/product-ng.service';

import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      providers:[
        {provide: ProductNgService, useClass: ProductNgServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
