import { useState, useRef, FormEvent, MouseEvent, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReviewRating from '../review-rating/review-rating';
import Modal from '../modal/modal';
import { RootState } from '../../store/store';
import { postNewReviewAction } from '../../store/api-actions';
import useEventListener from '../../hooks/use-event-listener';
import { validNoticeStyle } from '../../const';
import { GuitarWithReviews } from '../../types/guitars';
import './modal-review.css';

type ModalReviewProps = {
  onModalClose: () => void;
  onModalSubmit: () => void;
};

function ModalReview(props: ModalReviewProps): JSX.Element {
  const { onModalClose, onModalSubmit } = props;

  const guitar = useSelector(
    (state: RootState) => state.data.guitar as GuitarWithReviews,
  );

  const dispatch = useDispatch();

  useEventListener(onModalClose);

  const nameRef = useRef<HTMLParagraphElement>(null);
  const advantagesRef = useRef<HTMLParagraphElement>(null);
  const disadvantagesRef = useRef<HTMLParagraphElement>(null);
  const commentRef = useRef<HTMLParagraphElement>(null);
  const ratingRef = useRef<HTMLParagraphElement>(null);

  const formInputsInitState = {
    userName: '',
    userNameIsValid: false,
    advantages: '',
    advantagesIsValid: false,
    disadvantages: '',
    disadvantagesIsValid: false,
    comment: '',
    commentIsValid: false,
    rate: 0,
    rateIsValid: false,
  };

  const [formState, setFormState] = useState(formInputsInitState);

  const handleReviewSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      userName,
      userNameIsValid,
      advantages,
      advantagesIsValid,
      disadvantages,
      disadvantagesIsValid,
      comment,
      commentIsValid,
      rate,
      rateIsValid,
    } = formState;

    const formDataIsValid =
      userNameIsValid &&
      advantagesIsValid &&
      disadvantagesIsValid &&
      commentIsValid &&
      rateIsValid;

    if (formDataIsValid) {
      onModalSubmit();
      dispatch(
        postNewReviewAction({
          guitarId: guitar.id,
          userName,
          advantage: advantages,
          disadvantage: disadvantages,
          comment: comment,
          rating: rate,
        }),
      );
    } else if (nameRef.current
      && advantagesRef.current
      && disadvantagesRef.current
      && commentRef.current
      && ratingRef.current
    ) {
      nameRef.current.style.color = userNameIsValid ? '#fefafa' : '#eb5555';
      advantagesRef.current.style.color = advantagesIsValid ? '#fefafa' : '#eb5555';
      disadvantagesRef.current.style.color = disadvantagesIsValid ? '#fefafa' : '#eb5555';
      commentRef.current.style.color = commentIsValid ? '#fefafa' : '#eb5555';
      ratingRef.current.style.color = commentIsValid ? '#fefafa' : '#eb5555';
    }
  };

  const handleInputNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userName = e.target.value;
    if (userName.trim().length > 0) {
      setFormState((prevState) => ({
        ...prevState,
        userName,
        userNameIsValid: true,
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        userName,
        userNameIsValid: false,
      }));
    }
  };

  const handleInputAdvantagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const advantages = e.target.value;
    if (advantages.trim().length > 0) {
      setFormState((prevState) => ({
        ...prevState,
        advantages,
        advantagesIsValid: true,
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        advantages,
        advantagesIsValid: false,
      }));
    }
  };

  const handleInputDisadvantagesChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const disadvantages = e.target.value;
    if (disadvantages.trim().length > 0) {
      setFormState((prevState) => ({
        ...prevState,
        disadvantages,
        disadvantagesIsValid: true,
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        disadvantages,
        disadvantagesIsValid: false,
      }));
    }
  };

  const handleInputCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const comment = e.target.value;
    if (comment.trim().length > 0) {
      setFormState((prevState) => ({
        ...prevState,
        comment,
        commentIsValid: true,
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        comment,
        commentIsValid: false,
      }));
    }
  };

  const handleLabelRateChange = (e: MouseEvent<HTMLLabelElement>) => {
    const target = e.target as HTMLLabelElement;
    const starNum = target.htmlFor.split('-')[1];
    setFormState((prevState) => ({
      ...prevState,
      rate: Number(starNum),
      rateIsValid: true,
    }));
  };

  const handleRadioInputChange = (num: number) => {
    setFormState((prevState) => ({
      ...prevState,
      rate: num,
      rateIsValid: true,
    }));
  };

  return (
    <Modal
      modalClass="modal--review"
      windowHeight={610}
      onModalClose={onModalClose}
    >
      <h2 className="modal__header modal__header--review title title--medium">
        Оставить отзыв
      </h2>
      <h3
        className="modal__product-name title title--medium-20 title--uppercase"
        data-testid="guitar-name"
      >
        {guitar?.name}
      </h3>
      <form onSubmit={handleReviewSubmit} className="form-review">
        <div className="form-review__wrapper">
          <div className="form-review__name-wrapper">
            <label
              className="form-review__label form-review__label--required"
              htmlFor="user-name"
            >
              Ваше Имя
            </label>
            <input
              className="form-review__input form-review__input--name"
              id="user-name"
              type="text"
              autoComplete="off"
              value={formState.userName}
              onChange={handleInputNameChange}
              data-testid="name"
            />
            <p ref={nameRef} className="form-review__warning" style={validNoticeStyle} >Заполните поле</p>
          </div>
          <div>
            <span className="form-review__label form-review__label--required">
              Ваша Оценка
            </span>
            <ReviewRating
              onLabelClick={handleLabelRateChange}
              onInputChange={handleRadioInputChange}
              rateIsValid={formState.rateIsValid}
              rating={formState.rate}
              ratingRef={ratingRef}
            />
          </div>
        </div>
        <label
          className="form-review__label form-review__label--required"
          htmlFor="adv"
        >
          Достоинства
        </label>
        <input
          className="form-review__input"
          id="adv"
          type="text"
          autoComplete="off"
          value={formState.advantages}
          onChange={handleInputAdvantagesChange}
          data-testid="advantages"
        />
        <p ref={advantagesRef} className="form-review__warning" style={validNoticeStyle} >Заполните поле</p>
        <label
          className="form-review__label form-review__label--required"
          htmlFor="disadv"
        >
          Недостатки
        </label>
        <input
          className="form-review__input"
          id="disadv"
          type="text"
          autoComplete="off"
          value={formState.disadvantages}
          onChange={handleInputDisadvantagesChange}
          data-testid="disadvantages"
        />
        <p ref={disadvantagesRef} className="form-review__warning" style={validNoticeStyle} >Заполните поле</p>
        <label
          className="form-review__label form-review__label--required"
          htmlFor="comment"
        >
          Комментарий
        </label>
        <textarea
          className="form-review__input form-review__input--textarea"
          id="comment"
          rows={10}
          autoComplete="off"
          value={formState.comment}
          onChange={handleInputCommentChange}
          data-testid="comment"
        >
        </textarea>
        <p ref={commentRef} className="form-review__warning" style={validNoticeStyle} >Заполните поле</p>
        <button
          className="button button--medium-20 form-review__button"
          type="submit"
          data-testid="submit"
        >
          Отправить отзыв
        </button>
      </form>
    </Modal>
  );
}

export default ModalReview;
