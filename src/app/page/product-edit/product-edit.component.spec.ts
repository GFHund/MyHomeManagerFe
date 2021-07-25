import { ComponentFixture, ComponentFixtureNoNgZone, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormInputComponent } from 'src/app/component/form-input/form-input.component';
import { ProductNgServiceMock } from 'src/app/Mock/ProductNgServiceMock';
import { ProductNgService } from 'src/app/service/productNg/product-ng.service';
import { ProductService } from 'src/OpenApi';

import { ProductEditComponent } from './product-edit.component';

fdescribe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: ComponentFixture<ProductEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductEditComponent, FormInputComponent ],
      imports:[RouterTestingModule.withRoutes([
        {path: 'product/:id/edit', component: ProductEditComponent},
        {path: 'product/new', component: ProductEditComponent}
      ]),FormsModule],
      providers:[
        {provide: ProductNgService, useClass: ProductNgServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form title test', async() => {
    //const fixture = TestBed.createComponent(ProductEditComponent);
    fixture.autoDetectChanges(true);

    await fixture.whenStable();
    expect(component.form).toBeDefined();
    const form = component.form?.form;
    const titleControl = form?.get('title');
    expect(titleControl).toBeDefined();

    //const form = fixture.nativeElement.querySelector('');
    if(titleControl){
      const errors = titleControl.errors;
      if(errors){
        expect(errors['required']).toBeTruthy();
      }else {
        expect(false).toBeTruthy();
      }
      
      titleControl.setValue('Title1');
      expect(titleControl.errors).toBeNull();
    } else {
      expect(false).toBeTruthy();
    }
  });

  it('is New Test',async() => {
    const router = TestBed.inject(Router);
    router.navigateByUrl('product/new');
    await fixture.whenStable();
    component.ngOnInit();
    expect(component.isNew).toBeTruthy();
  });

  it('is not new Test', async() => {
    const router = TestBed.inject(Router);
    router.navigateByUrl('product/abc123/edit');
    await fixture.whenStable();
    component.ngOnInit();
    expect(component.isNew).toBeFalsy();
  });

  it('form submit test',async()=>{

  });
});
