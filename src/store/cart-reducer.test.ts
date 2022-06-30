import cartReducer, {
  cartReducerInitialState,
  addGuitarToCart,
  removeGuitarFromCart,
  cancelGuitarRemoveFromCart,
  decreaseCartGuitarCount,
  increaseCartGuitarCount,
  updateCartGuitarCount,
  setCartDiscount
} from './cart-reducer';
import { GuitarType } from '../types/guitars';

const mockGuitar = {
  id: 11,
  name: 'Честер Bass',
  vendorCode: 'SO757575',
  type: 'electric' as GuitarType,
  description:
    'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
  previewImg: 'img/guitar-1.jpg',
  stringCount: 7,
  rating: 4,
  price: 17500,
  reviews: [],
  guitarCount: 2,
};

describe('Reducer: cartReducer', () => {
  it('without additional parameters should return initial state', () => {
    expect(cartReducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual({
      cartGuitars: [],
      cartGuitarBeforeRemove: null,
      discount: {
        amount: 0,
        value: '',
      },
    });
  });

  it('should add guitar by addGuitarToCart', () => {
    const state = cartReducerInitialState;
    expect(cartReducer(state, addGuitarToCart(mockGuitar))).toEqual({
      cartGuitars: [mockGuitar],
      cartGuitarBeforeRemove: null,
      discount: {
        amount: 0,
        value: '',
      },
    });
  });

  it('should update guitar count by addGuitarToCart', () => {
    const state = {
      cartGuitars: [mockGuitar],
      cartGuitarBeforeRemove: null,
      discount: {
        amount: 0,
        value: '',
      },
    };

    expect(cartReducer(state, addGuitarToCart(mockGuitar))).toEqual({
      cartGuitars: [{ ...mockGuitar, guitarCount: 3 }],
      cartGuitarBeforeRemove: null,
      discount: {
        amount: 0,
        value: '',
      },
    });
  });

  it('should set cartGuitarBeforeRemove by removeGuitarFromCart', () => {
    const state = {
      cartGuitars: [mockGuitar],
      cartGuitarBeforeRemove: null,
      discount: {
        amount: 0,
        value: '',
      },
    };

    expect(cartReducer(state, removeGuitarFromCart(11))).toEqual({
      cartGuitars: [mockGuitar],
      cartGuitarBeforeRemove: mockGuitar,
      discount: {
        amount: 0,
        value: '',
      },
    });
  });

  it('should delete guitar by removeGuitarFromCart', () => {
    const state = {
      cartGuitars: [mockGuitar],
      cartGuitarBeforeRemove: mockGuitar,
      discount: {
        amount: 0,
        value: '',
      },
    };

    expect(cartReducer(state, removeGuitarFromCart(11))).toEqual(cartReducerInitialState);
  });

  it('should clear cartGuitarBeforeRemove by cancelGuitarRemoveFromCart', () => {
    const state = {
      cartGuitars: [mockGuitar],
      cartGuitarBeforeRemove: mockGuitar,
      discount: {
        amount: 0,
        value: '',
      },
    };

    expect(cartReducer(state, cancelGuitarRemoveFromCart())).toEqual({
      cartGuitars: [mockGuitar],
      cartGuitarBeforeRemove: null,
      discount: {
        amount: 0,
        value: '',
      },
    });
  });

  it('should decrease guitar count by decreaseCartGuitarCount', () => {
    const state = {
      cartGuitars: [mockGuitar],
      cartGuitarBeforeRemove: null,
      discount: {
        amount: 0,
        value: '',
      },
    };

    expect(cartReducer(state, decreaseCartGuitarCount(11))).toEqual({
      cartGuitars: [{ ...mockGuitar, guitarCount: 1 }],
      cartGuitarBeforeRemove: null,
      discount: {
        amount: 0,
        value: '',
      },
    });
  });

  it('should set cartGuitarBeforeRemove by decreaseCartGuitarCount', () => {
    const state = {
      cartGuitars: [{ ...mockGuitar, guitarCount: 1 }],
      cartGuitarBeforeRemove: null,
      discount: {
        amount: 0,
        value: '',
      },
    };

    expect(cartReducer(state, decreaseCartGuitarCount(11))).toEqual({
      cartGuitars: [{ ...mockGuitar, guitarCount: 1 }],
      cartGuitarBeforeRemove: { ...mockGuitar, guitarCount: 1 },
      discount: {
        amount: 0,
        value: '',
      },
    });
  });

  it('should increase guitar count by increaseCartGuitarCount', () => {
    const state = {
      cartGuitars: [mockGuitar],
      cartGuitarBeforeRemove: null,
      discount: {
        amount: 0,
        value: '',
      },
    };

    expect(cartReducer(state, increaseCartGuitarCount(11))).toEqual({
      cartGuitars: [{ ...mockGuitar, guitarCount: 3 }],
      cartGuitarBeforeRemove: null,
      discount: {
        amount: 0,
        value: '',
      },
    });
  });

  it('should update guitar count by updateCartGuitarCount', () => {
    const state = {
      cartGuitars: [mockGuitar],
      cartGuitarBeforeRemove: null,
      discount: {
        amount: 0,
        value: '',
      },
    };

    expect(cartReducer(state, updateCartGuitarCount({ id: 11, updateBy: 10 }))).toEqual({
      cartGuitars: [{ ...mockGuitar, guitarCount: 10 }],
      cartGuitarBeforeRemove: null,
      discount: {
        amount: 0,
        value: '',
      },
    });
  });

  it('should set discount by setCartDiscount', () => {
    const state = cartReducerInitialState;

    expect(cartReducer(state, setCartDiscount({ amount: 25, value: 'ggg'}))).toEqual({
      ...cartReducerInitialState,
      discount: {
        amount: 25,
        value: 'ggg',
      },
    });
  });
});
