import { fork } from "@redux-saga/core/effects";
import { ratingSaga } from "../modules/rating/redux/ratingSaga";

export default function* rootSaga() {
  yield fork(ratingSaga);
}
