import { Button, FormHelperText } from "@material-ui/core";
import PhonelinkLockIcon from "@material-ui/icons/PhonelinkLock";
import React from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { FormControlFreeTextField } from "../../../common/component/Form";
import { ISignUp } from "../../model";

interface Props {
  data: ISignUp;
  errorMessage?: string;
  onSubmit(values: ISignUp): void;
}

const VerifyOtpForm = (props: Props) => {
  const { data, errorMessage, onSubmit } = props;
  const intl = useIntl();

  const { register, handleSubmit, errors } = useForm<ISignUp>({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: data,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        margin: "24px 24px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <FormControlFreeTextField
        name="otp"
        placeholder={intl.formatMessage({ id: "auth.enterOtp" })}
        inputRef={register({
          required: intl.formatMessage({ id: "required" }),
        })}
        inputProps={{
          maxLength: 6,
        }}
        fullWidth
        errorMessage={errors.otp?.message}
        type="number"
        startAdornmentIcon={
          <PhonelinkLockIcon style={{ width: "20px", height: "20px" }} />
        }
      />

      {!!errorMessage && (
        <FormHelperText error style={{ textAlign: "center" }}>
          <FormattedMessage id={`auth.${errorMessage}`} />
        </FormHelperText>
      )}

      <Button
        style={{ marginTop: "12px", marginBottom: "12px" }}
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        type="submit"
      >
        <FormattedMessage id="verify" />
      </Button>
    </form>
  );
};

export default VerifyOtpForm;
