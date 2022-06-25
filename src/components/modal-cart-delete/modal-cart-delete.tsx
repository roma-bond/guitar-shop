import Modal from '../modal/modal';
import useEventListener from '../../hooks/use-event-listener';
import { GuitarType } from '../../types/guitars';
import { guitarMap } from '../../const';
import { formatPrice } from '../../utils/utils';

type ModalCartDeleteProps = {
  name: string;
  vendorCode: string;
  previewImg: string;
  stringCount: number;
  price: number;
  type: GuitarType;
  onClose: () => void;
  onDeleteFromCart: () => void;
};


function ModalCartDelete(props: ModalCartDeleteProps): JSX.Element {
  const {
    name,
    vendorCode,
    previewImg,
    stringCount,
    price,
    type,
    onClose,
    onDeleteFromCart,
  } = props;

  useEventListener(onClose);

  return (
    <Modal
      windowHeight={440}
      onModalClose={onClose}
    >
      <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
      <div className="modal__info">
        <img
          className="modal__img"
          src={`${previewImg}`}
          srcSet={`${previewImg.split('.jpg')[0]}@2x.jpg 2x`}
          width="67"
          height="137"
          alt={name}
        />
        <div className="modal__info-wrapper">
          <h3 className="modal__product-name title title--little title--uppercase">Гитара {name}</h3>
          <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
          <p className="modal__product-params">{guitarMap.get(type)}, {stringCount} струнная</p>
          <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{formatPrice(price)} ₽</span></p>
        </div>
      </div>
      <div className="modal__button-container">
        <button
          className="button button--small modal__button"
          onClick={onDeleteFromCart}
        >
          Удалить товар
        </button>
        <button
          className="button button--black-border button--small modal__button modal__button--right"
          onClick={onClose}
        >
          Продолжить покупки
        </button>
      </div>
      <button
        className="modal__close-btn button-cross"
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
      >
        <span className="button-cross__icon"></span>
        <span className="modal__close-btn-interactive-area"></span>
      </button>
    </Modal>
  );
}

export default ModalCartDelete;
