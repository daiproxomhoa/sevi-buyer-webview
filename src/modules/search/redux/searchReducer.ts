import fetchMock from "fetch-mock";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { ActionType, createAction, getType } from "typesafe-actions";
import { API_PATHS } from "../../../configs/api";
import searchSuggestData from "../../../json/search.json";
import { AppState } from "../../../redux/reducer";
import { fetchThunk } from "../../common/redux/thunk";
import { ISearchParams, ISearchResult } from "./../model";

export interface SearchState {
  data: ISearchResult[];
}

export const setSearchResult = createAction(
  "search/setSearchResult",
  (data: ISearchResult[]) => ({
    data,
  })
)();

export const searchKeyword = (
  str: string
): ThunkAction<Promise<string[]>, AppState, null, Action<string>> => {
  return async (dispatch, getState) => {
    const state = getState();
    fetchMock.post(API_PATHS.searchKeyword, searchSuggestData, {
      delay: 300,
    });

    const json = await dispatch(
      fetchThunk(
        API_PATHS.searchKeyword,
        "post",
        JSON.stringify({ search: "123123" })
      )
    );
    fetchMock.reset();

    if (json?.body?.data) {
      return json.body.data;
    }

    return [];
  };
};

export const sellerSearch = (
  params: ISearchParams
): ThunkAction<void, AppState, null, Action<string>> => {
  return async (dispatch, getState) => {
    const json = await dispatch(
      fetchThunk(API_PATHS.sellerSearch, "post", JSON.stringify(params))
    );

    if (json?.body?.data) {
      dispatch(setSearchResult(json.body.data));
    }
  };
};

const actions = {
  setSearchResult,
};

type ActionT = ActionType<typeof actions>;

export default function searchReducer(
  state = { data: [] },
  action: ActionT
): SearchState {
  switch (action.type) {
    case getType(setSearchResult):
      return { ...state, data: action.payload.data };
    default:
      return state;
  }
}
