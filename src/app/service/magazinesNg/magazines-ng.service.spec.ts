import { TestBed } from '@angular/core/testing';

import { MagazinesNgService } from './magazines-ng.service';

describe('MagazinesNgService', () => {
  let service: MagazinesNgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagazinesNgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
