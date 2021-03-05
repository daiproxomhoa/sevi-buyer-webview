import { Typography } from "@material-ui/core";
import { replace } from "connected-react-router";
import fetchMock from "fetch-mock";
import { set } from "js-cookie";
import React from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { API_PATHS } from "../../../configs/api";
import { ROUTES } from "../../../configs/routes";
import login from "../../../json/login.json";
import { AppState } from "../../../redux/reducer";
import { PageWrapper } from "../../common/component/elements";
import { RawLink } from "../../common/component/Link";
import { TOKEN } from "../../common/constants";
import { fetchThunk } from "../../common/redux/thunk";
import HeaderBox from "../component/HeaderBox";
import LoginForm from "../component/login/LoginForm";
import { ILogin } from "../model";
import { authenIn } from "../redux/authenReducer";

interface ILoginPageProps {
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const { dispatch } = props;
  const [loginData, setLoginData] = React.useState<ILogin>({
    phone: "0984345062",
    password: "123456",
  });

  const onSubmit = React.useCallback(async () => {
    fetchMock.post(API_PATHS.login, login, { delay: 1000 });

    const json = await dispatch(
      fetchThunk(API_PATHS.login, "post", JSON.stringify(loginData))
    );

    if (json?.body?.data) {
      dispatch(authenIn());
      set(TOKEN, json.body.data);
      dispatch(replace({ pathname: ROUTES.search }));
    }

    fetchMock.reset();
  }, [dispatch, loginData]);

  return (
    <PageWrapper>
      <HeaderBox title="welcome" caption="appBookWork" />

      <LoginForm
        loginData={loginData}
        onSubmit={onSubmit}
        onUpdate={(data) => setLoginData(data)}
      />

      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-end",
          marginBottom: "52px",
        }}
      >
        <Typography variant="caption" color="textSecondary">
          <FormattedMessage id="noAccount" />
          &nbsp;
          <RawLink to={ROUTES.signUp}>
            <Typography component="span" variant="caption" color="textPrimary">
              <FormattedMessage id="register" />
            </Typography>
          </RawLink>
        </Typography>
      </div>
    </PageWrapper>
  );
};

export default connect()(LoginPage);
