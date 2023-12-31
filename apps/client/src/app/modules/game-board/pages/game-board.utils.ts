import { PlayerPosition } from '../../../shared/models/game.model';
import { PlayersState } from '../../../store/game.store';
import { SwapiPersonDto, SwapiStarshipDto } from '../models/swapi.dto';
import { SwapiPerson } from '../models/swapi.model';
import { SwapiStarship } from './../models/swapi.model';

export function determineWinner(
  nextTurn: PlayerPosition,
  selectedCards: Map<string, SwapiPerson | SwapiStarship>,
  players: PlayersState,
  handleWinnerFn: (name: string, playerPosition: PlayerPosition) => void
): 'draw' | void {
  const cardsArray = Array.from(selectedCards.values());
  const [playerOneCard, playerTwoCard] = cardsArray;
  const result = compareMass(playerOneCard, playerTwoCard);

  if (result > 0) {
    handleWinnerFn(players[nextTurn].name, nextTurn);
  } else if (result < 0) {
    const opponentTurn = nextTurn === 'playerOne' ? 'playerTwo' : 'playerOne';
    handleWinnerFn(players[opponentTurn].name, opponentTurn);
  } else {
    return 'draw';
  }
}

export function compareMass(
  card1: SwapiPerson | SwapiStarship,
  card2: SwapiPerson | SwapiStarship
): number {
  if (isSwapiPerson(card1) && isSwapiPerson(card2)) {
    return comparePersonMass(card1, card2);
  }

  if (isSwapiStarship(card1) && isSwapiStarship(card2)) {
    return compareStarshipCrew(card1, card2);
  }

  return 0;
}

function comparePersonMass(card1: SwapiPerson, card2: SwapiPerson) {
  const mass1 = parseInt(card1.mass);
  const mass2 = parseInt(card2.mass);

  if (isNaN(mass1) || isNaN(mass2)) {
    return 0;
  }

  return mass1 - mass2;
}

function compareStarshipCrew(card1: SwapiStarship, card2: SwapiStarship) {
  const crew1 = parseInt(card1.crew);
  const crew2 = parseInt(card2.crew);

  if (isNaN(crew1) || isNaN(crew2)) {
    return 0;
  }

  return crew1 - crew2;
}

export function isSwapiPerson(
  card: SwapiStarshipDto | SwapiPersonDto
): card is SwapiPerson {
  return 'mass' in card;
}

export function isSwapiStarship(
  card: SwapiStarshipDto | SwapiPersonDto
): card is SwapiStarship {
  return 'crew' in card;
}
