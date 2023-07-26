export type CardsType = 'people' | 'starships';

export type PlayerPosition = 'playerOne' | 'playerTwo';

export interface WinnerState {
  name: string;
  position: PlayerPosition;
}
