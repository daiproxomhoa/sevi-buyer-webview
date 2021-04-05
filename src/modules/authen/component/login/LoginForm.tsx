import { Button, FormHelperText, Typography } from "@material-ui/core";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import React from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { ROUTES } from "../../../../configs/routes";
import { FormControlFreeTextField } from "../../../common/component/Form";
import { RawLink } from "../../../common/component/Link";
import { defaultLoginData, ILogin } from "../../model";

interface Props {
  errorMessage?: string;
  onSubmit(data: ILogin): void;
}

const LoginForm = (props: Props) => {
  const { errorMessage, onSubmit } = props;
  const intl = useIntl();

  const { register, handleSubmit, errors } = useForm<ILogin>({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: defaultLoginData,
  });

  return (
    <div
      style={{
        margin: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControlFreeTextField
          name="id"
          placeholder={intl.formatMessage({ id: "phoneNumber" })}
          inputRef={register({
            required: intl.formatMessage({ id: "required" }),
          })}
          fullWidth
          errorMessage={errors.id?.message}
          type="tel"
          startAdornmentIcon={
            <PhoneIphoneIcon style={{ width: "20px", height: "20px" }} />
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

        {!!errorMessage && (
          <FormHelperText error style={{ textAlign: "center" }}>
            <FormattedMessage id={`auth.${errorMessage}`} />
          </FormHelperText>
        )}

        <Button
          style={{ margin: "12px 0" }}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          type="submit"
        >
          <FormattedMessage id="login" />
        </Button>
      </form>

      <RawLink to={ROUTES.forgotPass}>
        <Typography variant="body2" color="textSecondary">
          <FormattedMessage id="forgotPassword" />
        </Typography>
      </RawLink>
    </div>
  );
};

export default LoginForm;
