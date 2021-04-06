import { APIHost } from "./../modules/common/constants";

enum APIService {
  auth,
  protected,
  seller,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/auth`;
  } else if (service === APIService.protected) {
    return `${APIHost}/protected`;
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
  sellerDetail: `${getBaseUrl(APIService.protected)}/seller/detail`,

  popularKeyword: `${getBaseUrl(APIService.protected)}/popularKeyword`,
  searchKeyword: `${getBaseUrl(APIService.protected)}/protected/seller/search`,
  searchWorker: `${getBaseUrl(APIService.protected)}/searchWorker`,
  setAvatar: `${getBaseUrl(APIService.protected)}/buyer/setAvatar`,
  getProfileInfo: `${getBaseUrl(APIService.protected)}/buyer/get`,
  updateProfile: `${getBaseUrl(APIService.protected)}/buyer/update`,
  renderAvatar: (id: number, stamp?: number) =>
    `https://buyer.freeginar.com/getAvatar/${id}/${stamp}`,
  suggestLocation: (term: string) =>
    `${getBaseUrl(
      APIService.protected
    )}/google/place/autocomplete?q=${encodeURIComponent(term)}`,
  getDetailLocation: (id: string) =>
    `${getBaseUrl(
      APIService.protected
    )}/google/place/detail?id=${encodeURIComponent(id)}`,
};
