import { Button, FormHelperText } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import React from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { FormControlFreeTextField } from "../../../common/component/Form";
import { defaultSignUpData, ISignUp } from "../../model";

interface Props {
  errorMessage?: string;
  onSubmit(data: ISignUp): void;
}

const SignUpForm = (props: Props) => {
  const { errorMessage, onSubmit } = props;
  const intl = useIntl();

  const { register, handleSubmit, errors, getValues } = useForm<ISignUp>({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: defaultSignUpData,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        margin: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <FormControlFreeTextField
        name="id"
        placeholder={intl.formatMessage({ id: "phoneNumber" })}
        inputRef={register({
          required: intl.formatMessage({ id: "required" }),
        })}
        inputProps={{
          maxLength: 10,
        }}
        fullWidth
        errorMessage={errors.id?.message}
        type="tel"
        startAdornmentIcon={
          <PhoneIphoneIcon style={{ width: "20px", height: "20px" }} />
        }
      />

      <FormControlFreeTextField
        name="name"
        placeholder={intl.formatMessage({ id: "name" })}
        inputRef={register({
          required: intl.formatMessage({ id: "required" }),
        })}
        fullWidth
        errorMessage={errors.name?.message}
        startAdornmentIcon={
          <PersonIcon style={{ width: "20px", height: "20px" }} />
        }
      />

      <FormControlFreeTextField
        name="password"
        placeholder={intl.formatMessage({ id: "password" })}
        inputRef={register({
          required: intl.formatMessage({ id: "required" }),
        })}
        fullWidth
        errorMessage={errors.password?.message}
        type="password"
        startAdornmentIcon={
          <VpnKeyIcon style={{ width: "20px", height: "20px" }} />
        }
      />

      <FormControlFreeTextField
        name="confirmPassword"
        placeholder={intl.formatMessage({ id: "repeatPassword" })}
        inputRef={register({
          required: intl.formatMessage({ id: "required" }),
          validate: (value) =>
            value === getValues("password") ||
            intl.formatMessage({ id: "auth.confirmPasswordNotMatch" }),
        })}
        fullWidth
        errorMessage={errors.confirmPassword?.message}
        type="password"
        startAdornmentIcon={
          <VpnKeyIcon style={{ width: "20px", height: "20px" }} />
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
        <FormattedMessage id="continue" />
      </Button>
    </form>
  );
};

export default SignUpForm;
