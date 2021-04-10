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
  renderSellerAvatar: (id?: string, stamp?: number) =>
    `${getBaseUrl(APIService.public)}/seller/getAvatar/${id}/${stamp}`,

  popularKeyword: `${getBaseUrl(APIService.protected)}/popularKeyword`,
  searchKeyword: `${getBaseUrl(APIService.protected)}/protected/seller/search`,
  searchWorker: `${getBaseUrl(APIService.protected)}/searchWorker`,
  setAvatar: `${getBaseUrl(APIService.protected)}/buyer/setAvatar`,
  getProfileInfo: `${getBaseUrl(APIService.protected)}/buyer/get`,
  updateProfile: `${getBaseUrl(APIService.protected)}/buyer/update`,
  setPassword: `${getBaseUrl(APIService.auth)}/buyer/setPassword`,
  renderAvatar: (id: number | string, stamp?: number) =>
    typeof stamp === "undefined"
      ? `https://buyer.freeginar.com/getAvatar/${id}/${stamp}`
      : undefined,
  suggestLocation: (term: string) =>
    `${getBaseUrl(
      APIService.protected
    )}/google/place/autocomplete?q=${encodeURIComponent(term)}`,
  getDetailLocation: (id: string) =>
    `${getBaseUrl(
      APIService.protected
    )}/google/place/detail?id=${encodeURIComponent(id)}`,
};
