import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppState } from "./redux/reducer";

export type ThunkController = {
  cancelled: boolean;
};

export function makeCancelOldThunk<A extends any[], R>(
  creator: (
    controller: ThunkController,
    ...args: A
  ) => ThunkAction<R, AppState, null, Action<string>>
) {
  let controller: ThunkController = { cancelled: false };
  return (...args: A): ThunkAction<R, AppState, null, Action<string>> => {
    controller.cancelled = true;
    controller = { cancelled: false };
    return creator(controller, ...args);
  };
}
