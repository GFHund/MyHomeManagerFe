import { Pipe, PipeTransform } from '@angular/core';
const showdown = require('showdown');
@Pipe({
  name: 'mk2html'
})
export class Mk2htmlPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let converter = new showdown.Converter();
    return converter.makeHtml(value);
    
  }

}
