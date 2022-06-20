import Modal from '../modal/modal';

type ModalSuccessAddProps = {
  onContinueShopping: () => void;
};

function ModalSuccessAdd(props: ModalSuccessAddProps): JSX.Element {
  const { onContinueShopping } = props;

  return (
    <Modal
      modalClass="modal--success"
      windowHeight={410}
      onModalClose={onContinueShopping}
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
        <button className="button button--small modal__button">
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
