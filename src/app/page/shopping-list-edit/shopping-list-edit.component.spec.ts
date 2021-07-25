import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FormInputComponent } from 'src/app/component/form-input/form-input.component';
import { ShoppingListNgServiceMock } from 'src/app/Mock/ShoppingListNgServiceMock';
import { ShoppingListNgService } from 'src/app/service/shoppingListNg/shopping-list-ng.service';

import { ShoppingListEditComponent } from './shopping-list-edit.component';

describe('ShoppingListEditComponent', () => {
  let component: ShoppingListEditComponent;
  let fixture: ComponentFixture<ShoppingListEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingListEditComponent,FormInputComponent ],
      imports:[RouterTestingModule.withRoutes([]),FormsModule],
      providers: [
        {provide:ShoppingListNgService, useClass: ShoppingListNgServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
