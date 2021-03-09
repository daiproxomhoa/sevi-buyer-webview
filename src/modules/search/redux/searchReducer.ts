import { ISearchResult } from "./../model";
import fetchMock from "fetch-mock";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { API_PATHS } from "../../../configs/api";
import { AppState } from "../../../redux/reducer";
import { makeCancelOldThunk, ThunkController } from "../../../utils";
import { fetchThunk } from "../../common/redux/thunk";
import searchSuggestData from "../../../json/search.json";
import searchWorkerData from "../../../json/searchWorker.json";
import { ActionType, createAction, getType } from "typesafe-actions";

export interface SearchState {
  data: ISearchResult[];
}

export const setSearchResult = createAction(
  "search/setSearchResult",
  (data: ISearchResult[]) => ({
    data,
  })
)();

export const searchKeyword = makeCancelOldThunk(
  (
    controller: ThunkController
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
  }
);

export const searchWorker = (
  search: string
): ThunkAction<void, AppState, null, Action<string>> => {
  return async (dispatch, getState) => {
    fetchMock.post(API_PATHS.searchWorker, searchWorkerData, { delay: 1000 });
    const json = await dispatch(
      fetchThunk(API_PATHS.searchWorker, "post", JSON.stringify({ search }))
    );

    fetchMock.reset();

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
