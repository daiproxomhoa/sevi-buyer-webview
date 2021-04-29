import { some } from '../common/constants';
import { SEARCH_PARAM_NAMES } from './constants';
import { defaultSearchFilter, ISellerSearchFilter } from './model';

export function parseSearchParams(search: string, profile?: some): ISellerSearchFilter {
  const buyerAddress = profile?.addresses?.length ? profile.addresses[0] : defaultSearchFilter.address;

  if (!search) {
    return { ...defaultSearchFilter, address: buyerAddress };
  }

  const params = new URLSearchParams(search);

  const offset = params.get(SEARCH_PARAM_NAMES.offset);
  const radius = params.get(SEARCH_PARAM_NAMES.radius);
  const searched = params.get(SEARCH_PARAM_NAMES.searched);
  // const page = params.get(SEARCH_PARAM_NAMES.page);
  const address = params.get(SEARCH_PARAM_NAMES.address);

  return {
    ...defaultSearchFilter,
    string: params.get(SEARCH_PARAM_NAMES.string) || '',
    sortBy: params.get(SEARCH_PARAM_NAMES.sortBy) || defaultSearchFilter.sortBy,
    offset: offset ? parseInt(offset, 10) : defaultSearchFilter.offset,
    radius: radius ? parseInt(radius, 10) : defaultSearchFilter.radius,
    searched: searched === 'true',
    address: address ? JSON.parse(address) : defaultSearchFilter.address,
  };
}

export function stringifySearchParams(filter: ISellerSearchFilter) {
  const arr: string[] = [];

  arr.push(`${SEARCH_PARAM_NAMES.string}=${encodeURIComponent(filter.string)}`);
  arr.push(`${SEARCH_PARAM_NAMES.sortBy}=${encodeURIComponent(filter.sortBy)}`);
  arr.push(`${SEARCH_PARAM_NAMES.offset}=${encodeURIComponent(filter.offset)}`);
  arr.push(`${SEARCH_PARAM_NAMES.radius}=${encodeURIComponent(filter.radius)}`);
  arr.push(`${SEARCH_PARAM_NAMES.searched}=${encodeURIComponent(filter.searched)}`);
  arr.push(`${SEARCH_PARAM_NAMES.address}=${encodeURIComponent(JSON.stringify(filter.address))}`);

  return arr.join('&');
}
