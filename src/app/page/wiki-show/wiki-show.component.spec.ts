import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WikiNgServiceMock } from 'src/app/Mock/WikiNgServiceMock';
import { Mk2htmlPipe } from 'src/app/pipe/mk2html.pipe';
import { WikiNgService } from 'src/app/service/wikiNg/wiki-ng.service';

import { WikiShowComponent } from './wiki-show.component';

describe('WikiShowComponent', () => {
  let component: WikiShowComponent;
  let fixture: ComponentFixture<WikiShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WikiShowComponent,Mk2htmlPipe ],
      imports:[RouterTestingModule.withRoutes([])],
      providers:[
        {provide:WikiNgService, useClass:WikiNgServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
