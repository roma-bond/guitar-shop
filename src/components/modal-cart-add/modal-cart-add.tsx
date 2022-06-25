import Modal from '../modal/modal';
import useEventListener from '../../hooks/use-event-listener';
import { formatPrice } from '../../utils/utils';

type ModalCartAddProps = {
  name: string;
  vendorCode: string;
  previewImg: string;
  stringCount: number;
  price: number;
  onClose: () => void;
  onAddToCart: () => void;
};

function ModalCartAdd(props: ModalCartAddProps): JSX.Element {
  const {
    name,
    vendorCode,
    previewImg,
    stringCount,
    price,
    onClose,
    onAddToCart,
  } = props;

  useEventListener(onClose);

  return (
    <Modal
      windowHeight={440}
      onModalClose={onClose}
    >
      <h2 className="modal__header title title--medium">
        Добавить товар в корзину
      </h2>
      <div className="modal__info">
        <img
          className="modal__img"
          src={previewImg}
          srcSet={`${previewImg.split('.jpg')[0]}@2x.jpg 2x`}
          width="67"
          height="137"
          alt={name}
        />
        <div className="modal__info-wrapper">
          <h3
            className="modal__product-name title title--little title--uppercase"
            data-testid="guitar-name"
          >
            Гитара {name}
          </h3>
          <p
            className="modal__product-params modal__product-params--margin-11"
            data-testid="vendor-code"
          >
            Артикул: {vendorCode}
          </p>
          <p className="modal__product-params" data-testid="string-count">
            Электрогитара, {stringCount} струнная
          </p>
          <p className="modal__price-wrapper">
            <span className="modal__price">Цена:</span>
            <span className="modal__price" data-testid="price">
              {formatPrice(price)} ₽
            </span>
          </p>
        </div>
      </div>
      <div className="modal__button-container">
        <button
          onClick={onAddToCart}
          className="button button--red button--big modal__button modal__button--add"
        >
          Добавить в корзину
        </button>
      </div>
    </Modal>
  );
}

export default ModalCartAdd;
