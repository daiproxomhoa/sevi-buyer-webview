export type some = { [key: string]: any };

export const development: boolean =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export const APIHost = development ? "/api" : "https://production.com";

export const TOKEN = "token";

export const RESPONSE_STATUS = {
  SUCCESS: 200,
};
