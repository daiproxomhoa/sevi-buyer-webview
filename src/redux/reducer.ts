import requestReducer, {
  RequestState,
} from "./../modules/request/redux/requestReducer";
import searchReducer, {
  SearchState,
} from "./../modules/search/redux/searchReducer";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import intlReducer, { IntlState } from "../modules/intl/redux/intlReducer";
import commonReducer, {
  CommonState,
} from "../modules/common/redux/commonReducer";
import authenReducer, {
  AuthenState,
} from "../modules/authen/redux/authenReducer";
import profileReducer, {
  ProfileState,
} from "../modules/profile/redux/profileReducer";
import ratingReducer, {
  RatingState,
} from "../modules/rating/redux/ratingReducer";

export interface AppState {
  router: RouterState;
  intl: IntlState;
  common: CommonState;
  authen: AuthenState;
  search: SearchState;
  request: RequestState;
  profile: ProfileState;
  rating: RatingState;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    common: commonReducer,
    authen: authenReducer,
    search: searchReducer,
    request: requestReducer,
    profile: profileReducer,
    rating: ratingReducer,
  });
}
