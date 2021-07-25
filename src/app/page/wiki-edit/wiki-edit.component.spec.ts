import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FormInputComponent } from 'src/app/component/form-input/form-input.component';
import { WikiNgServiceMock } from 'src/app/Mock/WikiNgServiceMock';
import { WikiNgService } from 'src/app/service/wikiNg/wiki-ng.service';

import { WikiEditComponent } from './wiki-edit.component';

describe('WikiEditComponent', () => {
  let component: WikiEditComponent;
  let fixture: ComponentFixture<WikiEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WikiEditComponent,FormInputComponent ],
      imports:[
        RouterTestingModule.withRoutes([]),
        FormsModule
      ],
      providers:[
        {provide: WikiNgService, useClass: WikiNgServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
