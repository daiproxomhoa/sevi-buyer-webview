import PersonIcon from "@material-ui/icons/Person";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { FreeTextField } from "../../../common/component/elements";
import LoadingButton from "../../../common/component/LoadingButton";
import { ISignUp } from "../../model";

interface Props {
  loading: boolean;
  data: ISignUp;
  onSubmit(): void;
  onUpdate(data: ISignUp): void;
}

const SignUpForm = (props: Props) => {
  const { data, onSubmit, onUpdate, loading } = props;
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
        value={data.id}
        placeholder={intl.formatMessage({ id: "phoneNumber" })}
        type="tel"
        startAdornmentIcon={
          <PhoneIphoneIcon style={{ width: "20px", height: "20px" }} />
        }
        onChange={(e) => onUpdate({ ...data, id: e.target.value })}
      />

      <FreeTextField
        value={data.familyName}
        placeholder={intl.formatMessage({ id: "name" })}
        startAdornmentIcon={
          <PersonIcon style={{ width: "20px", height: "20px" }} />
        }
        onChange={(e) => onUpdate({ ...data, familyName: e.target.value })}
      />

      <FreeTextField
        value={data.password}
        placeholder={intl.formatMessage({ id: "password" })}
        startAdornmentIcon={
          <VpnKeyIcon style={{ width: "20px", height: "20px" }} />
        }
        onChange={(e) => onUpdate({ ...data, password: e.target.value })}
        type="password"
      />

      <FreeTextField
        value={data.confirmPassword}
        placeholder={intl.formatMessage({ id: "repeatPassword" })}
        startAdornmentIcon={
          <VpnKeyIcon style={{ width: "20px", height: "20px" }} />
        }
        onChange={(e) => onUpdate({ ...data, confirmPassword: e.target.value })}
        type="password"
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
        <FormattedMessage id="continue" />
      </LoadingButton>
    </div>
  );
};

export default SignUpForm;
