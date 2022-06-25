import { useNavigate } from 'react-router-dom';
import Modal from '../modal/modal';
import { AppRoute } from '../../const';

type ModalSuccessAddProps = {
  onContinueShopping: () => void;
  onClose: () => void;
};

function ModalSuccessAdd(props: ModalSuccessAddProps): JSX.Element {
  const { onContinueShopping, onClose } = props;

  const navigate = useNavigate();

  const handleRedirectButtonClick = () => {
    navigate(AppRoute.Cart);
  };

  return (
    <Modal
      modalClass="modal--success"
      windowHeight={410}
      onModalClose={onClose}
      testId='close'
    >
      <svg
        className="modal__icon"
        width="26"
        height="20"
        aria-hidden="true"
      >
        <use xlinkHref="#icon-success"></use>
      </svg>
      <p className="modal__message">Товар успешно добавлен в корзину</p>
      <div className="modal__button-container modal__button-container--add">
        <button
          className="button button--small modal__button"
          onClick={handleRedirectButtonClick}
        >
          Перейти в корзину
        </button>
        <button
          onClick={onContinueShopping}
          className="button button--black-border button--small modal__button modal__button--right"
        >
          Продолжить покупки
        </button>
      </div>
    </Modal>
  );
}

export default ModalSuccessAdd;
