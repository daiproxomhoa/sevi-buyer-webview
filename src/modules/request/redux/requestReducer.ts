import { ThunkAction } from "redux-thunk";
import { Action, ActionType, createAction, getType } from "typesafe-actions";
import { API_PATHS } from "../../../configs/api";
import { AppState } from "../../../redux/reducer";
import { some } from "../../common/constants";
import { fetchThunk } from "../../common/redux/thunk";
import { IAccept, ICreateRequest, IGetRequestParams, IRequest } from "../model";

export interface RequestState {
  requestingData: IRequest[];
  acceptedData: IAccept[];
  description: string;
}

export const setDescription = createAction(
  "request/setDescription",
  (val: string) => ({
    val,
  })
)();

export const setRequestingData = createAction(
  "request/setRequestingData",
  (data: IRequest[]) => ({
    data,
  })
)();

export const setAcceptedData = createAction(
  "request/setAcceptedData",
  (data: IAccept[]) => ({
    data,
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

export const fetchRequesting = (): ThunkAction<
  Promise<some>,
  AppState,
  null,
  Action<string>
> => {
  return async (dispatch, getState) => {
    const requestingData = getState().request.requestingData;

    return await dispatch(
      fetchThunk(API_PATHS.getUnconfirmed, "post", {
        accept: false,
        offset: requestingData.length,
        ratedFilter: "rated",
      })
    );
  };
};

export const fetchAcceptedRequest = (): ThunkAction<
  Promise<some>,
  AppState,
  null,
  Action<string>
> => {
  return async (dispatch, getState) => {
    const acceptedData = getState().request.acceptedData;

    return await dispatch(
      fetchThunk(API_PATHS.getUnconfirmed, "post", {
        accept: true,
        offset: acceptedData.length,
        ratedFilter: "rated",
      })
    );
  };
};

const actions = {
  setDescription,
  setRequestingData,
  setAcceptedData,
};

type ActionT = ActionType<typeof actions>;

export default function requestReducer(
  state = { requestingData: [], acceptedData: [], description: "" },
  action: ActionT
): RequestState {
  switch (action.type) {
    case getType(setDescription):
      return {
        ...state,
        description: action.payload.val,
      };
    case getType(setRequestingData):
      return {
        ...state,
        requestingData: action.payload.data,
      };
    case getType(setAcceptedData):
      return {
        ...state,
        acceptedData: action.payload.data,
      };
    default:
      return state;
  }
}
