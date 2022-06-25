import { useRef, MouseEvent, KeyboardEvent, Fragment, RefObject } from 'react';
import { estimate, validNoticeStyle } from '../../const';
import './review-rating.css';

type ReviewRatingProps = {
  onLabelClick: (e: MouseEvent<HTMLLabelElement>) => void;
  onInputChange: (num: number) => void;
  rateIsValid: boolean;
  rating: number;
  ratingRef: RefObject<HTMLParagraphElement> | null;
};

function ReviewRating(props: ReviewRatingProps): JSX.Element {
  const { onLabelClick, onInputChange, rateIsValid, rating, ratingRef } = props;

  const star1Ref = useRef<HTMLInputElement>(null);
  const star2Ref = useRef<HTMLInputElement>(null);
  const star3Ref = useRef<HTMLInputElement>(null);
  const star4Ref = useRef<HTMLInputElement>(null);
  const star5Ref = useRef<HTMLInputElement>(null);

  const starRefs = [star1Ref, star2Ref, star3Ref, star4Ref, star5Ref];

  const renderReviewRatingStars = () => {
    const JSXarray: JSX.Element[] = [];
    for (let i = 5; i > 0; i--) {
      JSXarray.push(
        <Fragment key={`review-rating-star-${i}`}>
          <input
            ref={starRefs[i-1]}
            className="visually-hidden"
            id={`star-${i}`}
            name="rate"
            type="radio"
            value={i.toString()}
          />
          <label
            className="rate__label"
            htmlFor={`star-${i}`}
            title={estimate.get(i)}
            onClick={onLabelClick}
            data-testid={`star-${i}`}
          >
          </label>
        </Fragment>,
      );
    }

    return JSXarray;
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      let index;
      if (rating <= 1) {
        index = 5;
      } else {
        index = starRefs.findIndex((input) => input.current?.checked);
      }
      const nextStarEl = starRefs[index - 1].current;
      if (nextStarEl !== null) {
        nextStarEl.checked = true;
        starRefs[index - 1].current?.focus();
      }
      onInputChange(index);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      let index;
      if (rating === 5) {
        index = -1;
      } else {
        index = starRefs.findIndex((input) => input.current?.checked);
      }
      const nextStarEl = starRefs[index + 1].current;
      if (nextStarEl !== null) {
        nextStarEl.checked = true;
        starRefs[index + 1].current?.focus();
      }
      onInputChange(index + 2);
    }
  };

  return (
    <div className="rate rate--reverse" tabIndex={-1} onKeyDown={handleKeyPress}>
      {renderReviewRatingStars()}
      {!rateIsValid && <p ref={ratingRef} className="rate__message" style={validNoticeStyle}>Поставьте оценку</p>}
    </div>
  );
}

export default ReviewRating;
