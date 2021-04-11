import { Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import queryString from "query-string";
import React, { useCallback, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { API_PATHS } from "../../../configs/api";
import { AppState } from "../../../redux/reducer";
import { PageWrapper } from "../../common/component/elements";
import { RESPONSE_STATUS } from "../../common/constants";
import { setLoadingBackDrop } from "../../common/redux/commonReducer";
import { fetchThunk } from "../../common/redux/thunk";
import { fetchProfile } from "../../profile/redux/profileReducer";
import HeaderBox from "../component/HeaderBox";
import { CountDown } from "../component/signUp/CountDown";
import Footer from "../component/signUp/Footer";
import VerifyOtpForm from "../component/signUp/VerifyOtpForm";
import { OTP_VALID_SECONDS } from "../constants";
import { defaultSignUpData, ISignUp } from "../model";
import { authenIn, setAuthData } from "../redux/authenReducer";

interface Props {}

const VerifyOtpPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const intl = useIntl();

  const [signUpData, setSignUpData] = useState<ISignUp>(defaultSignUpData);
  const [counting, setCounting] = useState(OTP_VALID_SECONDS);

  const updateQueryParams = useCallback(() => {
    if (location.search) {
      const data = (queryString.parse(location.search) as unknown) as ISignUp;
      setSignUpData(data);
    }
  }, [location.search]);

  const onSubmit = useCallback(async () => {
    dispatch(setLoadingBackDrop(true));
    const json = await dispatch(
      fetchThunk(API_PATHS.signUp, "post", JSON.stringify(signUpData))
    );

    dispatch(setLoadingBackDrop(false));
    if (json?.body?.tokenSignature) {
      dispatch(authenIn());
      dispatch(setAuthData({ ...json.body }));
      dispatch(fetchProfile());
      return;
    }

    enqueueSnackbar(intl.formatMessage({ id: `auth.${json?.body?.status}` }), {
      anchorOrigin: { horizontal: "center", vertical: "top" },
      variant: "error",
    });
  }, [dispatch, enqueueSnackbar, intl, signUpData]);

  const onResend = useCallback(async () => {
    dispatch(setLoadingBackDrop(true));
    const json = await dispatch(
      fetchThunk(`${API_PATHS.otp}?id=${signUpData.id}`, "put")
    );
    dispatch(setLoadingBackDrop(false));
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

      <VerifyOtpForm data={signUpData} onSubmit={onSubmit} />

      <CountDown
        key={counting}
        num={counting}
        onResend={onResend}
        onCompleted={() => setCounting(0)}
      />

      <Footer />
    </PageWrapper>
  );
};

export default VerifyOtpPage;
