import guitarReducer, { guitarReducerInitialState, loadGuitars, loadGuitar } from './guitar-reducer';
import { GuitarWithReviews } from '../types/guitars';

const guitars: GuitarWithReviews[] = [
  {
    id: 1,
    name: 'Честер Bass',
    vendorCode: 'SO757575',
    type: 'electric',
    description:
      'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
    previewImg: 'img/guitar-1.jpg',
    stringCount: 7,
    rating: 4,
    price: 17500,
    reviews: [],
  },
];

const guitar: GuitarWithReviews = {
  id: 1,
  name: 'Честер Bass',
  vendorCode: 'SO757575',
  type: 'electric',
  description:
    'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
  previewImg: 'img/guitar-1.jpg',
  stringCount: 7,
  rating: 4,
  price: 17500,
  reviews: [],
};

describe('Reducer: guitarReducer', () => {
  it('without additional parameters should return initial state', () => {
    expect(guitarReducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual({
      guitars: [],
      guitar: null,
    });
  });

  it('should update guitars by load guitars', () => {
    const state = guitarReducerInitialState;
    expect(guitarReducer(state, loadGuitars(guitars))).toEqual({
      guitars,
      guitar: null,
    });
  });

  it('should update guitars by load guitar', () => {
    const state = guitarReducerInitialState;
    expect(guitarReducer(state, loadGuitar(guitar))).toEqual({
      guitars: [],
      guitar,
    });
  });
});
