import { useRef, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../cart-item/cart-item';
import ModalCartDelete from '../modal-cart-delete/modal-cart-delete';
import { removeGuitarFromCart, cancelGuitarRemoveFromCart, setCartDiscount } from '../../store/cart-reducer';
import { postPromocode } from '../../store/api-actions';
import { RootState } from '../../store/store';
import { formatPrice } from '../../utils/utils';
import './cart-page.css';

function CartPage(): JSX.Element {
  const promocodeInputRef = useRef<HTMLInputElement>(null);
  const { cartGuitars, cartGuitarBeforeRemove, discount } = useSelector((state: RootState) => state.cart);
  const totalPriceWithoutDiscount = cartGuitars
    .map((guitar) => guitar.price * guitar.guitarCount)
    .reduce((a, b) => a + b, 0);
  const purchaseDiscount = discount > 0
    ? (discount / 100) * totalPriceWithoutDiscount
    : 0;

  const dispatch = useDispatch();

  useEffect(() => () => {
    dispatch(setCartDiscount(0));
  }, []);

  const handleModalClose = () => {
    if (cartGuitarBeforeRemove) {
      dispatch(cancelGuitarRemoveFromCart());
    }
  };

  const handleGuitarDelete = () => {
    if (cartGuitarBeforeRemove) {
      dispatch(removeGuitarFromCart(cartGuitarBeforeRemove.id));
    }
  };

  const handlePromocodeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (promocodeInputRef.current) {
      const promocode = promocodeInputRef.current.value.toLowerCase();

      if (promocode.includes(' ')) {
        dispatch(setCartDiscount(-1000));
      } else {
        promocode
          ? dispatch(postPromocode(promocode))
          : dispatch(setCartDiscount(0));
      }
    }
  };

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="title title--bigger page-content__title">Корзина</h1>
        <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
          <li className="breadcrumbs__item">
            <a className="link" href="./main.html">
              Главная
            </a>
          </li>
          <li className="breadcrumbs__item">
            <a className="link" href="./main.html">
              Каталог
            </a>
          </li>
          <li className="breadcrumbs__item">
            <a className="link">Корзина</a>
          </li>
        </ul>
        <div className="cart">
          {
            cartGuitars.map((guitar) => (
              <CartItem
                key={`cartGuitar-${guitar.id}`}
                guitar={guitar}
              />
            ))
          }
          <div className="cart__footer">
            <div className="cart__coupon coupon">
              <h2 className="title title--little coupon__title">
                Промокод на скидку
              </h2>
              <p className="coupon__info">
                Введите свой промокод, если он у вас есть.
              </p>
              <form
                className="coupon__form"
                id="coupon-form"
                method="post"
                action="/"
                onSubmit={handlePromocodeSubmit}
              >
                <div className="form-input coupon__input">
                  <label className="visually-hidden">Промокод</label>
                  <input
                    ref={promocodeInputRef}
                    type="text"
                    placeholder="Введите промокод"
                    id="coupon"
                    name="coupon"
                  />
                  {discount > 0 &&
                    <p className="form-input__message form-input__message--success">
                      Промокод принят
                    </p>}
                  {discount < 0 &&
                    <p className="form-input__message form-input__message--error">
                      Неверный промокод
                    </p>}
                </div>
                <button className="button button--big coupon__button">
                  Применить
                </button>
              </form>
            </div>
            <div className="cart__total-info">
              <p className="cart__total-item">
                <span className="cart__total-value-name">Всего:</span>
                <span className="cart__total-value">{formatPrice(totalPriceWithoutDiscount)} ₽</span>
              </p>
              <p className="cart__total-item">
                <span className="cart__total-value-name">Скидка:</span>
                <span className="cart__total-value cart__total-value--bonus">
                  - {purchaseDiscount} ₽
                </span>
              </p>
              <p className="cart__total-item">
                <span className="cart__total-value-name">К оплате:</span>
                <span className="cart__total-value cart__total-value--payment">
                  {formatPrice(totalPriceWithoutDiscount - purchaseDiscount)} ₽
                </span>
              </p>
              <button className="button button--red button--big cart__order-button">
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      </div>
      {
        cartGuitarBeforeRemove &&
        <ModalCartDelete
          name={cartGuitarBeforeRemove.name}
          vendorCode={cartGuitarBeforeRemove.vendorCode}
          previewImg={cartGuitarBeforeRemove.previewImg}
          stringCount={cartGuitarBeforeRemove.stringCount}
          price={cartGuitarBeforeRemove.price}
          type={cartGuitarBeforeRemove.type}
          onClose={handleModalClose}
          onDeleteFromCart={handleGuitarDelete}
        />
      }
    </main>
  );
}

export default CartPage;
