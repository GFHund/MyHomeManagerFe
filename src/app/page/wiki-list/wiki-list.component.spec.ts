import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WikiNgServiceMock } from 'src/app/Mock/WikiNgServiceMock';
import { WikiNgService } from 'src/app/service/wikiNg/wiki-ng.service';

import { WikiListComponent } from './wiki-list.component';

describe('WikiListComponent', () => {
  let component: WikiListComponent;
  let fixture: ComponentFixture<WikiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WikiListComponent ],
      providers:[
        {provide: WikiNgService, useClass: WikiNgServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
