import ProductCardRating from '../product-card-rating/product-card-rating';
import { Review } from '../../types/guitars';
import { formatDate } from '../../utils/utils';
import './review-item.styled.css';

type ReviewItemProps = {
  review: Review;
};

function ReviewItem(props: ReviewItemProps): JSX.Element {
  const {
    review: {
      userName,
      createAt,
      rating,
      advantage,
      disadvantage,
      comment,
      id,
    },
  } = props;

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">
          {userName}
        </h4>
        <span className="review__date">{formatDate(createAt)}</span>
      </div>
      <ProductCardRating
        id={id}
        rating={rating}
        starWidth={16}
        starHeight={16}
        componentClassName={'review__rating-panel'}
        estimateLabel={'Оценка'}
        reviewsCount={null}
      />
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value" data-testid="advantage">{advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value" data-testid="disadvantage">{disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value" data-testid="comment">{comment}</p>
    </div>
  );
}

export default ReviewItem;
