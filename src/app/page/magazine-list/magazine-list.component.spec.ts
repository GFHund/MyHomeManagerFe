import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagazinesNgServiceMock } from 'src/app/Mock/MagazinesNgServiceMock';
import { MagazinesNgService } from 'src/app/service/magazinesNg/magazines-ng.service';

import { MagazineListComponent } from './magazine-list.component';

describe('MagazineListComponent', () => {
  let component: MagazineListComponent;
  let fixture: ComponentFixture<MagazineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagazineListComponent ],
      providers:[
        {provide:MagazinesNgService, useClass:MagazinesNgServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MagazineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
