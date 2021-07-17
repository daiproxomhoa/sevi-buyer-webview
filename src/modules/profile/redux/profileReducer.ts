import { ThunkAction } from 'redux-thunk';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { SUCCESS_CODE } from '../../../constants';
import { some } from '../../common/constants';

export interface ProfileState {
  data?: some;
  loading: boolean;
  open: boolean;
}

export const setOpenUpdateAddressInfo = createCustomAction('profile/setOpenUpdateAddressInfo', (open: boolean) => ({
  open,
}));

export const setProfileData = createCustomAction('profile/setProfileData', (data?: some) => ({
  data,
}));

const setLoading = createCustomAction('profile/setLoading', (data: boolean) => ({
  data,
}));

export function fetchProfile(): ThunkAction<Promise<void>, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    const json = await dispatch(fetchThunk(API_PATHS.getProfileInfo, 'get'));
    if (json.status === SUCCESS_CODE) {
      dispatch(setProfileData(json.body));
      if (!json.body.addresses.length) {
        dispatch(setOpenUpdateAddressInfo(true));
      }
    }
    dispatch(setLoading(false));
  };
}

export function updateProfile(profile: some): ThunkAction<Promise<some>, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    const json = await dispatch(fetchThunk(API_PATHS.updateProfile, 'post', profile));

    return json;
  };
}

const actions = { setProfileData, setLoading, setOpenUpdateAddressInfo };

export default function profileReducer(
  state: ProfileState = { loading: false, open: false },
  action: ActionType<typeof actions>,
) {
  switch (action.type) {
    case getType(setProfileData):
      return { ...state, data: { ...state.data, ...action.data } };
    case getType(setLoading):
      return { ...state, loading: action.data };
    case getType(setOpenUpdateAddressInfo):
      return { ...state, open: action.open };
    default:
      return state;
  }
}
