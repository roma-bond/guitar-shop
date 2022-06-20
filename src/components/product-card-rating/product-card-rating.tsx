import { estimate } from '../../const';

type ProductCardRatingProps = {
  id: string;
  rating: number;
  starWidth: number;
  starHeight: number;
  componentClassName: string;
  estimateLabel: string;
  reviewsCount: number | null;
};

function ProductCardRating(props: ProductCardRatingProps): JSX.Element {
  const {
    id,
    rating,
    starWidth,
    starHeight,
    componentClassName,
    estimateLabel,
    reviewsCount,
  } = props;

  const renderRatingStars = (starRating: number) => {
    const stars: JSX.Element[] = [];

    for (let index = 0; index < 5; index++) {
      stars[index] = (
        <svg
          key={`${id}-${index}-rating`}
          width={starWidth}
          height={starHeight}
          aria-hidden="true"
        >
          {index + 1 <= starRating ? (
            <use xlinkHref="#icon-full-star" data-testid="full-star"></use>
          ) : (
            <use xlinkHref="#icon-star"></use>
          )}
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className={`rate ${componentClassName}`}>
      {renderRatingStars(rating)}
      <p className="visually-hidden">
        {estimateLabel}: {estimate.get(rating)}
      </p>
      {reviewsCount && (
        <p className="rate__count">
          <span className="visually-hidden">Всего оценок:</span>
          {reviewsCount}
        </p>
      )}
    </div>
  );
}

export default ProductCardRating;
