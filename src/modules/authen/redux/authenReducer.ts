import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ActionType, createAction, createCustomAction, getType } from 'typesafe-actions';
import { API_PATHS } from '../../../configs/api';
import { AppState } from '../../../redux/reducer';
import { setLoadingBackDrop } from '../../common/redux/commonReducer';
import { fetchThunk } from '../../common/redux/thunk';
import { IAuth } from '../model';

export interface AuthenState {
  authen: boolean;
  data?: IAuth;
}

export const authenIn = createCustomAction('authen/in');
export const authenOut = createCustomAction('authen/out');

export const setAuthData = createAction('auth/setAuthData', (data: IAuth) => ({
  data,
}))();

export function logout(): ThunkAction<Promise<void>, AppState, null, Action<string>> {
  return async (dispatch) => {
    dispatch(setLoadingBackDrop(true));
    await dispatch(fetchThunk(API_PATHS.signOut, 'get'));
    authenOutMessage();
    dispatch(authenOut());
    dispatch(setLoadingBackDrop(false));
  };
}

export function authenOutMessage() {
  if ((window as any).SEVI) {
    (window as any).SEVI.postMessage(JSON.stringify({ type: 'logout', data: null }));
  }
}

const actions = {
  authenIn,
  authenOut,
  setAuthData,
};

type ActionT = ActionType<typeof actions>;

export default function authenReducer(state = { authen: true }, action: ActionT): AuthenState {
  switch (action.type) {
    case getType(authenIn):
      return { ...state, authen: true };
    case getType(authenOut):
      return { ...state, authen: false };
    case getType(setAuthData):
      return { ...state, data: action.payload.data };
    default:
      return state;
  }
}
