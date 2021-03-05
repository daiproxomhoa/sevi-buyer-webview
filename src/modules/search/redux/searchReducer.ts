import fetchMock from "fetch-mock";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { API_PATHS } from "../../../configs/api";
import { AppState } from "../../../redux/reducer";
import { makeCancelOldThunk, ThunkController } from "../../../utils";
import { fetchThunk } from "../../common/redux/thunk";

export interface SearchState {}

export const searchKeyword = makeCancelOldThunk(
  (
    controller: ThunkController
  ): ThunkAction<void, AppState, null, Action<string>> => {
    return async (dispatch, getState) => {
      const state = getState();
      fetchMock.post(
        API_PATHS.searchKeyword,
        { search: "123123" },
        { delay: 300 }
      );

      const json = await dispatch(
        fetchThunk(
          API_PATHS.searchKeyword,
          "post",
          JSON.stringify({ search: "123123" })
        )
      );

      console.log(json);
      fetchMock.reset();
    };
  }
);
