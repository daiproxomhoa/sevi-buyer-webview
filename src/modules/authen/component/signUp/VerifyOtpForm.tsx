import { Button, FormHelperText } from "@material-ui/core";
import PhonelinkLockIcon from "@material-ui/icons/PhonelinkLock";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { FreeTextField } from "../../../common/component/elements";
import { ISignUp } from "../../model";

interface Props {
  data: ISignUp;
  onSubmit(values: ISignUp): void;
}

const VerifyOtpForm = (props: Props) => {
  const { data, onSubmit } = props;
  const intl = useIntl();

  const { control, handleSubmit, errors } = useForm<ISignUp>({
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
      }}
    >
      <Controller
        name="otp"
        control={control}
        rules={{
          required: intl.formatMessage({ id: "required" }),
        }}
        render={({ onChange, value }) => (
          <FreeTextField
            value={value}
            placeholder={intl.formatMessage({ id: "auth.enterOtp" })}
            type="number"
            startAdornmentIcon={
              <PhonelinkLockIcon style={{ width: "20px", height: "20px" }} />
            }
            onChange={onChange}
          />
        )}
      />

      <FormHelperText error>{errors?.otp?.message}</FormHelperText>

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
