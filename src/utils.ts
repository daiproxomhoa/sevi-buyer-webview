import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { development } from './modules/common/constants';
import { AppState } from './redux/reducer';
import firebase from 'firebase/app';

export type ThunkController = {
  cancelled: boolean;
};

export function makeCancelOldThunk<A extends any[], R>(
  creator: (controller: ThunkController, ...args: A) => ThunkAction<R, AppState, null, Action<string>>,
) {
  let controller: ThunkController = { cancelled: false };
  return (...args: A): ThunkAction<R, AppState, null, Action<string>> => {
    controller.cancelled = true;
    controller = { cancelled: false };
    return creator(controller, ...args);
  };
}

export const analyticsRef: { current?: firebase.analytics.Analytics } = {};
if (!development) {
  try {
    firebase.initializeApp({
      apiKey: 'AIzaSyC57-qWFv4KvujwJ2e1U7Kg2l0dHd9brcE',
      authDomain: 'sevi-309302.firebaseapp.com',
      projectId: 'sevi-309302',
      storageBucket: 'sevi-309302.appspot.com',
      messagingSenderId: '693031786132',
      appId: '1:693031786132:web:0993b61ce4c621c2f78681',
      measurementId: 'G-TKQ56EXG9P',
    });
    analyticsRef.current = firebase.analytics();
  } catch (e) {
    console.error(e);
  }
}
