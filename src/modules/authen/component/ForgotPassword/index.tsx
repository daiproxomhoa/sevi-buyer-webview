import React from "react";
import { PageWrapper } from "../../../common/component/elements";
import Header from "./Header";
import { ReactComponent as ForgotPassIcon } from "../../../../svg/ic_forgotpass.svg";
import { ReactComponent as IPhoneIcon } from "../../../../svg/ic_phone_iphone.svg";
import { Button, ButtonBase, Typography } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";

interface Props {}

const ForgotPasswordBox = (props: Props) => {
  const history = useHistory();

  return (
    <PageWrapper>
      <Header action={() => history.goBack()} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          margin: "0 24px",
        }}
      >
        <ForgotPassIcon style={{ marginBottom: "32px", marginTop: "46px" }} />
        <Typography variant="body1">
          <FormattedMessage id="setupPasswordTemp" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage
            id="smsFormat"
            values={{
              smsCode: (
                <Typography component="span">
                  <FormattedMessage id="smsCode" />
                </Typography>
              ),
              headCode: (
                <Typography component="span">
                  <FormattedMessage id="headCode" />
                </Typography>
              ),
            }}
          />
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          style={{ marginTop: "32px" }}
        >
          <FormattedMessage id="setupPasswordTempDescription" />
        </Typography>

        <Button
          style={{ marginTop: "32px", marginBottom: "12px" }}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          <IPhoneIcon style={{ marginRight: "10px" }} />
          <FormattedMessage id="openSms" />
        </Button>
        <ButtonBase
          disableRipple
          disableTouchRipple
          onClick={() => history.goBack()}
        >
          <Typography variant="body2" color="textSecondary">
            <FormattedMessage id="backToLogin" />
          </Typography>
        </ButtonBase>
      </div>
    </PageWrapper>
  );
};

export default ForgotPasswordBox;
