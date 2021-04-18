export const ROUTES = {
  login: "/login",
  signUp: "/signUp",
  verifyOtp: "/verifyOtp",
  forgotPass: "/forgotPass",
  home: "/home",
  search: "/home/search",
  request: "/home/request",
  profile: "/home/profile",
  rating: "/home/rating",
  review: {
    path: "/review/:sellerId/:reqDate",
    gen: (sellerId?: string, reqDate?: string) =>
      `/review/${sellerId}/${reqDate}`,
  },
  editProfile: "/editProfile",
  changePass: "/changePass",
  searchDetail: "/searchDetail",
  sendRequest: "/sendRequest",
  test: {
    value: "/test/:id/:slug",
    gen: (id: string, slug: string) => `/test/${id}/${slug}`,
  },
};
