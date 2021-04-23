import { IAddresses } from '../profile/model';

export const SEARCH_PAGE_SIZE = 2;

export const SEARCH_PARAM_NAMES = {
  string: 'string',
  sortBy: 'sortBy',
  offset: 'offset',
  radius: 'radius',
  searched: 'searched',
  page: 'page',
  address: 'address',
};

export const sortByFilter = ['rating', 'price', 'quality', 'attitude'];

export const slideMarks = [
  {
    value: 0,
    label: '0 km',
  },
  {
    value: 20,
    label: '20 km',
  },
];

export const defaultAddressFilter: IAddresses[] = [
  {
    name: 'Vị trí của bạn',
    address: {
      lat: 21.019779,
      lng: 105.849649,
      formattedAddress: 'Hoàn Kiếm, Hà Nội',
    },
  },
];
