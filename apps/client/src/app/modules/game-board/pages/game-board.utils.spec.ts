import { PlayerPosition } from '../../../shared/models/game.model';
import { PlayersState } from '../../game-wizard/store/game-wizard.store';
import { SwapiPerson, SwapiStarship } from '../models/swapi.model';
import { compareMass, determineWinner } from './game-board.utils';

describe('compareMass', () => {
  it('should compare person mass correctly', () => {
    const mockPerson1 = { mass: '75' } as SwapiPerson;
    const mockPerson2 = { mass: '80' } as SwapiPerson;

    const result = compareMass(mockPerson1, mockPerson2);

    expect(result).toBe(-5);
  });

  it('should return 0 when comparing invalid masses for person', () => {
    const mockPerson1 = { mass: 'invalid' } as SwapiPerson;
    const mockPerson2 = { mass: 'NaN' } as SwapiPerson;

    const result = compareMass(mockPerson1, mockPerson2);

    expect(result).toBe(0);
  });

  it('should compare starship crew correctly', () => {
    const mockStarship1 = { crew: '100' } as SwapiStarship;
    const mockStarship2 = { crew: '120' } as SwapiStarship;

    const result = compareMass(mockStarship1, mockStarship2);

    expect(result).toBe(-20);
  });

  it('should return 0 when comparing invalid crews for starship', () => {
    const mockStarship1 = { crew: 'invalid' } as SwapiStarship;
    const mockStarship2 = { crew: 'NaN' } as SwapiStarship;

    const result = compareMass(mockStarship1, mockStarship2);

    expect(result).toBe(0);
  });
});

describe('determineWinner', () => {
  const mockPlayerOne = { name: 'Player One', score: 0 };
  const mockPlayerTwo = { name: 'Player Two', score: 0 };
  const mockPlayers: PlayersState = {
    playerOne: mockPlayerOne,
    playerTwo: mockPlayerTwo,
  };

  let winnerName: string | null = null;
  let winnerPosition: PlayerPosition | null = null;
  const mockHandleWinnerFn = (name: string, playerPosition: PlayerPosition) => {
    winnerName = name;
    winnerPosition = playerPosition;
  };

  it('should determine player one as the winner when result > 0', () => {
    const mockPerson1 = { mass: '80' } as SwapiPerson;
    const mockPerson2 = { mass: '60' } as SwapiPerson;
    const selectedCards = new Map<string, SwapiPerson>([
      ['playerOne', mockPerson1],
      ['playerTwo', mockPerson2],
    ]);

    determineWinner(selectedCards, mockPlayers, mockHandleWinnerFn);

    expect(winnerName).toBe(mockPlayerOne.name);
    expect(winnerPosition).toBe('playerOne');
  });

  it('should determine player two as the winner when result < 0', () => {
    const mockStarship1 = { crew: '100' } as SwapiStarship;
    const mockStarship2 = { crew: '120' } as SwapiStarship;
    const selectedCards = new Map<string, SwapiStarship>([
      ['playerOne', mockStarship1],
      ['playerTwo', mockStarship2],
    ]);

    determineWinner(selectedCards, mockPlayers, mockHandleWinnerFn);

    expect(winnerName).toBe(mockPlayerTwo.name);
    expect(winnerPosition).toBe('playerTwo');
  });
});
