import { Selector } from '@ngxs/store';
import { itemsPerPage } from '../shared/constants/game.constants';
import { GameModel, GameState } from './game.store';

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
    if (state.peopleCardsData) {
      return state.peopleCardsData[state.page].pagination;
    }

    if (state.starshipsCardsData) {
      return state.starshipsCardsData[state.page].pagination;
    }

    return {
      next: null,
      previous: null,
    };
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
  static pagesTotal(state: GameModel) {
    if (!state.count) {
      return null;
    }

    return Math.ceil(state.count / itemsPerPage);
  }

  @Selector([GameState])
  static cardsTotal(state: GameModel) {
    return state.count;
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
