import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FormInputComponent } from 'src/app/component/form-input/form-input.component';
import { LoginServiceMock } from 'src/app/Mock/LoginServiceMock';
import { LoginService } from 'src/app/service/login/login.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent, FormInputComponent ],
      imports:[RouterTestingModule.withRoutes([]),FormsModule],
      providers:[
        {provide:LoginService,useClass:LoginServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
