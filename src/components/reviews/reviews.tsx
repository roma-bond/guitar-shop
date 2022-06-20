import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import ReviewItem from '../review-item/review-item';
import ModalReview from '../modal-review/modal-review';
import ModalSuccessReview from '../modal-success-review/modal-success-review';
import { Review } from '../../types/guitars';
import './reviews.styled.css';

type ReviewsProps = {
  reviews: Review[];
};

function Reviews(props: ReviewsProps): JSX.Element {
  const { reviews } = props;
  const [maxReviewsCount, setMaxReviewsCount] = useState<number>(3);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [isFormDataSubmitted, setIsFormDataSubmitted] = useState(false);

  const renderReviews = (maxCount: number): JSX.Element => (
    <>
      {reviews
        .filter((_review, index) => index < maxCount)
        .map((review) => (
          <ReviewItem key={`review-${review.id}`} review={review} />
        ))}
    </>
  );

  const handleReviewsRenderMore = () => {
    setMaxReviewsCount(maxReviewsCount + 3);
  };

  const handleReviewModalOpen = () => {
    setIsReviewModalOpen(true);
  };

  const handleReviewModalClose = () => {
    setIsReviewModalOpen(false);
  };

  const handleReviewModalSubmit = () => {
    setIsReviewModalOpen(false);
    setIsFormDataSubmitted(true);
  };

  const handleReviewModalSuccessClose = () => {
    setIsFormDataSubmitted(false);
  };

  return (
    <>
      <section className="reviews">
        <h3
          className="reviews__title title title--bigger"
          data-testid="reviews"
        >
          Отзывы
        </h3>
        <Link
          className="button button--red-border button--big reviews__sumbit-button"
          to="#"
          onClick={handleReviewModalOpen}
        >
          Оставить отзыв
        </Link>
        {renderReviews(maxReviewsCount)}
        {reviews.length > maxReviewsCount && (
          <button
            onClick={handleReviewsRenderMore}
            className="button button--medium reviews__more-button"
          >
            Показать еще отзывы
          </button>
        )}
        <HashLink
          className="button button--up button--red-border button--big reviews__up-button"
          to="#header"
        >
          Наверх
        </HashLink>
      </section>
      {isReviewModalOpen && (
        <ModalReview
          onModalClose={handleReviewModalClose}
          onModalSubmit={handleReviewModalSubmit}
        />
      )}
      {isFormDataSubmitted && (
        <ModalSuccessReview onModalClose={handleReviewModalSuccessClose} />
      )}
    </>
  );
}

export default Reviews;
