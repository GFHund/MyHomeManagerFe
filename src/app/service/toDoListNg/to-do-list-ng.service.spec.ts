import { TestBed } from '@angular/core/testing';

import { ToDoListNgService } from './to-do-list-ng.service';

describe('ToDoListNgService', () => {
  let service: ToDoListNgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoListNgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
