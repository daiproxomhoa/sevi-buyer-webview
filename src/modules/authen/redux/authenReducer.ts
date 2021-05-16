import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ActionType, createAction, createCustomAction, getType } from 'typesafe-actions';
import { API_PATHS } from '../../../configs/api';
import { SUCCESS_CODE } from '../../../constants';
import { AppState } from '../../../redux/reducer';
import { setLoadingBackDrop } from '../../common/redux/commonReducer';
import { fetchThunk } from '../../common/redux/thunk';
import { IAuth } from '../model';

export interface AuthenState {
  authen: boolean;
  data?: IAuth;
}

export const authenIn = createCustomAction('authen/in');

export const setAuthData = createAction('auth/setAuthData', (data: IAuth) => ({
  data,
}))();

export function logout(): ThunkAction<Promise<void>, AppState, null, Action<string>> {
  return async (dispatch) => {
    dispatch(setLoadingBackDrop(true));
    const json = await dispatch(fetchThunk(API_PATHS.signOut, 'get'));
    if (json.status === SUCCESS_CODE) {
      // dispatch(authenOut());
      authenOut();
    }
    dispatch(setLoadingBackDrop(false));
  };
}

export function authenOut() {
  console.log('Try to log out');
  (window as any).SEVI.postMessage(JSON.stringify({ type: 'logout', data: null }));
}

const actions = {
  authenIn,
  //authenOut,
  setAuthData,
};

type ActionT = ActionType<typeof actions>;

export default function authenReducer(state = { authen: true }, action: ActionT): AuthenState {
  switch (action.type) {
    case getType(authenIn):
      return { ...state, authen: true };
    // case getType(authenOut):
    //   return { ...state, authen: false };
    case getType(setAuthData):
      return { ...state, data: action.payload.data };
    default:
      return state;
  }
}
