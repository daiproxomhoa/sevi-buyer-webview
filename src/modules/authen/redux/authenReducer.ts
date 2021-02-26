import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { ActionType, createCustomAction, getType } from "typesafe-actions";
import { AppState } from "../../../redux/reducer";

export interface AuthenState {
  authen: boolean;
}

export const authenIn = createCustomAction("authen/in");
export const authenOut = createCustomAction("authen/out");

export function logout(): ThunkAction<
  Promise<void>,
  AppState,
  null,
  Action<string>
> {
  return async (dispatch) => {
    dispatch(authenOut());
  };
}

const actions = {
  authenIn,
  authenOut,
};

type ActionT = ActionType<typeof actions>;

export default function authenReducer(
  state = { authen: false, user: null },
  action: ActionT
): AuthenState {
  switch (action.type) {
    case getType(authenIn):
      return { ...state, authen: true };
    case getType(authenOut):
      return { ...state, authen: false };
    default:
      return state;
  }
}
