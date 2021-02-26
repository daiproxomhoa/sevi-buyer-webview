export type some = { [key: string]: any };

export const development: boolean =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const APIHost = development ? "https://test.com" : "https://production.com";

export const ROUTES = {
  login: "/login",
  test: {
    value: "/test/:id/:slug",
    gen: (id: string, slug: string) => `/test/${id}/${slug}`,
  },
};

export const API = {
  searchListingArea: `${APIHost}/login`,
};
