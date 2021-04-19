import {
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from "@material-ui/core/styles";
import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";
import { BACKGROUND } from "./configs/colors";
import { ROUTES } from "./configs/routes";
import ForgetPasswordPage from "./modules/authen/page/ForgetPasswordPage";
import LoginPage from "./modules/authen/page/LoginPage";
import SignUpPage from "./modules/authen/page/SignUpPage";
import VerifyOtpPage from "./modules/authen/page/VerifyOtpPage";
import { LoadingBackDrop } from "./modules/common/component/elements";
import FetchErrorDialog from "./modules/common/component/FetchErrorDialog";
import ProtectedRoute from "./modules/common/component/ProtectedRoute";
import RedirectRoute from "./modules/common/component/RedirectRoute";
import { setNetworkError } from "./modules/common/redux/commonReducer";
import BottomNavigation from "./modules/home/component/BottomNavigation";
import ChangePassWordPage from "./modules/profile/page/ChangePassWordPage";
import EditProfilePage from "./modules/profile/page/EditProfilePage";
import ProfilePage from "./modules/profile/page/ProfilePage";
import PendingRateRemindDialog from "./modules/rating/page/PendingRateRemindDialog";
import RatingListPage from "./modules/rating/page/RatingListPage";
import ReviewPage from "./modules/rating/page/ReviewPage";
import { watchPendingRateData } from "./modules/rating/redux/ratingSaga";
import RequestListPage from "./modules/request/page/RequestListPage";
import SendRequestPage from "./modules/request/page/SendRequestPage";
import SearchDetailPage from "./modules/search/page/SearchDetailPage";
import SearchPage from "./modules/search/page/SearchPage";
import { AppState } from "./redux/reducer";
import styles from "./scss/webviewRouteTransition.module.scss";

export const bodyStyles: StyleRulesCallback<Theme, {}> = (theme) => ({
  body: {
    fontSize: theme.typography.body2.fontSize,
    lineHeight: theme.typography.body2.lineHeight,
    color: theme.palette.text.primary,
    overflowY: "scroll",
  },
});

const mapStateToProps = (state: AppState) => ({
  router: state.router,
  authen: state.authen.authen,
  networkErrorMsg: state.common.networkErrorMsg,
});

interface Props
  extends ReturnType<typeof mapStateToProps>,
    WithStyles<typeof bodyStyles> {}

const App: React.FC<Props> = ({ router, classes, authen, networkErrorMsg }) => {
  const { action } = router;
  const dispatch = useDispatch();
  const transitionClassNamesRef = React.useRef<CSSTransitionClassNames>({});
  const lastRouteYOffsetRef = React.useRef(0);
  const setLoadingBackDrop = useSelector(
    (state: AppState) => state.common.loadingBackDrop
  );

  const actionRef = React.useRef(action);
  actionRef.current = action;

  React.useEffect(() => {
    document.body.className = classes.body;
  }, [classes.body]);

  React.useEffect(() => {
    if (authen) {
      dispatch(watchPendingRateData());
    }
  }, [authen, dispatch]);

  if (actionRef.current === "PUSH") {
    transitionClassNamesRef.current.enter = styles.enter;
    transitionClassNamesRef.current.enterActive = styles.enterActive;
    transitionClassNamesRef.current.exit = undefined;
    transitionClassNamesRef.current.exitActive = undefined;
  } else {
    transitionClassNamesRef.current.enter = undefined;
    transitionClassNamesRef.current.enterActive = undefined;
    transitionClassNamesRef.current.exit = styles.exit;
    transitionClassNamesRef.current.exitActive = styles.exitActive;
  }

  return (
    <>
      <TransitionGroup style={{ background: BACKGROUND, position: "relative" }}>
        <CSSTransition
          key={router.location.pathname}
          timeout={300}
          classNames={transitionClassNamesRef.current}
          onExited={() => {
            if (actionRef.current === "PUSH") {
              window.scrollTo({ top: 0 });
            }
            document.body.className = classes.body;
          }}
          unmountOnExit
        >
          {(status) => {
            const style: React.CSSProperties =
              status === "entering" || status === "exiting"
                ? {}
                : { position: "absolute" };
            if (status === "exiting" || status === "exited") {
              if (status === "exiting") {
                lastRouteYOffsetRef.current = window.pageYOffset;
              }
              style.top = -lastRouteYOffsetRef.current;
            }
            const location = router.location;
            return (
              <div style={{ ...style, width: "100%" }}>
                <Switch location={location}>
                  <RedirectRoute
                    auth={authen}
                    exact
                    path={ROUTES.login}
                    component={LoginPage}
                  />
                  <Route exact path={ROUTES.signUp} component={SignUpPage} />
                  <Route
                    exact
                    path={ROUTES.verifyOtp}
                    component={VerifyOtpPage}
                  />
                  <Route
                    exact
                    path={ROUTES.forgotPass}
                    component={ForgetPasswordPage}
                  />
                  <ProtectedRoute
                    auth={authen}
                    exact
                    path={ROUTES.search}
                    component={SearchPage}
                  />
                  <ProtectedRoute
                    auth={authen}
                    exact
                    path={ROUTES.searchDetail}
                    component={SearchDetailPage}
                  />
                  <ProtectedRoute
                    auth={authen}
                    exact
                    path={ROUTES.request}
                    component={RequestListPage}
                  />
                  <ProtectedRoute
                    auth={authen}
                    exact
                    path={ROUTES.sendRequest}
                    component={SendRequestPage}
                  />
                  <ProtectedRoute
                    auth={authen}
                    exact
                    path={ROUTES.rating}
                    component={RatingListPage}
                  />
                  <ProtectedRoute
                    auth={authen}
                    exact
                    path={ROUTES.review.value}
                    component={ReviewPage}
                  />
                  <ProtectedRoute
                    auth={authen}
                    exact
                    path={ROUTES.profile}
                    component={ProfilePage}
                  />
                  <ProtectedRoute
                    auth={authen}
                    exact
                    path={ROUTES.editProfile}
                    component={EditProfilePage}
                  />
                  <ProtectedRoute
                    auth={authen}
                    exact
                    path={ROUTES.changePass}
                    component={ChangePassWordPage}
                  />
                  <Redirect to={ROUTES.login} />
                </Switch>
              </div>
            );
          }}
        </CSSTransition>
      </TransitionGroup>
      <div
        style={{
          position: "fixed",
          bottom: 10,
          left: 0,
          right: 0,
          zIndex: 5001,
        }}
      >
        <Route path={ROUTES.home} component={BottomNavigation} />
      </div>
      <LoadingBackDrop open={setLoadingBackDrop} />
      <PendingRateRemindDialog />
      <FetchErrorDialog
        msgId={networkErrorMsg}
        onClose={() => dispatch(setNetworkError(undefined))}
      />
    </>
  );
};

export default connect(mapStateToProps)(withStyles(bodyStyles)(App));
