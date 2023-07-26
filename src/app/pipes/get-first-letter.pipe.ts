import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getFirstLetter'
})
export class GetFirstLetterPipe implements PipeTransform {

  data!: string;
  
  transform(value:any, ...args: unknown[]): any {
    return value[0];
  }

}
