import { KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { GuitarWithReviews } from '../../types/guitars';
import { AppRoute } from '../../const';
import './search-form-list.css';

type SearchFormListProps = {
  guitars: GuitarWithReviews[];
  resetGuitars: () => void;
};

function SearchFormList(props: SearchFormListProps): JSX.Element {
  const navigate = useNavigate();
  const { guitars, resetGuitars } = props;
  const isListVisible = guitars.length > 0 ? 'list-opened' : 'hidden';

  const handleListItemClick = (id: number) => {
    navigate(`${AppRoute.Product}/${id}`);
    resetGuitars();
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLLIElement>) => {
    event.preventDefault();
    const element = event.target as HTMLLIElement;
    const id = element.getAttribute('data-id');
    if (event.key === 'Enter') {
      navigate(`${AppRoute.Product}/${id}`);
      resetGuitars();
    }
  };

  return (
    <ul className={`form-search__select-list ${isListVisible}`}>
      {guitars.map((guitar) => (
        <li
          key={`search-${guitar.id}`}
          className="form-search__select-item"
          tabIndex={0}
          onClick={handleListItemClick.bind(null, guitar.id)}
          data-id={guitar.id}
          onKeyUp={handleKeyUp}
        >
          {guitar.name}
        </li>
      ))}
    </ul>
  );
}

export default SearchFormList;
