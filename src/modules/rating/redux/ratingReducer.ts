import { get } from "lodash";
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
  disableLoadMore: boolean;
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
export const setDisableLoadMore = createCustomAction(
  "rating/setDisableLoadMore",
  (data: boolean) => ({
    data,
  })
);

export function fetchPendingRateData(
  pageOffset = 0,
  ratedFilter = "unrated"
): ThunkAction<Promise<some>, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    if (!pageOffset) {
      dispatch(setPendingRateData());
    }
    const { pendingRateData = {} } = getState().rating;

    dispatch(setLoading(true));
    dispatch(setDisableLoadMore(true));
    const json = await dispatch(
      fetchThunk(API_PATHS.getConfirmed, "post", {
        accept: true,
        offset: pageOffset,
        ratedFilter,
      })
    );
    if (json.status === SUCCESS_CODE) {
      dispatch(
        setPendingRateData({
          ...json.body,
          requests: [
            ...get(pendingRateData, "requests", []),
            ...get(json.body, "requests", []),
          ],
        })
      );
      if (!json.body?.requests?.length) {
        dispatch(setDisableLoadMore(true));
      }
    }
    dispatch(setLoading(false));
    return json;
  };
}

const actions = { setPendingRateData, setLoading, setDisableLoadMore };

export default function ratingReducer(
  state: RatingState = { loading: false, disableLoadMore: false },
  action: ActionType<typeof actions>
) {
  switch (action.type) {
    case getType(setPendingRateData):
      return {
        ...state,
        pendingRateData: action.data,
      };
    case getType(setLoading):
      return { ...state, loading: action.data };
    case getType(setDisableLoadMore):
      return { ...state, disableLoadMore: action.data };
    default:
      return state;
  }
}
