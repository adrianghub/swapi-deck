import { SwapiPersonDto, SwapiStarshipDto } from '../models/swapi.dto';
import { SwapiPerson } from '../models/swapi.model';
import { SwapiStarship } from './../models/swapi.model';

export function determineWinner(
  selectedCards: Map<string, SwapiPerson | SwapiStarship>
) {
  const cardsArray = Array.from(selectedCards.values());

  const [playerOneCard, playerTwoCard] = cardsArray;

  return compareMass(playerOneCard, playerTwoCard);
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
