import { useState, useRef, ChangeEvent, FocusEvent, FormEvent } from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchFormList from '../search-form-list/search-form-list';
import { RootState } from '../../store/store';
import { GuitarWithReviews } from '../../types/guitars';
import { AppRoute } from '../../const';
import './header.css';

function Header(): JSX.Element {
  const navigate = useNavigate();

  const { guitars } = useSelector((state: RootState) => state.data);
  const { cartGuitars } = useSelector((state: RootState) => state.cart);

  const guitarIndex = cartGuitars.reduce((prev, cartGuitar) => prev + cartGuitar.guitarCount, 0);

  const [ searchResultGuitars, setSearchResultGuitars ] = useState<GuitarWithReviews[]>([]);
  const [ filterPhrase, setFilterPhrase ] = useState<string>('');

  const [searchParams] = useSearchParams();

  const activeClassName = 'link main-nav__link link--current';
  const notActiveClassName = 'link main-nav__link';

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterPhrase(e.target.value.trim().toLowerCase());
    const filteredGuitars = guitars.filter((guitar) => guitar.name.toLowerCase().includes(filterPhrase));
    if (filterPhrase === '') {
      setSearchResultGuitars([]);
    } else {
      setSearchResultGuitars(filteredGuitars);
    }
  };

  const handleInputReset = () => {
    setSearchResultGuitars([]);
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  };

  const handleSearchBlur = (e: FocusEvent<HTMLDivElement>) => {
    const className = e.relatedTarget?.className || null;
    if (className === null ||
      (className !== 'form-search__input' &&
      className !== 'form-search__select-item' &&
      className !== 'form-search__submit' &&
      className !== 'form-search__reset')) {
      handleInputReset();
    }
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const params = { name: filterPhrase };
    const params = new URLSearchParams(searchParams.toString());
    params.delete('name_like');
    params.set('name_like', filterPhrase);
    navigate({
      pathname: '/catalog',
      search: `?${params.toString()}`,
    });
    handleInputReset();
  };

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link to={AppRoute.Catalog} className="header__logo logo">
          <img
            className="logo__img"
            width="70"
            height="70"
            src="../../../img/svg/logo.svg"
            alt="??????????????"
          />
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <NavLink
                to={AppRoute.Catalog}
                className={({ isActive }) =>
                  isActive ? activeClassName : notActiveClassName}
              >
                ??????????????
              </NavLink>
            </li>
            <li>
              <NavLink
                to={AppRoute.Catalog}
                className={({ isActive }) =>
                  isActive ? activeClassName : notActiveClassName}
              >
                ?????? ?????????????
              </NavLink>
            </li>
            <li>
              <NavLink
                to={AppRoute.Catalog}
                className={({ isActive }) =>
                  isActive ? activeClassName : notActiveClassName}
              >
                ?? ????????????????
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="form-search" onBlur={handleSearchBlur}>
          <form className="form-search__form" id="form-search" onSubmit={handleSearchSubmit}>
            <button className="form-search__submit" type="submit">
              <svg
                className="form-search__icon"
                width="14"
                height="15"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-search"></use>
              </svg>
              <span className="visually-hidden">???????????? ??????????</span>
            </button>
            <input
              ref={searchInputRef}
              className="form-search__input"
              id="search"
              type="text"
              autoComplete="off"
              placeholder="?????? ???? ???????????"
              onChange={handleInputChange}
            />
            <label className="visually-hidden" htmlFor="search">
              ??????????
            </label>
          </form>
          <SearchFormList guitars={searchResultGuitars} resetGuitars={handleInputReset} />
          <button
            className="form-search__reset"
            type="reset"
            form="form-search"
            onClick={handleInputReset}
          >
            <svg
              className="form-search__icon"
              width="14"
              height="15"
              aria-hidden="true"
            >
              <use xlinkHref="#icon-close"></use>
            </svg>
            <span className="visually-hidden">???????????????? ??????????</span>
          </button>
        </div>
        <Link className="header__cart-link" to="/cart" aria-label="??????????????">
          <svg
            className="header__cart-icon"
            width="14"
            height="14"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">?????????????? ?? ??????????????</span>
          {
            guitarIndex > 0 && <span className="header__cart-count" data-testid="cartIndex">{guitarIndex}</span>
          }
        </Link>
      </div>
    </header>
  );
}

export default Header;
