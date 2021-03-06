import { Link } from 'react-router-dom';
import { GUITARS_PER_PAGE, AppRoute } from '../../const';
import cn from 'classnames';
import './pagination.css';

type PaginationProps = {
  totalGuitars: number;
  activePage: number;
  searchParamsString: string;
};

function Pagination(props: PaginationProps): JSX.Element {
  const { totalGuitars, activePage, searchParamsString } = props;
  const pagesAmount = Math.ceil(totalGuitars / GUITARS_PER_PAGE);

  const renderPreviousButton = () => {
    const localParams = new URLSearchParams(searchParamsString);
    const start = Number(localParams.get('_start'));
    localParams.set('_start', (start - GUITARS_PER_PAGE).toString());
    localParams.set('_limit', GUITARS_PER_PAGE.toString());
    return (
      activePage !== 1 && (
        <li className="pagination__page pagination__page--prev" id="prev">
          <Link
            className="link pagination__page-link"
            to={`${AppRoute.Catalog}/page${activePage - 1}?${localParams.toString()}`}
          >
            Назад
          </Link>
        </li>
      )
    );
  };

  const renderPageButtons = () => {
    const pages: JSX.Element[] = [];

    for (let index = 0; index < pagesAmount; index++) {
      const localParams = new URLSearchParams(searchParamsString);
      localParams.set('_start', (index * GUITARS_PER_PAGE).toString());
      localParams.set('_limit', GUITARS_PER_PAGE.toString());

      pages[index] = (
        <li
          key={`pagination-page-${index}`}
          className={cn(
            'pagination__page',
            {'pagination__page--active': activePage === index + 1},
          )}
        >
          <Link
            className="link pagination__page-link"
            to={`${AppRoute.Catalog}/page${index + 1}?${localParams.toString()}`}
          >
            {index + 1}
          </Link>
        </li>
      );
    }

    return pages;
  };

  const renderNextButton = () => {
    if (activePage !== pagesAmount) {
      const localParams = new URLSearchParams(searchParamsString);
      const start = Number(localParams.get('_start'));
      localParams.set('_start', (start + GUITARS_PER_PAGE).toString());
      localParams.set('_limit', GUITARS_PER_PAGE.toString());
      return (
        <li className="pagination__page pagination__page--next" id="next">
          <Link
            className="link pagination__page-link"
            to={`${AppRoute.Catalog}/page${activePage + 1}?${localParams.toString()}`}
          >
            Далее
          </Link>
        </li>
      );
    }
  };

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {renderPreviousButton()}
        {renderPageButtons()}
        {renderNextButton()}
      </ul>
    </div>
  );
}

export default Pagination;
