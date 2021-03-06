import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../../../redux/reducer";
import { some } from "../constants";
import { setCommonError, setNetworkError } from "./commonReducer";

export function fetchThunk(
  url: string,
  method: "delete" | "put" | "get" | "post" = "get",
  body?: string | FormData,
  fallback = { cancelled: false, data: {} },
  contentType?: string
): ThunkAction<Promise<some>, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    while (true) {
      let res: any;
      try {
        res = await fetch(url, {
          method,
          body,
          headers:
            contentType !== "multipart/form-data"
              ? {
                  "Content-Type": contentType || "application/json",
                }
              : {},
        });
      } catch (_) {}

      if (res) {
        if (res.ok) {
          if (method === "delete") {
            return {};
          }
          if (fallback.cancelled) {
            return fallback.data;
          }

          try {
            const json = (await res.text()) || "{}";
            return { status: res.status, body: JSON.parse(json) };
          } catch (e) {
            return { status: res.status, body: fallback.data };
          }
        }

        if (res.status === 401) {
          // dispatch(logout());
          return { status: 401, body: fallback.data };
        }
        if (res.status === 403) {
          dispatch(setCommonError("forbidden"));
          return { status: 403, body: fallback.data };
        }
        if (res.status !== 500) {
          return { status: res.status, body: fallback.data };
        }
      }

      let hasInternet = true;
      try {
        await fetch("https://google.com", { mode: "no-cors" });
      } catch (_) {
        hasInternet = false;
      }

      dispatch(
        setNetworkError(hasInternet ? "serverProblem" : "unstableNetwork")
      );

      do {
        await new Promise((resolve) => setTimeout(resolve, 250));
      } while (!!getState().common.networkErrorMsg);
      continue;
    }
  };
}
