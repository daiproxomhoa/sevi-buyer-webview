import { ThunkAction } from 'redux-thunk';
import { Action, ActionType, createAction, getType } from 'typesafe-actions';
import { API_PATHS } from '../../../configs/api';
import { AppState } from '../../../redux/reducer';
import { some } from '../../common/constants';
import { fetchThunk } from '../../common/redux/thunk';
import { IAcceptRequest, ICreateRequestBody, IRequest } from '../model';

export interface RequestState {
  description: string;
}

export const setDescription = createAction('request/setDescription', (val: string) => ({
  val,
}))();

export const createRequest = (
  params: ICreateRequestBody,
): ThunkAction<Promise<some>, AppState, null, Action<string>> => {
  return async (dispatch, getState) => {
    return await dispatch(
      fetchThunk(API_PATHS.createRequest, 'post', {
        ...params,
      }),
    );
  };
};

export const fetchUnconfirmed = (
  offset: number,
  accept: boolean,
): ThunkAction<Promise<some>, AppState, null, Action<string>> => {
  return async (dispatch, getState) => {
    return await dispatch(
      fetchThunk(API_PATHS.getUnconfirmed, 'post', {
        offset,
        accept,
        ratedFilter: 'rated',
      }),
    );
  };
};

export const confirmRequest = (info: IAcceptRequest): ThunkAction<Promise<some>, AppState, null, Action<string>> => {
  return async (dispatch, getState) => {
    return await dispatch(
      fetchThunk(API_PATHS.confirmRequest, 'post', {
        sellerId: info.sellerId,
        requestDate: info.createDate,
      }),
    );
  };
};

export const cancelRequest = (info: IRequest): ThunkAction<Promise<some>, AppState, null, Action<string>> => {
  return async (dispatch, getState) => {
    return await dispatch(
      fetchThunk(API_PATHS.cancelRequest, 'post', {
        sellerId: info.sellerId,
        requestDate: info.createDate,
      }),
    );
  };
};

const actions = {
  setDescription,
};

type ActionT = ActionType<typeof actions>;

export default function requestReducer(
  state = { requestingData: [], acceptedData: [], description: '' },
  action: ActionT,
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
