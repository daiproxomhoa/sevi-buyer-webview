import { ActionType, createCustomAction, getType } from "typesafe-actions";

export interface CommonState {
  readonly networkErrorMsg?: string;
  readonly commonErrorMsg?: string;
  loadingBackDrop: boolean;
}

export const setLoadingBackDrop = createCustomAction(
  "common/setLoading",
  (loading: boolean) => ({ loading })
);

export const setNetworkError = createCustomAction(
  "common/setNetworkError",
  (errorMsg?: string) => ({ errorMsg })
);

export const setCommonError = createCustomAction(
  "common/setCommonError",
  (errorMsg?: string) => ({ errorMsg })
);

const actions = {
  setNetworkError,
  setCommonError,
  setLoadingBackDrop,
};

type ActionT = ActionType<typeof actions>;

export default function reducer(
  state: CommonState = { loadingBackDrop: false },
  action: ActionT
): CommonState {
  switch (action.type) {
    case getType(setNetworkError):
      return { ...state, networkErrorMsg: action.errorMsg };
    case getType(setCommonError):
      return { ...state, commonErrorMsg: action.errorMsg };
    case getType(setLoadingBackDrop):
      return { ...state, loadingBackDrop: action.loading };
    default:
      return state;
  }
}
