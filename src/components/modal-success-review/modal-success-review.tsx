import Modal from '../modal/modal';
import useEventListener from '../../hooks/use-event-listener';

type ModalSuccessReviewType = {
  onModalClose: () => void;
};

function ModalSuccessReview(props: ModalSuccessReviewType): JSX.Element {
  const { onModalClose } = props;

  useEventListener(onModalClose);

  return (
    <Modal
      modalClass="modal--success"
      windowHeight={410}
      onModalClose={onModalClose}
      testId='close2'
    >
      <svg
        className="modal__icon"
        width="26"
        height="20"
        aria-hidden="true"
      >
        <use xlinkHref="#icon-success"></use>
      </svg>
      <p className="modal__message">Спасибо за ваш отзыв!</p>
      <div className="modal__button-container modal__button-container--review">
        <button
          onClick={onModalClose}
          className="button button--small modal__button modal__button--review"
          data-testid="close1"
        >
          К покупкам!
        </button>
      </div>
    </Modal>
  );
}

export default ModalSuccessReview;
