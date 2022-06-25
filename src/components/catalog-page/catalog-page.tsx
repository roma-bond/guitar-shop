import { useEffect, useState, useRef, ChangeEvent } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ModalCartAdd from '../modal-cart-add/modal-cart-add';
import ModalSuccessAdd from '../modal-success-add/modal-success-add';
import Pagination from '../pagination/pagination';
import ProductCard from '../product-card/product-card';
import { fetchGuitarsAndReviewsAction } from '../../store/api-actions';
import { addGuitarToCart } from '../../store/cart-reducer';
import { Guitar } from '../../types/guitars';
import {
  convertSearchParamsToObject,
  refineSearchParams,
  clearSearchRange
} from '../../utils/utils';
import { RootState } from '../../store/store';
import { Backdrop, CircularProgress } from '@mui/material';
import './catalog-page.css';
import { AppRoute } from '../../const';

function CatalogPage(): JSX.Element {
  const minPriceInputRef = useRef<HTMLInputElement>(null);
  const maxPriceInputRef = useRef<HTMLInputElement>(null);
  const typeAcousticRef = useRef<HTMLInputElement>(null);
  const typeElectricRef = useRef<HTMLInputElement>(null);
  const typeUkuleleRef = useRef<HTMLInputElement>(null);
  const filterBy4StringsInputRef = useRef<HTMLInputElement>(null);
  const filterBy6StringsInputRef = useRef<HTMLInputElement>(null);
  const filterBy7StringsInputRef = useRef<HTMLInputElement>(null);
  const filterBy12StringsInputRef = useRef<HTMLInputElement>(null);
  const sortByPriceInputRef = useRef<HTMLButtonElement>(null);
  const sortByRatingInputRef = useRef<HTMLButtonElement>(null);
  const sortByAscOrderInputRef = useRef<HTMLButtonElement>(null);
  const sortByDescOrderInputRef = useRef<HTMLButtonElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pageid } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { guitars } = useSelector((state: RootState) => state.data);
  const { cartGuitars } = useSelector((state: RootState) => state.cart);
  const { status } = useSelector((state: RootState) => state.server);

  const [minProductPrice, setMinProductPrice] = useState<number | undefined>(
    undefined,
  );
  const [maxProductPrice, setMaxProductPrice] = useState<number | undefined>(
    undefined,
  );
  const [guitarToBuy, setGuitarToBuy] = useState<Guitar | null>(null);
  const [guitarConfirm, setGuitarConfirm] = useState<boolean>(false);
  const [displayedGuitars, setDisplayedGuitars] = useState(guitars);
  const [activePage, setActivePage] = useState(0);
  const [totalGuitars, setTotalGuitars] = useState(Number(searchParams.get('totalGuitars')) || 0);

  useEffect(() => {
    // REFINE search params on start if any
    const refinedSearchParams = refineSearchParams(searchParams);
    if (refinedSearchParams.toString() !== searchParams.toString()) {
      setSearchParams(refinedSearchParams);
    }
    // SETUP initial filters if any
    for(const key of searchParams.keys()) {
      switch (key) {
        case 'price_gte':
          if (minPriceInputRef.current) {
            minPriceInputRef.current.value = searchParams.get(key) || '';
          }
          break;
        case 'price_lte':
          if (maxPriceInputRef.current) {
            maxPriceInputRef.current.value = searchParams.get(key) || '';
          }
          break;
        case 'type':
          searchParams.getAll(key).forEach((guitarType) => {
            switch (guitarType) {
              case 'acoustic':
                if (typeAcousticRef.current) {
                  typeAcousticRef.current.checked = true;
                }
                break;
              case 'electric':
                if (typeElectricRef.current) {
                  typeElectricRef.current.checked = true;
                }
                break;
              case 'ukulele':
                if (typeUkuleleRef.current) {
                  typeUkuleleRef.current.checked = true;
                }
                break;
              default:
                break;
            }
          });
          break;
        case 'stringCount':
          searchParams.getAll(key).forEach((stringAmount) => {
            switch (stringAmount) {
              case '4':
                if (filterBy4StringsInputRef.current) {
                  filterBy4StringsInputRef.current.checked = true;
                }
                break;
              case '6':
                if (filterBy6StringsInputRef.current) {
                  filterBy6StringsInputRef.current.checked = true;
                }
                break;
              case '7':
                if (filterBy7StringsInputRef.current) {
                  filterBy7StringsInputRef.current.checked = true;
                }
                break;
              case '12':
                if (filterBy12StringsInputRef.current) {
                  filterBy12StringsInputRef.current.checked = true;
                }
                break;
              default:
                break;
            }
          });
          break;
        case '_sort':
          if (searchParams.get(key) === 'price' && sortByPriceInputRef.current) {
            sortByPriceInputRef.current.classList.add('catalog-sort__type-button--active');
          } else if (searchParams.get(key) === 'rating' && sortByRatingInputRef.current) {
            sortByRatingInputRef.current.classList.add('catalog-sort__type-button--active');
          }
          break;
        case '_order':
          if (searchParams.get(key) === 'asc' && sortByAscOrderInputRef.current) {
            sortByAscOrderInputRef.current.classList.add('catalog-sort__order-button--active');
          } else if (searchParams.get(key) === 'desc' && sortByDescOrderInputRef.current) {
            sortByDescOrderInputRef.current.classList.add('catalog-sort__order-button--active');
          }
          break;
        default:
          break;
      }
    }

    setActivePage(1);
  }, []);

  useEffect(() => {
    if (activePage > 0) {
      searchParams.toString() === ''
        ? dispatch(fetchGuitarsAndReviewsAction(''))
        : dispatch(fetchGuitarsAndReviewsAction(`?${searchParams.toString()}`));
      const currentActivePage = (Number(searchParams.get('_start')) / 9) + 1 || 1;
      if (currentActivePage !== activePage) {
        setActivePage(currentActivePage);
      }
    }
  }, [dispatch, searchParams, activePage]);

  useEffect(() => {
    if (!searchParams.get('_start')) {
      setTotalGuitars(guitars.length);
      searchParams.set('totalGuitars', guitars.length.toString());
    }
    setDisplayedGuitars(guitars);

    if (guitars.length > 9 && !pageid) {
      navigate({
        pathname: '/catalog/page1',
        search: `?${searchParams.toString()}`,
      });
    }
  }, [guitars]);

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
    if (guitarToBuy) {
      dispatch(addGuitarToCart({...guitarToBuy, guitarCount: 1}));
    }
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
    searchParams.delete('_start');
    searchParams.delete('_limit');
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
    searchParams.delete('_start');
    searchParams.delete('_limit');
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
    searchParams.delete('_start');
    searchParams.delete('_limit');
    const params = new URLSearchParams(searchParams.toString());
    const name = e.target.name;
    if (e.target.checked) {
      params.append('type', name);
    } else {
      const chosenTypes = params.getAll('type');
      params.delete('type');
      chosenTypes.filter((type) => type !== name).forEach((type) => {
        params.append('type', type);
      });
    }

    const selectedTypes = params.getAll('type');
    if (filterBy4StringsInputRef.current &&
      filterBy6StringsInputRef.current &&
      filterBy7StringsInputRef.current &&
      filterBy12StringsInputRef.current) {
      filterBy4StringsInputRef.current.disabled = false;
      filterBy6StringsInputRef.current.disabled = false;
      filterBy7StringsInputRef.current.disabled = false;
      filterBy12StringsInputRef.current.disabled = false;
      if (selectedTypes.length > 0) {
        if (!selectedTypes.includes('electric') && !selectedTypes.includes('ukulele')) {
          filterBy4StringsInputRef.current.disabled = true;
          filterBy4StringsInputRef.current.checked = false;
          const stringArr = params.getAll('stringCount');
          const filteredArr = stringArr.filter((stringAmount) => stringAmount !== '4');
          params.delete('stringCount');
          filteredArr.forEach((stringAmount) => {
            params.append('stringCount', stringAmount.toString());
          });
        }
        if (!selectedTypes.includes('electric') && !selectedTypes.includes('acoustic')) {
          filterBy6StringsInputRef.current.disabled = true;
          filterBy6StringsInputRef.current.checked = false;
          filterBy7StringsInputRef.current.disabled = true;
          filterBy7StringsInputRef.current.checked = false;
          const stringArr = params.getAll('stringCount');
          const filteredArr = stringArr.filter((stringAmount) => stringAmount !== '6' && stringAmount !== '7');
          params.delete('stringCount');
          filteredArr.forEach((stringAmount) => {
            params.append('stringCount', stringAmount.toString());
          });
        }
        if (!selectedTypes.includes('acoustic')) {
          filterBy12StringsInputRef.current.disabled = true;
          const stringArr = params.getAll('stringCount');
          const filteredArr = stringArr.filter((stringAmount) => stringAmount !== '12');
          params.delete('stringCount');
          filteredArr.forEach((stringAmount) => {
            params.append('stringCount', stringAmount.toString());
          });
        }
      }
    }

    setSearchParams(params.toString());
  };

  const handleStringsCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    searchParams.delete('_start');
    searchParams.delete('_limit');
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
  };

  const renderGuitarCards = () => {
    const guitarsJSX = displayedGuitars.map(
      ({ id, name, previewImg, price, rating, reviews }) => (
        <ProductCard
          key={`guitar-${id}`}
          id={id}
          name={name}
          previewImg={previewImg}
          price={price}
          rating={rating}
          reviewsCount={reviews.length}
          isInCart={cartGuitars.findIndex((guitar) => guitar.id === id) >= 0}
          linkTo={`${AppRoute.Catalog}/${pageid ? pageid : 'page1'}?${searchParams.toString()}`}
          onBuy={handleGuitarBuy}
        />
      ),
    );

    return guitarsJSX.filter((_, index) => index < 9);
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
                      ref={minPriceInputRef}
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
                      ref={maxPriceInputRef}
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
                    ref={typeAcousticRef}
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
                    ref={typeElectricRef}
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
                    ref={typeUkuleleRef}
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
                    ref={filterBy4StringsInputRef}
                    className="visually-hidden"
                    type="checkbox"
                    id="4-strings"
                    name="4-strings"
                    onChange={handleStringsCheckboxChange}
                  />
                  <label htmlFor="4-strings">4</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    ref={filterBy6StringsInputRef}
                    className="visually-hidden"
                    type="checkbox"
                    id="6-strings"
                    name="6-strings"
                    onChange={handleStringsCheckboxChange}
                  />
                  <label htmlFor="6-strings">6</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    ref={filterBy7StringsInputRef}
                    className="visually-hidden"
                    type="checkbox"
                    id="7-strings"
                    name="7-strings"
                    onChange={handleStringsCheckboxChange}
                  />
                  <label htmlFor="7-strings">7</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    ref={filterBy12StringsInputRef}
                    className="visually-hidden"
                    type="checkbox"
                    id="12-strings"
                    name="12-strings"
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
            {(totalGuitars > 9) && (
              <Pagination
                totalGuitars={totalGuitars}
                activePage={activePage}
                searchParamsString={searchParams.toString()}
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
        <ModalSuccessAdd
          onContinueShopping={handleGuitarConfirmModalClose}
          onClose={handleGuitarConfirmModalClose}
        />
      )}
    </>
  );
}

export default CatalogPage;
