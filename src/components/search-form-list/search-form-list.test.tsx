import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { GuitarWithReviews } from '../../types/guitars';
import SearchFormList from './search-form-list';

const guitars: GuitarWithReviews[] = [
  {
    id: 1,
    name: 'Честер Bass',
    vendorCode: 'SO757575',
    type: 'electric',
    description:
      'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
    previewImg: 'img/guitar-1.jpg',
    stringCount: 7,
    rating: 4,
    price: 17500,
    reviews: [],
  },
];

describe('Component: SearchFormList', () => {
  it('should render SearchFormList correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <SearchFormList guitars={guitars} resetGuitars={jest.fn()} />
      </Router>,
    );

    expect(screen.getByText(/Честер Bass/i)).toBeInTheDocument();
    expect(screen.queryByText(/Что-то другое/i)).not.toBeInTheDocument();
  });
});
