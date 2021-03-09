import { APIHost } from "./../modules/common/constants";

enum APIService {
  auth,
  buyer,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/auth`;
  } else if (service === APIService.buyer) {
    return `${APIHost}/buyer`;
  }

  return "";
}

export const API_PATHS = {
  passwordSignIn: `${getBaseUrl(APIService.auth)}/buyer/passwordSignIn`,
  signUp: `${getBaseUrl(APIService.auth)}/buyer/signUp`,
  otp: `${getBaseUrl(APIService.auth)}/buyer/otp`,
  getOtp: `${getBaseUrl(APIService.auth)}/buyer/getOtp`,
  signOut: `${getBaseUrl(APIService.auth)}/buyer/signOut`,
  popularKeyword: `${getBaseUrl(APIService.buyer)}/popularKeyword`,
  searchKeyword: `${getBaseUrl(APIService.buyer)}/searchKeyword`,
  searchWorker: `${getBaseUrl(APIService.buyer)}/searchWorker`,
};
