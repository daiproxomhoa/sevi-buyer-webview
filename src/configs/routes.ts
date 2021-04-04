export const ROUTES = {
  login: "/login",
  signUp: "/signUp",
  verifyOtp: "/verifyOtp",
  forgotPass: "/forgotPass",
  home: "/home",
  search: "/home/search",
  request: "/home/request",
  rating: "/home/rating",
  profile: "/home/profile",
  editProfile: "/editProfile",
  changePass: "/changePass",
  test: {
    value: "/test/:id/:slug",
    gen: (id: string, slug: string) => `/test/${id}/${slug}`,
  },
};
