export type some = { [key: string]: any };

export const development: boolean =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export const APIHost = development
  ? "/api"
  : window.location.hostname.endsWith("freeginar.com")
  ? "https://buyer.freeginar.com"
  : "https://buyer.sevi.vn";

export const TOKEN = "token";

export const RESPONSE_STATUS = {
  SUCCESS: 200,
};
