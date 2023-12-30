import { Pipe, PipeTransform } from '@angular/core';
//import showdown from 'showdown';
@Pipe({
  name: 'mk2html'
})
export class Mk2htmlPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    //let converter = new showdown.Converter();
    //return converter.makeHtml(value);
    return "";
  }

}
