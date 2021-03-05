import fetchMock from "fetch-mock";
import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";
import { API_PATHS } from "./configs/api";
import { BACKGROUND } from "./configs/colors";
import { ROUTES } from "./configs/routes";
import ForgetPasswordPage from "./modules/authen/page/ForgetPasswordPage";
import LoginPage from "./modules/authen/page/LoginPage";
import SignUpPage from "./modules/authen/page/SignUpPage";
import BottomNavigation from "./modules/home/component/BottomNavigation";
import SearchPage from "./modules/search/page/SearchPage";
import { AppState } from "./redux/reducer";
import styles from "./scss/webviewRouteTransition.module.scss";

const mapStateToProps = (state: AppState) => ({
  router: state.router,
});

interface Props extends ReturnType<typeof mapStateToProps> {}

const App: React.FC<Props> = (props) => {
  const { router } = props;
  const { action } = router;
  const transitionClassNamesRef = React.useRef<CSSTransitionClassNames>({});
  const lastRouteYOffsetRef = React.useRef(0);

  const actionRef = React.useRef(action);
  actionRef.current = action;

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
          appear
          classNames={transitionClassNamesRef.current}
          onExited={() => {
            if (actionRef.current === "PUSH") {
              window.scrollTo({ top: 0 });
            }
          }}
        >
          {(status) => {
            const style: React.CSSProperties = {};
            if (status === "exiting" || status === "exited") {
              if (status === "exiting") {
                lastRouteYOffsetRef.current = window.pageYOffset;
              }
              style.top = -lastRouteYOffsetRef.current;
            }
            return (
              <div style={{ ...style, width: "100%" }}>
                <Switch>
                  <Route exact path={ROUTES.login} component={LoginPage} />
                  <Route exact path={ROUTES.signUp} component={SignUpPage} />
                  <Route
                    exact
                    path={ROUTES.forgotPass}
                    component={ForgetPasswordPage}
                  />
                  <Route exact path={ROUTES.search} component={SearchPage} />
                </Switch>
              </div>
            );
          }}
        </CSSTransition>
        <BottomNavigation />
      </TransitionGroup>
    </>
  );
};

export default connect(mapStateToProps)(App);
