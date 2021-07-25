import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingListNgServiceMock } from 'src/app/Mock/ShoppingListNgServiceMock';
import { ShoppingListNgService } from 'src/app/service/shoppingListNg/shopping-list-ng.service';

import { ShoppingListComponent } from './shopping-list.component';

describe('ShoppingListComponent', () => {
  let component: ShoppingListComponent;
  let fixture: ComponentFixture<ShoppingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingListComponent ],
      providers:[
        {provide: ShoppingListNgService,useClass:ShoppingListNgServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
