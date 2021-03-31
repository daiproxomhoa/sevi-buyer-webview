import fetchMock from "fetch-mock";
import {
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";
import { API_PATHS } from "./configs/api";
import { BACKGROUND } from "./configs/colors";
import { ROUTES } from "./configs/routes";
import ForgetPasswordPage from "./modules/authen/page/ForgetPasswordPage";
import LoginPage from "./modules/authen/page/LoginPage";
import SignUpPage from "./modules/authen/page/SignUpPage";
import VerifyOtpPage from "./modules/authen/page/VerifyOtpPage";
import BottomNavigation from "./modules/home/component/BottomNavigation";
import RatingListPage from "./modules/rating/page/RatingListPage";
import RequestListPage from "./modules/request/page/RequestListPage";
import SearchPage from "./modules/search/page/SearchPage";
import { AppState } from "./redux/reducer";
import styles from "./scss/webviewRouteTransition.module.scss";
import ProfilePage from "./modules/profile/page/ProfilePage";
import EditProfile from "./modules/profile/page/EditProfile";

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
});

interface Props
  extends ReturnType<typeof mapStateToProps>,
    WithStyles<typeof bodyStyles> {}

const App: React.FC<Props> = ({ router, classes }) => {
  const { action } = router;
  const transitionClassNamesRef = React.useRef<CSSTransitionClassNames>({});
  const lastRouteYOffsetRef = React.useRef(0);

  const actionRef = React.useRef(action);
  actionRef.current = action;

  React.useEffect(() => {
    document.body.className = classes.body;
  }, [classes.body]);

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
                  <Route exact path={ROUTES.login} component={LoginPage} />
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
                  <Route exact path={ROUTES.search} component={SearchPage} />
                  <Route
                    exact
                    path={ROUTES.request}
                    component={RequestListPage}
                  />
                  <Route
                    exact
                    path={ROUTES.rating}
                    component={RatingListPage}
                  />
                  <Route exact path={ROUTES.profile} component={ProfilePage} />
                  <Route
                    exact
                    path={ROUTES.editProfile}
                    component={EditProfile}
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
        <BottomNavigation />
      </div>
    </>
  );
};

export default connect(mapStateToProps)(withStyles(bodyStyles)(App));
