enum APIService {
  buyer,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.buyer) {
    return "http://localhost:8001/buyer";
  }

  return "";
}

export const API_PATHS = {
  login: `${getBaseUrl(APIService.buyer)}/login`,
  popularKeyword: `${getBaseUrl(APIService.buyer)}/popularKeyword`,
  searchKeyword: `${getBaseUrl(APIService.buyer)}/searchKeyword`,
};
