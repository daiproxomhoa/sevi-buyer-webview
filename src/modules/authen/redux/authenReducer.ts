import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  ActionType,
  createAction,
  createCustomAction,
  getType,
} from "typesafe-actions";
import { API_PATHS } from "../../../configs/api";
import { SUCCESS_CODE } from "../../../constants";
import { AppState } from "../../../redux/reducer";
import { fetchThunk } from "../../common/redux/thunk";
import { IAuth } from "../model";

export interface AuthenState {
  authen: boolean;
  data?: IAuth;
  loading: boolean;
}

export const authenIn = createCustomAction("authen/in");

export const authenOut = createCustomAction("authen/out");

export const setAuthData = createAction("auth/setAuthData", (data: IAuth) => ({
  data,
}))();

const setLoading = createCustomAction("auth/setLoading", (data: boolean) => ({
  data,
}));

export function logout(): ThunkAction<
  Promise<void>,
  AppState,
  null,
  Action<string>
> {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const json = await dispatch(fetchThunk(API_PATHS.signOut, "get"));
    if (json.status === SUCCESS_CODE) {
      dispatch(authenOut());
    }
    dispatch(setLoading(false));
  };
}

const actions = {
  authenIn,
  authenOut,
  setAuthData,
  setLoading,
};

type ActionT = ActionType<typeof actions>;

export default function authenReducer(
  state = { authen: false, user: null, loading: false },
  action: ActionT
): AuthenState {
  switch (action.type) {
    case getType(authenIn):
      return { ...state, authen: true };
    case getType(authenOut):
      return { ...state, authen: false };
    case getType(setAuthData):
      return { ...state, data: action.payload.data };
    case getType(setLoading):
      return { ...state, loading: action.data };
    default:
      return state;
  }
}
