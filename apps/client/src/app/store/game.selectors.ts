import { Selector } from '@ngxs/store';
import { GameModel, GameState } from './game.store';
import {
  getPagesTotal,
  getSelectedCardData,
  getTotalCount,
} from './game.utils';

export class GameSelectors {
  @Selector([GameState])
  static players(state: GameModel) {
    return state.players;
  }

  @Selector([GameState])
  static cardsType(state: GameModel) {
    return state.cardsType;
  }

  @Selector([GameState])
  static winner(state: GameModel) {
    return state.winner;
  }

  @Selector([GameState])
  static peopleCards(state: GameModel) {
    if (!state.peopleCardsData) {
      return [];
    }

    return state.peopleCardsData[state.page].cards;
  }

  @Selector([GameState])
  static starshipsCards(state: GameModel) {
    if (!state.starshipsCardsData) {
      return [];
    }

    return state.starshipsCardsData[state.page].cards;
  }

  @Selector([GameState])
  static paginationData(state: GameModel) {
    const cardData = getSelectedCardData(state);
    return cardData
      ? cardData[state.page].pagination
      : { next: null, previous: null };
  }

  @Selector([GameState])
  static loading(state: GameModel) {
    return state.loading;
  }

  @Selector([GameState])
  static errorMessage(state: GameModel) {
    return state.errorMessage;
  }

  @Selector([GameState])
  static pagesTotal(state: GameModel): number | null {
    return getPagesTotal(state);
  }

  @Selector([GameState])
  static cardsTotal(state: GameModel): number | null {
    return getTotalCount(state);
  }

  @Selector([GameState])
  static currentPage(state: GameModel) {
    return state.page;
  }

  @Selector([GameState])
  static selectedCards(state: GameModel) {
    return state.selectedCards;
  }

  @Selector([GameState])
  static nextTurn(state: GameModel) {
    return state.nextTurn;
  }
}
