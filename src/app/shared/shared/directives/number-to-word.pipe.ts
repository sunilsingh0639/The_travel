import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToWord'
})
export class NumberToWordPipe implements PipeTransform {
  private words: string[] = [
    'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 
    'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth',
    'Thirteen', 'Forteen', 'Fifteen'
  ];

  transform(value: number): string {
    if (value > 0 && value <= this.words.length) {
      return this.words[value - 1];
    }
    return value.toString();
  }
}
