import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListViewComponentComponent } from './shopping-list-view-component.component';

describe('ShoppingListViewComponentComponent', () => {
  let component: ShoppingListViewComponentComponent;
  let fixture: ComponentFixture<ShoppingListViewComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingListViewComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListViewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
