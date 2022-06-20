import { monthMap } from '../const';

export const formatPrice = (price: number) =>
  price
    .toString()
    .split('')
    .reverse()
    .map((digit, index) => ((index + 1) % 3 === 0 ? ` ${digit}` : digit))
    .reverse()
    .join('')
    .trim();

export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = monthMap.get(dateObj.getMonth() + 1);

  return `${day} ${month}`;
};

export const isStringCheckboxDisabled = (
  checkedItems: string[],
  ...necessaryItems: string[]
) => {
  let isDisabled = false;

  if (checkedItems.length > 0) {
    isDisabled =
      checkedItems
        .map((item) => necessaryItems.indexOf(item) >= 0)
        .indexOf(true) === -1;
  }

  return isDisabled;
};

export const convertSearchParamsToObject = (
  params: URLSearchParams,
): { [k: string]: string | string[] } => {
  const searchParamsObj: { [k: string]: string | string[] } = {};
  for (const entry of params.entries()) {
    if (entry[0] === 'stringCount' || entry[0] === 'type') {
      searchParamsObj[entry[0]] = searchParamsObj[entry[0]]
        ? searchParamsObj[entry[0]].concat(entry[1])
        : [entry[1]];
    } else {
      searchParamsObj[entry[0]] = entry[1];
    }
  }
  return searchParamsObj;
};
