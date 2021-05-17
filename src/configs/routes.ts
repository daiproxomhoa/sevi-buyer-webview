export const ROUTES = {
  login: '/login',
  signUp: '/signUp',
  verifyOtp: '/verifyOtp',
  forgotPass: '/forgotPass',
  home: '/home',
  search: '/home/search',
  request: '/home/request',
  profile: '/home/profile',
  rating: '/home/rating',
  review: {
    path: '/review/:sellerId/:reqDate',
    gen: (sellerId: string, reqDate: string) => `/review/${sellerId}/${reqDate}`,
  },
  editProfile: '/editProfile',
  changePass: '/changePass',
  addAddress: '/addAddress',
  searchDetail: '/searchDetail',
  sendRequest: '/sendRequest',
  requestDetail: '/requestDetail',
  chat: {
    gen: (buyerId: string, sellerId: string, createDate: string, sellerAvatar: number | string, sellerName: string) =>
      `/chat/${buyerId}/${sellerId}/${encodeURIComponent(createDate)}/${sellerAvatar}/${encodeURIComponent(
        sellerName,
      )}`,
    value: '/chat/:buyerId/:sellerId/:createDate/:sellerAvatar/:sellerName',
  },
  test: {
    value: '/test/:id/:slug',
    gen: (id: string, slug: string) => `/test/${id}/${slug}`,
  },
};
