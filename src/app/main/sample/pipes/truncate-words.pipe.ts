import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateWords'
})
export class TruncateWordsPipe implements PipeTransform {
  transform(value: string, wordLimit: number): string {
    if (!value) return '';
    const words = value.split(' ');
    return words.slice(0, wordLimit).join(' ') + (words.length > wordLimit ? '...' : '');
  }
}
