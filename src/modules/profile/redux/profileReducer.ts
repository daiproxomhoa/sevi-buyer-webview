import { ThunkAction } from "redux-thunk";
import { ActionType, createCustomAction, getType } from "typesafe-actions";
import { AppState } from "../../../redux/reducer";
import { some } from "../../common/constants";
import { Action } from "redux";
import { fetchThunk } from "../../common/redux/thunk";
import { API_PATHS } from "../../../configs/api";
import { SUCCESS_CODE } from "../../../constants";

export interface profileState {
  data?: some;
  loading: boolean;
}

export const setData = createCustomAction("profile/setData", (data: some) => ({
  data,
}));

const setLoading = createCustomAction(
  "profile/setLoading",
  (data: boolean) => ({
    data,
  })
);
export function fetchProfile(): ThunkAction<
  Promise<void>,
  AppState,
  null,
  Action<string>
> {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    const json = await dispatch(fetchThunk(API_PATHS.getProfileInfo, "get"));
    if (json.status === SUCCESS_CODE) {
      dispatch(setData(json.body));
    }
    dispatch(setLoading(false));
  };
}

const actions = { setData, setLoading };

export default function profileReducer(
  state: profileState = { loading: false },
  action: ActionType<typeof actions>
) {
  switch (action.type) {
    case getType(setData):
      return { ...state, data: { ...state.data, ...action.data } };
    case getType(setLoading):
      return { ...state, loading: action.data };
    default:
      return state;
  }
}
