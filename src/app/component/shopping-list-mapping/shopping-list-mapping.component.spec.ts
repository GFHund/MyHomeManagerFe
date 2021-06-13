import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListMappingComponent } from './shopping-list-mapping.component';

describe('ShoppingListMappingComponent', () => {
  let component: ShoppingListMappingComponent;
  let fixture: ComponentFixture<ShoppingListMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingListMappingComponent ]
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
