import { StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { SWRConfig } from 'swr';
import { BACKGROUND } from './configs/colors';
import { ROUTES } from './configs/routes';
import LoginPage from './modules/authen/page/LoginPage';
import ChatPage from './modules/chat/page/ChatPage';
import { LoadingBackDrop } from './modules/common/component/elements';
import FetchErrorDialog from './modules/common/component/FetchErrorDialog';
import GuideDialog from './modules/common/component/GuideDialog';
import ProtectedRoute from './modules/common/component/ProtectedRoute';
import RedirectRoute from './modules/common/component/RedirectRoute';
import { development } from './modules/common/constants';
import EmptyPage from './modules/common/page/EmptyPage';
import { setNetworkError } from './modules/common/redux/commonReducer';
import { fetchThunk } from './modules/common/redux/thunk';
import BottomNavigation from './modules/home/component/BottomNavigation';
import AddAddressPage from './modules/profile/page/AddAddressPage';
import ChangePassWordPage from './modules/profile/page/ChangePassWordPage';
import EditProfilePage from './modules/profile/page/EditProfilePage';
import ProfilePage from './modules/profile/page/ProfilePage';
import PendingRateRemindDialog from './modules/rating/page/PendingRateRemindDialog';
import ReviewPage from './modules/rating/page/ReviewPage';
import { watchPendingRateData } from './modules/rating/redux/ratingSaga';
import ConfirmedRequestListPage from './modules/request/page/ConfirmedRequestListPage';
import RequestInfoDetailPage from './modules/request/page/RequestInfoDetailPage';
import SendRequestPage from './modules/request/page/SendRequestPage';
import UnconfirmedRequestListPage from './modules/request/page/UnconfirmedRequestListPage';
import SearchDetailPage from './modules/search/page/SearchDetailPage';
import SearchPage from './modules/search/page/SearchPage';
import { AppState } from './redux/reducer';
import styles from './scss/webviewRouteTransition.module.scss';

export const bodyStyles: StyleRulesCallback<Theme, {}> = (theme) => ({
  body: {
    fontSize: theme.typography.body2.fontSize,
    lineHeight: theme.typography.body2.lineHeight,
    color: theme.palette.text.primary,
    overflowY: 'scroll',
  },
});

const mapStateToProps = (state: AppState) => ({
  router: state.router,
  authen: state.authen.authen,
  networkErrorMsg: state.common.networkErrorMsg,
});

interface Props extends ReturnType<typeof mapStateToProps>, WithStyles<typeof bodyStyles> {}

const App: React.FC<Props> = ({ router, classes, authen, networkErrorMsg }) => {
  const { action } = router;
  const dispatch: ThunkDispatch<AppState, null, AnyAction> = useDispatch();
  const transitionClassNamesRef = React.useRef<CSSTransitionClassNames>({});
  const lastRouteYOffsetRef = React.useRef(0);
  const setLoadingBackDrop = useSelector((state: AppState) => state.common.loadingBackDrop);

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

  if (actionRef.current === 'PUSH') {
    transitionClassNamesRef.current.enter = styles.enter1;
    transitionClassNamesRef.current.enterActive = styles.enterActive1;
    transitionClassNamesRef.current.exit = styles.exit1;
    transitionClassNamesRef.current.exitActive = styles.exitActive1;
  } else {
    transitionClassNamesRef.current.enter = styles.enter2;
    transitionClassNamesRef.current.enterActive = styles.enterActive2;
    transitionClassNamesRef.current.exit = styles.exit2;
    transitionClassNamesRef.current.exitActive = styles.exitActive2;
  }

  return (
    <SWRConfig
      value={{
        fetcher: async (url: string, method: 'get' | 'post', body: string) => {
          return dispatch(fetchThunk(url, method, body));
        },
      }}
    >
      <TransitionGroup style={{ background: BACKGROUND, position: 'relative' }}>
        <CSSTransition
          key={router.location.pathname}
          timeout={350}
          classNames={transitionClassNamesRef.current}
          onExited={() => {
            if (actionRef.current === 'PUSH') {
              window.scrollTo({ top: 0 });
            }
            document.body.className = classes.body;
          }}
          unmountOnExit
        >
          {(status) => {
            const style: React.CSSProperties =
              status === 'entering' || status === 'exiting' ? {} : { position: 'absolute' };
            if (status === 'exiting' || status === 'exited') {
              if (status === 'exiting') {
                lastRouteYOffsetRef.current = window.pageYOffset;
              }
              style.top = -lastRouteYOffsetRef.current;
            }
            const location = router.location;
            return (
              <div style={{ ...style, width: '100%' }}>
                <Switch location={location}>
                  <RedirectRoute
                    auth={authen}
                    exact
                    path={ROUTES.login}
                    component={development ? LoginPage : EmptyPage}
                  />
                  {/* <Route exact path={ROUTES.signUp} component={SignUpPage} />
                  <RedirectRoute auth={authen} exact path={ROUTES.verifyOtp} component={VerifyOtpPage} />
                  <Route exact path={ROUTES.forgotPass} component={ForgetPasswordPage} /> */}
                  <ProtectedRoute auth={authen} exact path={ROUTES.search} component={SearchPage} />
                  <ProtectedRoute auth={authen} exact path={ROUTES.searchDetail} component={SearchDetailPage} />
                  <ProtectedRoute auth={authen} exact path={ROUTES.request} component={UnconfirmedRequestListPage} />
                  <ProtectedRoute auth={authen} exact path={ROUTES.requestDetail} component={RequestInfoDetailPage} />
                  <ProtectedRoute auth={authen} exact path={ROUTES.sendRequest} component={SendRequestPage} />
                  <ProtectedRoute auth={authen} exact path={ROUTES.rating} component={ConfirmedRequestListPage} />
                  <ProtectedRoute auth={authen} exact path={ROUTES.review.path} component={ReviewPage} />
                  <ProtectedRoute auth={authen} exact path={ROUTES.profile} component={ProfilePage} />
                  <ProtectedRoute auth={authen} exact path={ROUTES.editProfile} component={EditProfilePage} />
                  <ProtectedRoute auth={authen} exact path={ROUTES.changePass} component={ChangePassWordPage} />
                  <ProtectedRoute auth={authen} exact path={ROUTES.addAddress} component={AddAddressPage} />
                  <ProtectedRoute auth={authen} exact path={ROUTES.chat.value} component={ChatPage} />
                  <Redirect to={ROUTES.login} />
                </Switch>
              </div>
            );
          }}
        </CSSTransition>
      </TransitionGroup>
      <div
        style={{
          position: 'fixed',
          bottom: 10,
          left: 0,
          right: 0,
          zIndex: 5001,
        }}
      >
        <Route path={ROUTES.home} component={BottomNavigation} />
        <Route path={ROUTES.home} render={() => <PendingRateRemindDialog />} />
      </div>
      <LoadingBackDrop open={setLoadingBackDrop} />
      <FetchErrorDialog msgId={networkErrorMsg} onClose={() => dispatch(setNetworkError(undefined))} />
      <GuideDialog />
    </SWRConfig>
  );
};

export default connect(mapStateToProps)(withStyles(bodyStyles)(App));
