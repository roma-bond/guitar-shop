import { useEffect, useState, useRef, ChangeEvent } from 'react';
import { useSearchParams, createSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Guitar } from '../../types/guitars';
import ProductCard from '../product-card/product-card';
import Pagination from '../pagination/pagination';
import ModalCartAdd from '../modal-cart-add/modal-cart-add';
import ModalSuccessAdd from '../modal-success-add/modal-success-add';
import { fetchGuitarsAndReviewsAction } from '../../store/api-actions';
import { GUITARS_PER_PAGE } from '../../const';
import {
  isStringCheckboxDisabled,
  convertSearchParamsToObject
} from '../../utils/utils';
import { RootState } from '../../store/store';
import { Backdrop, CircularProgress } from '@mui/material';
import './catalog-page.styled.css';

const getActivePage = (start: string | string[]) =>
  start && typeof start === 'string' && Number(start) > 0
    ? (Number(start) / GUITARS_PER_PAGE) + 1
    : 1;

const clearSearchRange = (paramsObj: { [k: string]: string | string[] }) => {
  delete paramsObj._start;
  delete paramsObj._limit;
};

function CatalogPage(): JSX.Element {
  const sortByPriceInputRef = useRef<HTMLButtonElement>(null);
  const sortByRatingInputRef = useRef<HTMLButtonElement>(null);
  const sortByAscOrderInputRef = useRef<HTMLButtonElement>(null);
  const sortByDescOrderInputRef = useRef<HTMLButtonElement>(null);

  const { guitars } = useSelector((state: RootState) => state.data);
  const { status } = useSelector((state: RootState) => state.server);

  const [minProductPrice, setMinProductPrice] = useState<number | undefined>(
    undefined,
  );
  const [maxProductPrice, setMaxProductPrice] = useState<number | undefined>(
    undefined,
  );
  const [guitarToBuy, setGuitarToBuy] = useState<Guitar | null>(null);
  const [guitarConfirm, setGuitarConfirm] = useState<boolean>(false);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [displayedGuitars, setDisplayedGuitars] = useState(guitars);
  const [activePage, setActivePage] = useState(1);

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const currentParams = convertSearchParamsToObject(searchParams);
    if (currentParams.name && typeof currentParams.name === 'string' ) {
      setNameFilter(currentParams.name);
      delete currentParams.name;
    }
    Object.entries(currentParams).length === 0
      ? dispatch(fetchGuitarsAndReviewsAction(''))
      : dispatch(fetchGuitarsAndReviewsAction(`?${createSearchParams(currentParams).toString()}`));
    const currentActivePage = getActivePage(currentParams._start);
    if (currentActivePage !== activePage) {
      setActivePage(currentActivePage);
    }
  }, [dispatch, searchParams, activePage]);

  useEffect(() => {
    if (!searchParams.get('_start')) {
      nameFilter === ''
        ? setDisplayedGuitars(guitars)
        : setDisplayedGuitars(guitars.filter((guitar) => guitar.name.toLowerCase().includes(nameFilter.toLowerCase())));
    }
  }, [guitars, nameFilter]);

  useEffect(() => {
    const min = Math.min(...displayedGuitars.map((guitar) => guitar.price));
    const max = Math.max(...displayedGuitars.map((guitar) => guitar.price));
    setMinProductPrice(Math.abs(min) !== Infinity ? min : undefined);
    setMaxProductPrice(Math.abs(max) !== Infinity ? max : undefined);
  }, [displayedGuitars]);

  const handleGuitarBuy = (id: number) => {
    const guitarChoice = guitars.find((guitar) => guitar.id === id);
    if (guitarChoice) {
      setGuitarToBuy(guitarChoice);
    }
  };

  const handleGuitarAddToCart = () => {
    setGuitarToBuy(null);
    setGuitarConfirm(true);
  };

  const handleGuitarAddModalClose = () => {
    setGuitarToBuy(null);
  };

  const handleGuitarConfirmModalClose = () => {
    setGuitarConfirm(false);
  };

  const handleGuitarSort = (sort: string) => {
    const searchParamsObj = convertSearchParamsToObject(searchParams);
    searchParamsObj._sort = sort;
    if (sort === 'price') {
      sortByPriceInputRef.current?.classList.add('catalog-sort__type-button--active');
      sortByRatingInputRef.current?.classList.remove('catalog-sort__type-button--active');
    } else {
      sortByRatingInputRef.current?.classList.add('catalog-sort__type-button--active');
      sortByPriceInputRef.current?.classList.remove('catalog-sort__type-button--active');
    }
    clearSearchRange(searchParamsObj);
    setSearchParams(searchParamsObj);
  };

  const handleGuitarSortOrder = (order: string) => {
    const searchParamsObj = convertSearchParamsToObject(searchParams);
    searchParamsObj._order = order;
    if (!searchParamsObj._sort) {
      searchParamsObj._sort = 'price';
    }
    if (order === 'asc') {
      sortByAscOrderInputRef.current?.classList.add('catalog-sort__order-button--active');
      sortByDescOrderInputRef.current?.classList.remove('catalog-sort__order-button--active');
    } else {
      sortByDescOrderInputRef.current?.classList.add('catalog-sort__order-button--active');
      sortByAscOrderInputRef.current?.classList.remove('catalog-sort__order-button--active');
    }
    clearSearchRange(searchParamsObj);
    setSearchParams(searchParamsObj);
  };

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchParamsObj = convertSearchParamsToObject(searchParams);
    if (e.target.value) {
      e.preventDefault();
      const gteVal = 'price_gte';

      if (Number(e.target.value) < 0) {
        e.target.value = '0';
        searchParamsObj[gteVal] = '0';
      } else if (maxProductPrice && Number(e.target.value) > maxProductPrice) {
        e.target.value = maxProductPrice.toString();
        searchParamsObj[gteVal] = maxProductPrice.toString();
      } else {
        searchParamsObj[gteVal] = e.target.value;
      }
      clearSearchRange(searchParamsObj);
      setSearchParams(searchParamsObj);
    } else if (!e.target.value && searchParamsObj.price_gte) {
      delete searchParamsObj.price_gte;
      clearSearchRange(searchParamsObj);
      setSearchParams(searchParamsObj);
    }
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchParamsObj = convertSearchParamsToObject(searchParams);
    if (e.target.value) {
      e.preventDefault();
      const lteVal = 'price_lte';

      if (minProductPrice && Number(e.target.value) < minProductPrice) {
        e.target.value = minProductPrice.toString();
        searchParamsObj[lteVal] = minProductPrice.toString();
      } else if (maxProductPrice && Number(e.target.value) > maxProductPrice) {
        e.target.value = maxProductPrice.toString();
        searchParamsObj[lteVal] = maxProductPrice.toString();
      } else {
        searchParamsObj[lteVal] = e.target.value;
      }
      clearSearchRange(searchParamsObj);
      setSearchParams(searchParamsObj);
    } else if (!e.target.value && searchParamsObj.price_lte) {
      delete searchParamsObj.price_lte;
      clearSearchRange(searchParamsObj);
      setSearchParams(searchParamsObj);
    }
  };

  const handleTypeCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchParamsObj = convertSearchParamsToObject(searchParams);
    clearSearchRange(searchParamsObj);
    e.target.checked
      ? setSearchParams({
        ...searchParamsObj,
        type: searchParams.getAll('type').concat(e.target.name),
      })
      : setSearchParams({
        ...searchParamsObj,
        type: searchParams
          .getAll('type')
          .filter((type) => type !== e.target.name),
      });
  };

  const handleStringsCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchParamsObj = convertSearchParamsToObject(searchParams);
    clearSearchRange(searchParamsObj);
    const name = e.target.name.split('-')[0];
    e.target.checked
      ? setSearchParams({
        ...searchParamsObj,
        stringCount: searchParams.getAll('stringCount').concat(name),
      })
      : setSearchParams({
        ...searchParamsObj,
        stringCount: searchParams
          .getAll('stringCount')
          .filter((amount) => amount !== name),
      });
  };

  const handleResetFilterClick = () => {
    setSearchParams({});
    setNameFilter('');
  };

  const renderGuitarCards = () => {
    const guitarsJSX = displayedGuitars.map(
      ({ id, name, previewImg, price, rating, reviews }) => {
        const localImg = `./img/content/catalog-product-${
          previewImg.split('-')[1]
        }`;

        return (
          <ProductCard
            key={`guitar-${id}`}
            id={id}
            name={name}
            previewImg={localImg}
            price={price}
            rating={rating}
            reviewsCount={reviews.length}
            onBuy={handleGuitarBuy}
          />
        );
      },
    );

    const min = (activePage - 1) * GUITARS_PER_PAGE;
    const max = activePage * GUITARS_PER_PAGE;
    return guitarsJSX.filter((_, index) => index >= min && index < max);
  };

  return (
    <>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">
            Каталог гитар
          </h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <a className="link" href="./main.html">
                Главная
              </a>
            </li>
            <li className="breadcrumbs__item">
              <a className="link">Каталог</a>
            </li>
          </ul>
          <div className="catalog">
            <form className="catalog-filter">
              <h2 className="title title--bigger catalog-filter__title">
                Фильтр
              </h2>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Цена, ₽</legend>
                <div className="catalog-filter__price-range">
                  <div className="form-input">
                    <label className="visually-hidden" htmlFor="priceMin">Минимальная цена</label>
                    <input
                      type="number"
                      placeholder={minProductPrice?.toString()}
                      id="priceMin"
                      name="от"
                      min={0}
                      onBlur={handleMinPriceChange}
                    />
                  </div>
                  <div className="form-input">
                    <label className="visually-hidden" htmlFor="priceMax">Максимальная цена</label>
                    <input
                      type="number"
                      placeholder={maxProductPrice?.toString()}
                      id="priceMax"
                      name="до"
                      min={0}
                      onBlur={handleMaxPriceChange}
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">
                  Тип гитар
                </legend>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="acoustic"
                    name="acoustic"
                    onChange={handleTypeCheckboxChange}
                  />
                  <label htmlFor="acoustic">Акустические гитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="electric"
                    name="electric"
                    onChange={handleTypeCheckboxChange}
                  />
                  <label htmlFor="electric">Электрогитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="ukulele"
                    name="ukulele"
                    onChange={handleTypeCheckboxChange}
                  />
                  <label htmlFor="ukulele">Укулеле</label>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">
                  Количество струн
                </legend>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="4-strings"
                    name="4-strings"
                    disabled={isStringCheckboxDisabled(
                      searchParams.getAll('type'),
                      'electric',
                      'ukulele',
                    )}
                    onChange={handleStringsCheckboxChange}
                  />
                  <label htmlFor="4-strings">4</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="6-strings"
                    name="6-strings"
                    disabled={isStringCheckboxDisabled(
                      searchParams.getAll('type'),
                      'acoustic',
                      'electric',
                    )}
                    onChange={handleStringsCheckboxChange}
                  />
                  <label htmlFor="6-strings">6</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="7-strings"
                    name="7-strings"
                    disabled={isStringCheckboxDisabled(
                      searchParams.getAll('type'),
                      'acoustic',
                      'electric',
                    )}
                    onChange={handleStringsCheckboxChange}
                  />
                  <label htmlFor="7-strings">7</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="12-strings"
                    name="12-strings"
                    disabled={isStringCheckboxDisabled(
                      searchParams.getAll('type'),
                      'acoustic',
                    )}
                    onChange={handleStringsCheckboxChange}
                  />
                  <label htmlFor="12-strings">12</label>
                </div>
              </fieldset>
              <button
                className="catalog-filter__reset-btn button button--black-border button--medium"
                type="reset"
                onClick={handleResetFilterClick}
              >
                Очистить
              </button>
            </form>
            <div className="catalog-sort">
              <h2 className="catalog-sort__title">Сортировать:</h2>
              <div className="catalog-sort__type">
                <button
                  ref={sortByPriceInputRef}
                  className="catalog-sort__type-button"
                  aria-label="по цене"
                  onClick={handleGuitarSort.bind(null, 'price')}
                >
                  по цене
                </button>
                <button
                  ref={sortByRatingInputRef}
                  className="catalog-sort__type-button"
                  aria-label="по популярности"
                  onClick={handleGuitarSort.bind(null, 'rating')}
                >
                  по популярности
                </button>
              </div>
              <div className="catalog-sort__order">
                <button
                  ref={sortByAscOrderInputRef}
                  className="catalog-sort__order-button catalog-sort__order-button--up"
                  aria-label="По возрастанию"
                  onClick={handleGuitarSortOrder.bind(null, 'asc')}
                >
                </button>
                <button
                  ref={sortByDescOrderInputRef}
                  className="catalog-sort__order-button catalog-sort__order-button--down"
                  aria-label="По убыванию"
                  onClick={handleGuitarSortOrder.bind(null, 'desc')}
                >
                </button>
              </div>
            </div>
            {status &&
              status >= 200 &&
              status < 300 &&
              displayedGuitars &&
              displayedGuitars.length !== 0 && (
              <div className="cards catalog__cards" data-testid="catalog">
                {renderGuitarCards()}
              </div>
            )}
            {!status && (
              <Backdrop open>
                <CircularProgress color="inherit" />
              </Backdrop>
            )}
            {displayedGuitars.length > 9 && (
              <Pagination
                totalGuitars={displayedGuitars.length}
                activePage={activePage}
                searchParams={searchParams}
              />
            )}
          </div>
        </div>
      </main>
      {guitarToBuy && (
        <ModalCartAdd
          name={guitarToBuy.name}
          vendorCode={guitarToBuy.vendorCode}
          previewImg={guitarToBuy.previewImg}
          stringCount={guitarToBuy.stringCount}
          price={guitarToBuy.price}
          onClose={handleGuitarAddModalClose}
          onAddToCart={handleGuitarAddToCart}
        />
      )}
      {guitarConfirm && (
        <ModalSuccessAdd onContinueShopping={handleGuitarConfirmModalClose} />
      )}
    </>
  );
}

export default CatalogPage;
