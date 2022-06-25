import { Link } from 'react-router-dom';
import ProductCardRating from '../product-card-rating/product-card-rating';
import { AppRoute } from '../../const';
import { formatPrice } from '../../utils/utils';
import './product-card.css';

type ProductCardProps = {
  id: number;
  name: string;
  previewImg: string;
  rating: number;
  price: number;
  reviewsCount: number;
  isInCart: boolean;
  linkTo: string;
  onBuy: (id: number) => void;
};

function ProductCard(props: ProductCardProps): JSX.Element {
  const { id, name, previewImg, rating, price, reviewsCount, isInCart, linkTo, onBuy } = props;

  const formattedPrice = formatPrice(price);
  const linkClass = isInCart
    ? 'button--red-border button--in-cart'
    : 'button--red button--add-to-cart';

  return (
    <div className="product-card" data-testid="product">
      <img
        src={previewImg}
        srcSet={`${previewImg.split('.jpg')[0]}@2x.jpg 2x`}
        width="75"
        height="190"
        alt={name}
      />
      <div className="product-card__info">
        <ProductCardRating
          rating={rating}
          id={id.toString()}
          starWidth={12}
          starHeight={11}
          componentClassName={'product-card__rate'}
          estimateLabel={'Рейтинг'}
          reviewsCount={reviewsCount}
        />
        <p className="product-card__title" data-testid="name">{name}</p>
        <p className="product-card__price" data-testid="price">
          <span className="visually-hidden">Цена:</span>
          {formattedPrice} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={`${AppRoute.Product}/${id}`}>
          Подробнее
        </Link>
        <Link
          className={`button button--mini ${linkClass}`}
          to={linkTo}
          onClick={onBuy.bind(null, id)}
        >
          {isInCart ? 'В Корзине' : 'Купить'}
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
