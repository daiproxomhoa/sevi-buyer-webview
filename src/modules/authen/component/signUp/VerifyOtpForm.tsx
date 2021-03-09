import PhonelinkLockIcon from "@material-ui/icons/PhonelinkLock";
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

const VerifyOtpForm = (props: Props) => {
  const { data, onSubmit, onUpdate, loading } = props;
  const intl = useIntl();

  return (
    <div
      style={{
        margin: "24px 24px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <FreeTextField
        value={data.otp}
        placeholder={intl.formatMessage({ id: "auth.enterOtp" })}
        type="tel"
        startAdornmentIcon={
          <PhonelinkLockIcon style={{ width: "20px", height: "20px" }} />
        }
        inputProps={{
          maxLength: 6,
        }}
        onChange={(e) => onUpdate({ ...data, otp: e.target.value })}
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
        <FormattedMessage id="verify" />
      </LoadingButton>
    </div>
  );
};

export default VerifyOtpForm;
