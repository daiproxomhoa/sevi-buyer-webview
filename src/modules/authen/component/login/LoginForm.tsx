import { Button, Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { ROUTES } from "../../../../configs/routes";
import { ReactComponent as KeyIcon } from "../../../../svg/vecter_vpn_key.svg";
import { ReactComponent as IPhoneIcon } from "../../../../svg/vector_iphone.svg";
import { FreeTextField } from "../../../common/component/elements";
import { RawLink } from "../../../common/component/Link";
import { ILogin } from "../../model";

interface Props {
  loginData: ILogin;
  onSubmit(): void;
  onUpdate(data: ILogin): void;
}

const LoginForm = (props: Props) => {
  const { loginData, onSubmit, onUpdate } = props;
  const intl = useIntl();

  return (
    <div
      style={{
        margin: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <FreeTextField
        value={loginData.phone}
        placeholder={intl.formatMessage({ id: "phoneNumber" })}
        type="tel"
        startAdornmentIcon={
          <IPhoneIcon style={{ width: "20px", height: "20px" }} />
        }
        onChange={(e) => onUpdate({ ...loginData, phone: e.target.value })}
      />
      <FreeTextField
        value={loginData.password}
        placeholder={intl.formatMessage({ id: "password" })}
        type="password"
        startAdornmentIcon={
          <KeyIcon style={{ width: "20px", height: "20px" }} />
        }
        onChange={(e) => onUpdate({ ...loginData, password: e.target.value })}
      />

      <Button
        style={{ marginTop: "28px", marginBottom: "12px" }}
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        onClick={onSubmit}
      >
        <FormattedMessage id="login" />
      </Button>

      <RawLink to={ROUTES.forgotPass}>
        <Typography variant="caption" color="textSecondary">
          <FormattedMessage id="forgotPassword" />
        </Typography>
      </RawLink>
    </div>
  );
};

export default LoginForm;
