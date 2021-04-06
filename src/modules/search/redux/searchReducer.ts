import fetchMock from "fetch-mock";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { ActionType, createAction, getType } from "typesafe-actions";
import { API_PATHS } from "../../../configs/api";
import searchSuggestData from "../../../json/search.json";
import sellerDetailData from "../../../json/sellerDetail.json";
import searchWorkerData from "../../../json/searchWorker.json";
import { AppState } from "../../../redux/reducer";
import { some } from "../../common/constants";
import { fetchThunk } from "../../common/redux/thunk";
import { ISellerSearchParams, ISeller } from "./../model";

export interface SearchState {
  data: ISeller[];
}

export const setSearchResult = createAction(
  "search/setSearchResult",
  (data: ISeller[]) => ({
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
  params: ISellerSearchParams
): ThunkAction<void, AppState, null, Action<string>> => {
  return async (dispatch, getState) => {
    fetchMock.post(API_PATHS.sellerSearch, searchWorkerData, {
      delay: 300,
      overwriteRoutes: true,
    });

    const json = await dispatch(
      fetchThunk(API_PATHS.sellerSearch, "post", JSON.stringify(params))
    );

    console.log(json);
    if (json?.body) {
      dispatch(setSearchResult(json.body));
    }
  };
};

export const fetchSellerDetail = (
  id: string
): ThunkAction<some, AppState, null, Action<string>> => {
  return async (dispatch, getState) => {
    fetchMock.get(`${API_PATHS.sellerDetail}?id=${id}`, sellerDetailData, {
      delay: 200,
      overwriteRoutes: true,
    });

    return await dispatch(
      fetchThunk(`${API_PATHS.sellerDetail}?id=${id}`, "get")
    );
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
