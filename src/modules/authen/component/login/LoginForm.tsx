import { Typography } from "@material-ui/core";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { ROUTES } from "../../../../configs/routes";
import { FreeTextField } from "../../../common/component/elements";
import { RawLink } from "../../../common/component/Link";
import LoadingButton from "../../../common/component/LoadingButton";
import { ILogin } from "../../model";

interface Props {
  loading: boolean;
  loginData: ILogin;
  onSubmit(): void;
  onUpdate(data: ILogin): void;
}

const LoginForm = (props: Props) => {
  const { loading, loginData, onSubmit, onUpdate } = props;
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
        value={loginData.id}
        placeholder={intl.formatMessage({ id: "phoneNumber" })}
        type="tel"
        startAdornmentIcon={
          <PhoneIphoneIcon style={{ width: "20px", height: "20px" }} />
        }
        onChange={(e) => onUpdate({ ...loginData, id: e.target.value })}
      />
      <FreeTextField
        value={loginData.password}
        placeholder={intl.formatMessage({ id: "password" })}
        type="password"
        startAdornmentIcon={
          <VpnKeyIcon style={{ width: "20px", height: "20px" }} />
        }
        onChange={(e) => onUpdate({ ...loginData, password: e.target.value })}
      />

      <LoadingButton
        loading={loading}
        style={{ marginTop: "28px", marginBottom: "12px" }}
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        onClick={onSubmit}
      >
        <FormattedMessage id="login" />
      </LoadingButton>

      <RawLink to={ROUTES.forgotPass}>
        <Typography variant="body2" color="textSecondary">
          <FormattedMessage id="forgotPassword" />
        </Typography>
      </RawLink>
    </div>
  );
};

export default LoginForm;
