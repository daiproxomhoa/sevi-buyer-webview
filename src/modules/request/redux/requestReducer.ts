import { ThunkAction } from "redux-thunk";
import { Action, ActionType, createAction, getType } from "typesafe-actions";
import { API_PATHS } from "../../../configs/api";
import { AppState } from "../../../redux/reducer";
import { some } from "../../common/constants";
import { fetchThunk } from "../../common/redux/thunk";
import { ICreateRequest } from "../model";

export interface RequestState {
  description: string;
}

export const setDescription = createAction(
  "request/setDescription",
  (val: string) => ({
    val,
  })
)();

export const createRequest = (
  params: ICreateRequest
): ThunkAction<Promise<some>, AppState, null, Action<string>> => {
  return async (dispatch, getState) => {
    return await dispatch(
      fetchThunk(API_PATHS.createRequest, "put", {
        ...params,
      })
    );
  };
};

const actions = {
  setDescription,
};

type ActionT = ActionType<typeof actions>;

export default function requestReducer(
  state = { description: "" },
  action: ActionT
): RequestState {
  switch (action.type) {
    case getType(setDescription):
      return {
        ...state,
        description: action.payload.val,
      };
    default:
      return state;
  }
}
