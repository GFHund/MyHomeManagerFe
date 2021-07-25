import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ProductNgServiceMock } from 'src/app/Mock/ProductNgServiceMock';
import { ShoppingListNgServiceMock } from 'src/app/Mock/ShoppingListNgServiceMock';
import { ProductNgService } from 'src/app/service/productNg/product-ng.service';
import { ShoppingListNgService } from 'src/app/service/shoppingListNg/shopping-list-ng.service';

import { ShoppingListMappingComponent } from './shopping-list-mapping.component';

describe('ShoppingListMappingComponent', () => {
  let component: ShoppingListMappingComponent;
  let fixture: ComponentFixture<ShoppingListMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingListMappingComponent ],
      imports:[FormsModule],
      providers:[
        {provide: ProductNgService, useClass: ProductNgServiceMock},
        {provide: ShoppingListNgService, useClass: ShoppingListNgServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
