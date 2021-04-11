import { delay, put, select, takeEvery } from "@redux-saga/core/effects";
import { createCustomAction, getType } from "typesafe-actions";
import { ROUTES } from "../../../configs/routes";
import { AppState } from "../../../redux/reducer";
import { fetchPendingRateData } from "./ratingReducer";
export const watchPendingRateData = createCustomAction(
  "rating/watchPendingRateData"
);

export function* ratingSaga() {
  function* watchPendingRate() {
    const location = yield select((state: AppState) => state.router.location);
    while (true) {
      if (location.pathname !== ROUTES.rating) {
        const json = yield put(fetchPendingRateData(0) as any);
        json.then((value) => {
          console.log(value);
        });
      }
      yield delay(300000);
    }
  }

  yield takeEvery(getType(watchPendingRateData), watchPendingRate);
}
