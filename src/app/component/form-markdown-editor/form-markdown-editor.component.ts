import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
//import * as simplemde from 'simplemde';
//import * as SimpleMDE from 'simplemde/index';
//import { SimpleMDE } from 'simplemde';
//import { SimpleMDE } from 'simplemde/src/js/simplemde.js'
import SimpleMDE from 'simplemde';

@Component({
  selector: 'app-form-markdown-editor',
  templateUrl: './form-markdown-editor.component.html',
  styleUrls: ['./form-markdown-editor.component.scss'],
  providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: FormMarkdownEditorComponent,
			multi: true
		}
	]
})
export class FormMarkdownEditorComponent implements OnInit, ControlValueAccessor {
  
  editor: any = {};
  @ViewChild('mdTextarea',{static:true}) textarea?: ElementRef;
  value = '';
	public propagateChange = Function.prototype;
	public propagateTouched = Function.prototype;

  constructor() { }

  ngOnInit(): void {
    //var SimpleMde = require('SimpleMDE');
    //this.simpleMde = new simplemde.default();
    //simplemde.
    this.editor = new SimpleMDE({element: this.textarea?.nativeElement});
    this.editor.codemirror.on('change',() => {
      let val = this.editor.value();
      this.propagateChange(val);
		  this.propagateTouched();
    })
  }

  public writeValue(value: any): void {
		//this.value = value;
    if(this.editor && value){
      this.editor.value(value);
    }
    
	}
	public registerOnChange(fn: any) {
		this.propagateChange = fn;
	}
	public registerOnTouched(fn: any) {
		this.propagateTouched = fn;
	}
}
