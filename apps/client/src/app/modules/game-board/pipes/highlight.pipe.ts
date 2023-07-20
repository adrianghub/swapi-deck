import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(value: string): string {
    const regex = /\[(.+?)]/g;
    const matches = value.matchAll(regex);

    let result = value;

    for (const match of matches) {
      result = result.replace(
        match[0],
        `<p class="highlight-text">${match[1]}</p>`
      );
    }

    return result;
  }
}
