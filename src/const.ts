export const GUITARS_PER_PAGE = 9;

export const NO_COMMS_ERROR = 1000;

export enum AppRoute {
  Catalog = '/catalog',
  Cart = '/cart',
  Product = '/product',
}

export enum APIRoute {
  Guitars = '/guitars',
  Comments = '/comments',
}

export const estimate = new Map([
  [1, 'Ужасно'],
  [2, 'Плохо'],
  [3, 'Нормально'],
  [4, 'Хорошо'],
  [5, 'Отлично'],
]);

export const guitarMap = new Map([
  ['ukulele', 'Укулеле'],
  ['electric', 'Электрогитара'],
  ['acoustic', 'Акустическая'],
]);

export const monthMap = new Map([
  [1, 'янавря'],
  [2, 'февраля'],
  [3, 'марта'],
  [4, 'апреля'],
  [5, 'мая'],
  [6, 'июня'],
  [7, 'июля'],
  [8, 'августа'],
  [9, 'сентября'],
  [10, 'октября'],
  [11, 'ноября'],
  [12, 'декабря'],
]);

export const validNoticeStyle = { color: '#fefafa' };
