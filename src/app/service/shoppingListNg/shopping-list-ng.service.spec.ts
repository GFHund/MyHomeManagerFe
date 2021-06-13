import { TestBed } from '@angular/core/testing';

import { ShoppingListNgService } from './shopping-list-ng.service';

describe('ShoppingListService', () => {
  let service: ShoppingListNgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingListNgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
