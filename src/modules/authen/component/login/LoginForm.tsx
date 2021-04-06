import { Button, FormHelperText, Typography } from "@material-ui/core";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { ROUTES } from "../../../../configs/routes";
import { FreeTextField } from "../../../common/component/elements";
import { RawLink } from "../../../common/component/Link";
import { defaultLoginData, ILogin } from "../../model";

interface Props {
  errorMessage?: string;
  onSubmit(data: ILogin): void;
}

const LoginForm = (props: Props) => {
  const { errorMessage, onSubmit } = props;
  const intl = useIntl();

  const { handleSubmit, errors, control } = useForm<ILogin>({
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
      <form
        style={{
          width: "100%",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="id"
          control={control}
          rules={{ required: intl.formatMessage({ id: "required" }) }}
          render={({ onChange, value }) => (
            <FreeTextField
              value={value}
              placeholder={intl.formatMessage({ id: "phoneNumber" })}
              type="tel"
              startAdornmentIcon={
                <PhoneIphoneIcon style={{ width: "20px", height: "20px" }} />
              }
              onChange={onChange}
            />
          )}
        />

        <FormHelperText error>{errors?.id?.message}</FormHelperText>

        <Controller
          name="password"
          control={control}
          rules={{ required: intl.formatMessage({ id: "required" }) }}
          render={({ onChange, value }) => (
            <FreeTextField
              value={value}
              placeholder={intl.formatMessage({ id: "password" })}
              type="password"
              startAdornmentIcon={
                <VpnKeyIcon style={{ width: "20px", height: "20px" }} />
              }
              onChange={onChange}
            />
          )}
        />

        <FormHelperText error>{errors?.password?.message}</FormHelperText>

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
