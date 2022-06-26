import {
  formatPrice,
  formatDate,
  isStringCheckboxDisabled,
  convertSearchParamsToObject,
  clearSearchRange
} from './utils';

describe('Utils: helper functions', () => {
  it('formatPrice should properly format input prices', () => {
    const price1 = 10000;
    const formattedPrice1 = formatPrice(price1);
    expect(formattedPrice1).toBe('10 000');

    const price2 = 210000;
    const formattedPrice2 = formatPrice(price2);
    expect(formattedPrice2).toBe('210 000');

    const price3 = 4210000;
    const formattedPrice3 = formatPrice(price3);
    expect(formattedPrice3).toBe('4 210 000');
  });

  it('formatDate should properly format input dates', () => {
    const date1 = '2021-10-28T12:32:16.934Z';
    const formattedDate1 = formatDate(date1);
    expect(formattedDate1).toBe('28 октября');

    const date2 = '2021-03-08T12:32:16.934Z';
    const formattedDate2 = formatDate(date2);
    expect(formattedDate2).toBe('8 марта');
  });

  it('isStringCheckboxDisabled should return FALSE when no types selected', () => {
    const searchParams = new URLSearchParams();
    const isDisabled = isStringCheckboxDisabled(
      searchParams.getAll('type'),
      'electric',
      'ukulele',
    );
    expect(isDisabled).toBe(false);
  });

  it('isStringCheckboxDisabled should return FALSE when necessary types are present in searchParams', () => {
    const searchParams = new URLSearchParams([['type', 'electric'], ['type', 'ukulele'], ['sort', 'price']]);
    const isDisabled = isStringCheckboxDisabled(
      searchParams.getAll('type'),
      'electric',
      'ukulele',
    );
    expect(isDisabled).toBe(false);
  });

  it('isStringCheckboxDisabled should return TRUE when necessary types are missing in searchParams', () => {
    const searchParams = new URLSearchParams([['type', 'acoustic'], ['sort', 'price']]);
    const isDisabled = isStringCheckboxDisabled(
      searchParams.getAll('type'),
      'electric',
      'ukulele',
    );
    expect(isDisabled).toBe(true);
  });

  it('convertSearchParamsToObject should return an object of searchParams', () => {
    const searchParams = new URLSearchParams([['type', 'acoustic'], ['sort', 'price'], ['order', 'desc']]);
    const searchParamsObj = convertSearchParamsToObject(searchParams);
    expect(searchParamsObj).toEqual({
      type: ['acoustic'],
      sort: 'price',
      order: 'desc',
    });
  });

  it('clearSearchRange should delete properties _start and _limit', () => {
    const testParamsObj = {
      totalGuitars: '20',
      _start: '9',
      _limit: '9',
    };
    clearSearchRange(testParamsObj);
    expect(testParamsObj).toEqual({ totalGuitars: '20' });
  });
});
