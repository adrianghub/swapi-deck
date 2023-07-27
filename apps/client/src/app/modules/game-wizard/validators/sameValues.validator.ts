import { AbstractControl } from '@angular/forms';

export function sameValueValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const playerOneValue = control.get('playerOne')?.value;
  const playerTwoValue = control.get('playerTwo')?.value;

  if (playerOneValue?.length < 3 && playerTwoValue?.length < 3) {
    return null;
  }

  if (playerOneValue === playerTwoValue) {
    return { sameValues: true };
  }

  return null;
}
