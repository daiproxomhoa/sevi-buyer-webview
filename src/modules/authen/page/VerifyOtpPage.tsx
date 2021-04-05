import { Typography } from "@material-ui/core";
import { replace } from "connected-react-router";
import { set } from "js-cookie";
import queryString from "query-string";
import React, { useCallback, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { API_PATHS } from "../../../configs/api";
import { ROUTES } from "../../../configs/routes";
import { AppState } from "../../../redux/reducer";
import { LoadingBackDrop, PageWrapper } from "../../common/component/elements";
import { RESPONSE_STATUS, TOKEN } from "../../common/constants";
import { fetchThunk } from "../../common/redux/thunk";
import HeaderBox from "../component/HeaderBox";
import { CountDown } from "../component/signUp/CountDown";
import Footer from "../component/signUp/Footer";
import VerifyOtpForm from "../component/signUp/VerifyOtpForm";
import { OTP_VALID_SECONDS } from "../constants";
import { defaultSignUpData, ISignUp } from "../model";
import { authenIn } from "../redux/authenReducer";

interface Props {}

const VerifyOtpPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const location = useLocation();

  const [signUpData, setSignUpData] = useState<ISignUp>(defaultSignUpData);
  const [loading, setLoading] = useState(false);
  const [counting, setCounting] = useState(OTP_VALID_SECONDS);
  const [errorMessage, setErrorMessage] = useState("");

  const updateQueryParams = useCallback(() => {
    if (location.search) {
      const data = (queryString.parse(location.search) as unknown) as ISignUp;
      setSignUpData(data);
    }
  }, [location.search]);

  const onSubmit = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");
    const json = await dispatch(
      fetchThunk(API_PATHS.signUp, "post", JSON.stringify(signUpData))
    );

    setLoading(false);
    if (json?.body?.tokenSignature) {
      dispatch(authenIn());
      set(TOKEN, json.body.tokenSignature);
      dispatch(replace({ pathname: ROUTES.search }));
      return;
    }

    setErrorMessage(json?.body?.status);
  }, [dispatch, signUpData]);

  const onResend = useCallback(async () => {
    setLoading(true);

    const json = await dispatch(
      fetchThunk(`${API_PATHS.otp}?id=${signUpData.id}`, "put")
    );

    setLoading(false);
    if (json?.status === RESPONSE_STATUS.SUCCESS) {
      setCounting(OTP_VALID_SECONDS);
    }
  }, [dispatch, signUpData]);

  React.useEffect(() => {
    updateQueryParams();
  }, [updateQueryParams]);

  return (
    <PageWrapper>
      <HeaderBox
        title="auth.verifyOtp"
        caption={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="textSecondary">
              <FormattedMessage id="auth.weSentOtpCode" />
            </Typography>
            <Typography
              variant="body2"
              color="primary"
              style={{ fontWeight: 500 }}
            >
              {signUpData.id}
            </Typography>
          </div>
        }
      />

      <VerifyOtpForm
        data={signUpData}
        errorMessage={errorMessage}
        onSubmit={onSubmit}
      />

      <CountDown
        key={counting}
        num={counting}
        onResend={onResend}
        onCompleted={() => setCounting(0)}
      />

      <Footer />

      <LoadingBackDrop open={loading} />
    </PageWrapper>
  );
};

export default VerifyOtpPage;
