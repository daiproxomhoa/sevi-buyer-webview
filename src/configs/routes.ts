export const ROUTES = {
  login: "/login",
  signUp: "/signUp",
  verifyOtp: "/verifyOtp",
  forgotPass: "/forgotPass",
  search: "/search",
  request: "/request",
  rating: "/rating",
  profile: "/profile",
  editProfile: "/editProfile",
  changePass: "/changePass",
  test: {
    value: "/test/:id/:slug",
    gen: (id: string, slug: string) => `/test/${id}/${slug}`,
  },
};
