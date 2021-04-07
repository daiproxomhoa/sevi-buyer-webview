import { Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { API_PATHS } from "../../../configs/api";
import { ROUTES } from "../../../configs/routes";
import { AppState } from "../../../redux/reducer";
import { LoadingBackDrop, PageWrapper } from "../../common/component/elements";
import { RawLink } from "../../common/component/Link";
import { fetchThunk } from "../../common/redux/thunk";
import HeaderBox from "../component/HeaderBox";
import LoginForm from "../component/login/LoginForm";
import { ILogin } from "../model";
import { authenIn, setAuthData } from "../redux/authenReducer";

interface ILoginPageProps {
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const { dispatch } = props;
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const onSubmit = React.useCallback(
    async (values: ILogin) => {
      setLoading(true);
      setErrorMessage("");

      const json = await dispatch(
        fetchThunk(API_PATHS.passwordSignIn, "post", JSON.stringify(values))
      );

      setLoading(false);

      if (json?.body?.tokenSignature) {
        dispatch(authenIn());
        dispatch(setAuthData({ ...json.body }));
        return;
      }

      setErrorMessage(json?.body?.status);
    },
    [dispatch]
  );

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

      <LoginForm errorMessage={errorMessage} onSubmit={onSubmit} />

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
      <LoadingBackDrop open={loading} />
    </PageWrapper>
  );
};

export default connect()(LoginPage);
