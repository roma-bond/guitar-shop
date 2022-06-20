import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useDispatch, useSelector } from 'react-redux';
import ProductCardRating from '../product-card-rating/product-card-rating';
import { fetchGuitarAndReviewsAction } from '../../store/api-actions';
import { RootState } from '../../store/store';
import { AppRoute, guitarMap } from '../../const';
import { formatPrice } from '../../utils/utils';
import Reviews from '../reviews/reviews';
import { Backdrop, CircularProgress } from '@mui/material';
import './product-page.styled.css';

function ProductPage(): JSX.Element {
  const { guitarId } = useParams();
  const { guitar } = useSelector((state: RootState) => state.data);
  const characteristicsButtonRef = useRef<HTMLAnchorElement>(null);
  const descriptionButtonRef = useRef<HTMLAnchorElement>(null);
  const characteristicsRef = useRef<HTMLTableElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (guitarId) {
      dispatch(fetchGuitarAndReviewsAction(Number(guitarId)));
    }
  }, [dispatch, guitarId]);

  const handleGuitarCharacteristicsButtonClick = () => {
    if (characteristicsButtonRef.current && descriptionButtonRef.current) {
      characteristicsButtonRef.current.classList.remove('button--black-border');
      descriptionButtonRef.current.classList.add('button--black-border');
    }
    if (descriptionRef.current) {
      descriptionRef.current.classList.add('hidden');
    }
    if (characteristicsRef.current) {
      characteristicsRef.current.classList.remove('hidden');
    }
  };

  const handleGuitarDescriptionButtonClick = () => {
    if (characteristicsButtonRef.current && descriptionButtonRef.current) {
      descriptionButtonRef.current.classList.remove('button--black-border');
      characteristicsButtonRef.current.classList.add('button--black-border');
    }
    if (characteristicsRef.current) {
      characteristicsRef.current.classList.add('hidden');
    }
    if (descriptionRef.current) {
      descriptionRef.current.classList.remove('hidden');
    }
  };

  return (
    <main className="page-content">
      <div className="container">
        {guitar && (
          <>
            <h1
              className="page-content__title title title--bigger"
              data-testid="guitar-name"
            >
              {guitar.name}
            </h1>
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item">
                <a className="link" href="./main.html">
                  Главная
                </a>
              </li>
              <li className="breadcrumbs__item">
                <Link className="link" to={AppRoute.Catalog}>
                  Каталог
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="link">{guitar.name}</a>
              </li>
            </ul>
            <div className="product-container">
              <img
                className="product-container__img"
                src={guitar.previewImg}
                srcSet={`${guitar.previewImg}@2x.jpg 2x`}
                width="90"
                height="235"
                alt={guitar.name}
              />
              <div className="product-container__info-wrapper">
                <h2 className="product-container__title title title--big title--uppercase">
                  {guitar.name}
                </h2>
                <ProductCardRating
                  rating={guitar.rating}
                  id={guitar.id.toString()}
                  starWidth={14}
                  starHeight={14}
                  componentClassName={'product-container__rating'}
                  estimateLabel={'Оценка'}
                  reviewsCount={guitar.reviews.length}
                />
                <div className="tabs">
                  <HashLink
                    ref={characteristicsButtonRef}
                    className="button button--medium tabs__button"
                    to={'#characteristics'}
                    onClick={handleGuitarCharacteristicsButtonClick}
                    scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })}
                  >
                    Характеристики
                  </HashLink>
                  <HashLink
                    ref={descriptionButtonRef}
                    className="button button--black-border button--medium tabs__button"
                    to={'#description'}
                    onClick={handleGuitarDescriptionButtonClick}
                    scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })}
                  >
                    Описание
                  </HashLink>
                  <div className="tabs__content">
                    <table
                      className="tabs__table"
                      id="characteristics"
                      ref={characteristicsRef}
                    >
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Артикул:</td>
                        <td className="tabs__value">{guitar.vendorCode}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Тип:</td>
                        <td className="tabs__value">
                          {guitarMap.get(guitar.type)}
                        </td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Количество струн:</td>
                        <td className="tabs__value">
                          {guitar.stringCount} струнная
                        </td>
                      </tr>
                    </table>
                    <p
                      className="tabs__product-description hidden"
                      id="description"
                      ref={descriptionRef}
                    >
                      {guitar.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="product-container__price-wrapper">
                <p className="product-container__price-info product-container__price-info--title">
                  Цена:
                </p>
                <p className="product-container__price-info product-container__price-info--value">
                  {formatPrice(guitar.price)} ₽
                </p>
                <a
                  className="button button--red button--big product-container__button"
                  href="#"
                >
                  Добавить&nbsp;в&nbsp;корзину
                </a>
              </div>
            </div>
            <Reviews reviews={guitar.reviews} data-testid="guitar-reviews" />
          </>
        )}
        {!guitar && (
          <Backdrop open>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </div>
    </main>
  );
}

export default ProductPage;