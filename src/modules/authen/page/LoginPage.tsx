import { Typography } from "@material-ui/core";
import { replace } from "connected-react-router";
import { set } from "js-cookie";
import React from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { API_PATHS } from "../../../configs/api";
import { ROUTES } from "../../../configs/routes";
import { AppState } from "../../../redux/reducer";
import { PageWrapper } from "../../common/component/elements";
import { RawLink } from "../../common/component/Link";
import { TOKEN } from "../../common/constants";
import { fetchThunk } from "../../common/redux/thunk";
import HeaderBox from "../component/HeaderBox";
import LoginForm from "../component/login/LoginForm";
import { defaultLoginData, ILogin } from "../model";
import { authenIn } from "../redux/authenReducer";

interface ILoginPageProps {
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const { dispatch } = props;
  const [loginData, setLoginData] = React.useState<ILogin>(defaultLoginData);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = React.useCallback(async () => {
    setLoading(true);
    const json = await dispatch(
      fetchThunk(API_PATHS.passwordSignIn, "post", JSON.stringify(loginData))
    );

    setLoading(false);

    if (json?.body?.tokenSignature) {
      dispatch(authenIn());
      set(TOKEN, json.body.tokenSignature);
      dispatch(replace({ pathname: ROUTES.search }));
    }
  }, [dispatch, loginData]);

  return (
    <PageWrapper>
      <HeaderBox
        title="welcome"
        caption={
          <Typography variant="body2" color="textSecondary">
            <FormattedMessage id="appBookWork" />
          </Typography>
        }
      />

      <LoginForm
        loading={loading}
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
        <Typography variant="body2" color="textSecondary">
          <FormattedMessage id="noAccount" />
          &nbsp;
          <RawLink to={ROUTES.signUp}>
            <Typography
              component="span"
              variant="body2"
              color="textPrimary"
              style={{ fontWeight: 500 }}
            >
              <FormattedMessage id="register" />
            </Typography>
          </RawLink>
        </Typography>
      </div>
    </PageWrapper>
  );
};

export default connect()(LoginPage);
