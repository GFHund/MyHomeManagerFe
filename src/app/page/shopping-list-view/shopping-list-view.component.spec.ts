import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ShoppingListNgServiceMock } from 'src/app/Mock/ShoppingListNgServiceMock';
import { ShoppingListNgService } from 'src/app/service/shoppingListNg/shopping-list-ng.service';

import { ShoppingListViewComponent } from './shopping-list-view.component';

describe('ShoppingListViewComponent', () => {
  let component: ShoppingListViewComponent;
  let fixture: ComponentFixture<ShoppingListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingListViewComponent ],
      imports:[RouterTestingModule.withRoutes([])],
      providers:[
        {provide: ShoppingListNgService, useClass:ShoppingListNgServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
