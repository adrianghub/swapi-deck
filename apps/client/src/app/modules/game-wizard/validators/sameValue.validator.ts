import { AbstractControl } from '@angular/forms';

export function sameValueValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const playerOneValue = control.get('playerOne')?.value;
  const playerTwoValue = control.get('playerTwo')?.value;

  if (playerOneValue === playerTwoValue) {
    return { sameValue: true };
  }

  return null;
}