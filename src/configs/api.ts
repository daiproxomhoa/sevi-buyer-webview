import { APIHost } from "./../modules/common/constants";

enum APIService {
  auth,
  protected,
  public,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/auth`;
  } else if (service === APIService.protected) {
    return `${APIHost}/protected`;
  } else if (service === APIService.public) {
    return `${APIHost}`;
  }

  return "";
}

export const API_PATHS = {
  passwordSignIn: `${getBaseUrl(APIService.auth)}/buyer/passwordSignIn`,
  signUp: `${getBaseUrl(APIService.auth)}/buyer/signUp`,
  otp: `${getBaseUrl(APIService.auth)}/buyer/otp`,
  getOtp: `${getBaseUrl(APIService.auth)}/buyer/getOtp`,
  signOut: `${getBaseUrl(APIService.auth)}/buyer/signOut`,
  getBuyer: `${getBaseUrl(APIService.protected)}/buyer/get`,

  sellerSearch: `${getBaseUrl(APIService.protected)}/seller/search`,
  sellerDetail: (id: string) =>
    `${getBaseUrl(APIService.protected)}/seller/get?id=${id}`,
  sellerRatings: `${getBaseUrl(APIService.protected)}/seller/ratings`,
  renderSellerAvatar: (id?: string, stamp?: number) =>
    `${getBaseUrl(APIService.public)}/seller/getAvatar/${id}/${stamp}`,
  suggestSearches: `${getBaseUrl(
    APIService.protected
  )}/request/suggestSearches`,

  popularSearches: `${getBaseUrl(
    APIService.protected
  )}/request/popularSearches`,
  recentSearches: `${getBaseUrl(APIService.protected)}/buyer/recentSearches`,

  createRequest: `${getBaseUrl(APIService.protected)}/request/create`,

  searchWorker: `${getBaseUrl(APIService.protected)}/searchWorker`,
  setAvatar: `${getBaseUrl(APIService.protected)}/buyer/setAvatar`,
  getProfileInfo: `${getBaseUrl(APIService.protected)}/buyer/get`,
  updateProfile: `${getBaseUrl(APIService.protected)}/buyer/update`,
  getRequestConfirm: `${getBaseUrl(APIService.protected)}/request/confirm`,
  getConfirmed: `${getBaseUrl(APIService.protected)}/request/getConfirmed`,

  changePassword: `${getBaseUrl(APIService.protected)}/buyer/changePassword`,
  renderAvatar: (id?: number | string, stamp?: number) =>
    id ? `https://buyer.freeginar.com/getAvatar/${id}/${stamp}` : undefined,
  suggestLocation: (term: string) =>
    `${getBaseUrl(
      APIService.protected
    )}/google/place/autocomplete?q=${encodeURIComponent(term)}`,
  getDetailLocation: (id: string) =>
    `${getBaseUrl(
      APIService.protected
    )}/google/place/detail?id=${encodeURIComponent(id)}`,
};
