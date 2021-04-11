import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { ActionType, createCustomAction, getType } from "typesafe-actions";
import { API_PATHS } from "../../../configs/api";
import { SUCCESS_CODE } from "../../../constants";
import { AppState } from "../../../redux/reducer";
import { some } from "../../common/constants";
import { fetchThunk } from "../../common/redux/thunk";

export interface RatingState {
  pendingRateData?: some;
  loading: boolean;
}

export const setPendingRateData = createCustomAction(
  "rating/setPendingRateData",
  (data?: some) => ({
    data,
  })
);

export const setLoading = createCustomAction(
  "rating/setLoading",
  (data: boolean) => ({
    data,
  })
);

export function fetchPendingRateData(
  pageOffset = 0
): ThunkAction<Promise<some>, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    const json = await dispatch(
      fetchThunk(
        API_PATHS.deferRating,
        "post",
        JSON.stringify({
          accept: true,
          offset: pageOffset,
          ratedFilter: "rated",
        })
      )
    );
    if (json.status === SUCCESS_CODE) {
      dispatch(setPendingRateData(json.body));
    }
    dispatch(setLoading(false));
    return json;
  };
}

const actions = { setRequestConfirmedData: setPendingRateData, setLoading };

export default function ratingReducer(
  state: RatingState = { loading: false },
  action: ActionType<typeof actions>
) {
  switch (action.type) {
    case getType(setPendingRateData):
      return {
        ...state,
        requestConfirmedData: action.data,
      };
    case getType(setLoading):
      return { ...state, loading: action.data };
    default:
      return state;
  }
}
