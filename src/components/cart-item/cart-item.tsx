import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import {
  removeGuitarFromCart,
  increaseCartGuitarCount,
  decreaseCartGuitarCount,
  updateCartGuitarCount
} from '../../store/cart-reducer';
import { GuitarWithCount } from '../../types/guitars';
import { guitarMap } from '../../const';
import { formatPrice } from '../../utils/utils';

type CartItemProps = {
  guitar: GuitarWithCount;
};

function CartItem(props: CartItemProps): JSX.Element {
  const { guitar } = props;

  const dispatch = useDispatch();

  const handleReduceButtonClick = () => {
    dispatch(decreaseCartGuitarCount(guitar.id));
  };

  const handleIncreaseButtonClick = () => {
    dispatch(increaseCartGuitarCount(guitar.id));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const updateBy = Number(value);

    if (value.length > 1 && value[0] === '0') {
      e.target.value = value.slice(1);
    }

    if (updateBy < 100) {
      dispatch(updateCartGuitarCount({ id: guitar.id, updateBy }));
    }
  };

  const handleItemDelete = () => {
    dispatch(removeGuitarFromCart(guitar.id));
  };

  return (
    <div className="cart-item">
      <button
        className="cart-item__close-button button-cross"
        type="button"
        aria-label="Удалить"
        onClick={handleItemDelete}
      >
        <span className="button-cross__icon"></span>
        <span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image">
        <img
          src={guitar.previewImg}
          srcSet={`${guitar.previewImg.split('.jpg')[0]}@2x.jpg 2x`}
          width="55"
          height="130"
          alt={guitar.name}
        />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{guitar.name}</p>
        <p className="product-info__info">Артикул: {guitar.vendorCode}</p>
        <p className="product-info__info">{guitarMap.get(guitar.type)}, {guitar.stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{formatPrice(guitar.price)} ₽</div>
      <div className="quantity cart-item__quantity">
        <button
          className="quantity__button"
          aria-label="Уменьшить количество"
          onClick={handleReduceButtonClick}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input
          className="quantity__input"
          type="number"
          id="2-count"
          name="2-count"
          max="99"
          value={guitar.guitarCount}
          onChange={handleInputChange}
        />
        <button
          className="quantity__button"
          aria-label="Увеличить количество"
          onClick={handleIncreaseButtonClick}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{formatPrice(guitar.price * guitar.guitarCount)} ₽</div>
    </div>
  );
}

export default CartItem;
