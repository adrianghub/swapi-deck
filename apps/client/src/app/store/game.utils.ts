import { StateContext } from '@ngxs/store';
import { itemsPerPage } from '../shared/constants/game.constants';
import { CardsType } from '../shared/models/game.model';
import { CardData, GameModel } from './game.store';

type CardDataKeys = 'peopleCardsData' | 'starshipsCardsData';
const cardDataMap: Record<CardsType, CardDataKeys> = {
  people: 'peopleCardsData',
  starships: 'starshipsCardsData',
};

export function updateShowMeta(ctx: StateContext<GameModel>, type: CardsType) {
  const newState: Partial<GameModel> = {};
  const otherType = type === 'people' ? 'starships' : 'people';

  newState[cardDataMap[type]] = {
    ...ctx.getState()[cardDataMap[type]],
    showMeta: true,
  };

  newState[cardDataMap[otherType]] = {
    ...ctx.getState()[cardDataMap[otherType]],
    showMeta: false,
  };

  ctx.patchState(newState);
}

export function getSelectedCardData<T>(
  state: GameModel
): CardData<T> | undefined {
  if (!state.cardsType) {
    return;
  }

  return state[cardDataMap[state.cardsType]] as CardData<T>;
}

export function getPagesTotal(state: GameModel): number | null {
  const totalCount = getTotalCount(state);
  return totalCount ? Math.ceil(totalCount / itemsPerPage) : null;
}

export function getTotalCount(state: GameModel): number | null {
  const cardData = getSelectedCardData(state);
  return cardData?.count || null;
}
