import { Typography } from "@material-ui/core";
import { push } from "connected-react-router";
import queryString from "query-string";
import React, { useCallback, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { API_PATHS } from "../../../configs/api";
import { ROUTES } from "../../../configs/routes";
import { AppState } from "../../../redux/reducer";
import { PageWrapper } from "../../common/component/elements";
import { RESPONSE_STATUS } from "../../common/constants";
import { fetchThunk } from "../../common/redux/thunk";
import HeaderBox from "../component/HeaderBox";
import Footer from "../component/signUp/Footer";
import SignUpForm from "../component/signUp/SignUpForm";
import { defaultSignUpData, ISignUp } from "../model";
import {
  transformSignUpInfo,
  validateSignUpInfo,
  validSignUpInfo,
} from "../utils";

interface ISignUpPageProps {}

const SignUpPage: React.FunctionComponent<ISignUpPageProps> = (props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [signUpData, setSignUpData] = useState<ISignUp>(defaultSignUpData);
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    const signUpInfo = transformSignUpInfo(signUpData);
    const valid = validSignUpInfo(validateSignUpInfo(signUpInfo));

    if (valid) {
      return;
    }

    setLoading(true);
    const json = await dispatch(
      fetchThunk(`${API_PATHS.otp}?id=${signUpInfo.id}`, "put")
    );

    setLoading(false);
    if (json?.status === RESPONSE_STATUS.SUCCESS) {
      dispatch(
        push({
          pathname: ROUTES.verifyOtp,
          state: queryString.stringify(signUpInfo),
        })
      );
    }
  }, [dispatch, signUpData]);

  return (
    <PageWrapper>
      <HeaderBox
        title="registerAccount"
        caption={
          <Typography variant="body2" color="textSecondary">
            <FormattedMessage id="registerNow" />
          </Typography>
        }
      />

      <SignUpForm
        loading={loading}
        data={signUpData}
        onSubmit={onSubmit}
        onUpdate={(data) => setSignUpData(data)}
      />

      <Footer />
    </PageWrapper>
  );
};

export default SignUpPage;
