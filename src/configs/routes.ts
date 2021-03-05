export const ROUTES = {
  login: "/login",
  signUp: "/signUp",
  forgotPass: "/forgotPass",
  search: "/search",
  test: {
    value: "/test/:id/:slug",
    gen: (id: string, slug: string) => `/test/${id}/${slug}`,
  },
};
