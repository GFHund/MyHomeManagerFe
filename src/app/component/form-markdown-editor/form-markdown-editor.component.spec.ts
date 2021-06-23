import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMarkdownEditorComponent } from './form-markdown-editor.component';

describe('FormMarkdownEditorComponent', () => {
  let component: FormMarkdownEditorComponent;
  let fixture: ComponentFixture<FormMarkdownEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMarkdownEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMarkdownEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
