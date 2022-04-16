import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonComponentModule } from './common-component.module';
import { FormRadioGroupDirective } from './../directive/form-radio-group.directive';
import { FormMarkdownEditorComponent } from './../component/form-markdown-editor/form-markdown-editor.component';
import { FormCheckboxComponent } from './../component/form-checkbox/form-checkbox.component';
import { FormTextareaComponent } from './../component/form-textarea/form-textarea.component';
import { FormEntitySelectComponent } from './../component/form-entity-select/form-entity-select.component';
import { FormSelectComponent } from 'src/app/component/form-select/form-select.component';
import { FormSubmitComponent } from './../component/form-submit/form-submit.component';
import { FormInputComponent } from 'src/app/component/form-input/form-input.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, CommonComponentModule, FormsModule],
  declarations: [
    FormInputComponent,
    FormSubmitComponent,
    FormSelectComponent,
    FormEntitySelectComponent,
    FormTextareaComponent,
    FormCheckboxComponent,
    FormMarkdownEditorComponent,
    FormRadioGroupDirective,
  ],
  exports: [
    FormInputComponent,
    FormSubmitComponent,
    FormSelectComponent,
    FormEntitySelectComponent,
    FormTextareaComponent,
    FormCheckboxComponent,
    FormMarkdownEditorComponent,
    FormRadioGroupDirective,
  ]
})
export class MhmFormsModule{}
