import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenText'
})
export class ShortenTextPipe implements PipeTransform {

  transform(value: string, length: number): string {
    if (!value) return '';
    return value.length > length ? value.substring(0, length) + '...' : value;
  }

}
