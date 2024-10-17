import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'create'
})
export class CreatePipe implements PipeTransform {

    transform(value: string,): string {
      let Year = value.substring(0, 10);
      let time = value.substring(11, 16);
  
      let FullDate =   Year + ' at '  + time ;
      return FullDate;
  }

}
