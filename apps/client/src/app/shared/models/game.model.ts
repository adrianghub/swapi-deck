export type CardsType = 'people' | 'starships';

export type PlayerPosition = 'playerOne' | 'playerTwo';

export interface SwapiMeta {
  count: number;
  next: string | null;
  previous: string | null;
  page?: number;
}

export interface WinnerState {
  name: string;
  position: PlayerPosition;
}
