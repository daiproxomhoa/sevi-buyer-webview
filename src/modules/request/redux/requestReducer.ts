import { ThunkAction } from 'redux-thunk';
import { Action, ActionType, createAction, getType } from 'typesafe-actions';
import { API_PATHS } from '../../../configs/api';
import { AppState } from '../../../redux/reducer';
import { some } from '../../common/constants';
import { fetchThunk } from '../../common/redux/thunk';
import { ICreateRequestBody, IRequest } from '../model';
import { CONFIRMED_REQUEST_TAB_INDEX, UNCONFIRMED_REQUEST_TAB_INDEX } from './../constants';

export interface RequestState {
  description: string;
  confirmedRequestTabIndex: number;
  unconfirmedRequestTabIndex: number;
}

export const setDescription = createAction('request/setDescription', (val: string) => ({
  val,
}))();

export const setConfirmedRequestTabIndex = createAction('request/setConfirmedRequestTabIndex', (val: number) => ({
  val,
}))();

export const setUnconfirmedRequestTabIndex = createAction('request/setUnconfirmedRequestTabIndex', (val: number) => ({
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

export const confirmRequest = (info: IRequest): ThunkAction<Promise<some>, AppState, null, Action<string>> => {
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
  setConfirmedRequestTabIndex,
  setUnconfirmedRequestTabIndex,
};

type ActionT = ActionType<typeof actions>;

export default function requestReducer(
  state = {
    confirmedRequestTabIndex: CONFIRMED_REQUEST_TAB_INDEX.UN_RATED,
    unconfirmedRequestTabIndex: UNCONFIRMED_REQUEST_TAB_INDEX.REQUESTING,
    description: '',
  },
  action: ActionT,
): RequestState {
  switch (action.type) {
    case getType(setDescription):
      return {
        ...state,
        description: action.payload.val,
      };
    case getType(setConfirmedRequestTabIndex):
      return {
        ...state,
        confirmedRequestTabIndex: action.payload.val,
      };
    case getType(setUnconfirmedRequestTabIndex):
      return {
        ...state,
        unconfirmedRequestTabIndex: action.payload.val,
      };
    default:
      return state;
  }
}
