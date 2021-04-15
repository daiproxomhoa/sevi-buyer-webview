import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { ActionType, createAction, getType } from "typesafe-actions";
import { API_PATHS } from "../../../configs/api";
import { AppState } from "../../../redux/reducer";
import { some } from "../../common/constants";
import { fetchThunk } from "../../common/redux/thunk";
import { ISeller, ISellerSearchFilter } from "./../model";

export interface SearchState {
  data: ISeller[];
  sessionStamp: number;
  searchString: string;
}

export const setSearchResult = createAction(
  "search/setSearchResult",
  (data: ISeller[]) => ({
    data,
  })
)();

export const setSearchString = createAction(
  "search/setSearchString",
  (val: string) => ({
    val,
  })
)();

export const searchKeyword = (
  str: string
): ThunkAction<Promise<string[]>, AppState, null, Action<string>> => {
  return async (dispatch, getState) => {
    const json = await dispatch(
      fetchThunk(`${API_PATHS.suggestSearches}?str=${str}`)
    );

    if (json?.body) {
      return json.body;
    }

    return [];
  };
};

export const sellerSearch = (
  params: ISellerSearchFilter
): ThunkAction<Promise<void>, AppState, null, Action<string>> => {
  return async (dispatch, getState) => {
    const json = await dispatch(
      fetchThunk(
        API_PATHS.sellerSearch,
        "post",
        JSON.stringify({
          ...params,
          lat: params.address.address.lat,
          lng: params.address.address.lng,
          radius: params.radius * 1000,
        })
      )
    );

    if (json?.body) {
      dispatch(setSearchResult(json.body));
    }
  };
};

export const fetchSellerDetail = (
  id: string
): ThunkAction<Promise<some>, AppState, null, Action<string>> => {
  return async (dispatch, getState) => {
    return await dispatch(fetchThunk(API_PATHS.sellerDetail(id), "get"));
  };
};

export const fetchSellerRating = (
  id: string
): ThunkAction<Promise<some>, AppState, null, Action<string>> => {
  return async (dispatch, getState) => {
    return await dispatch(
      fetchThunk(
        `${API_PATHS.sellerRatings}?id=${id}&sellerYear=2021&pageOffset=0`,
        "get"
      )
    );
  };
};

const actions = {
  setSearchResult,
  setSearchString,
};

type ActionT = ActionType<typeof actions>;

export default function searchReducer(
  state = { data: [], sessionStamp: 0, searchString: "" },
  action: ActionT
): SearchState {
  switch (action.type) {
    case getType(setSearchResult):
      return {
        ...state,
        data: action.payload.data,
        sessionStamp: new Date().getTime(),
      };
    case getType(setSearchString):
      return {
        ...state,
        searchString: action.payload.val,
      };
    default:
      return state;
  }
}
