import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { useHistory } from "react-router";
import { FormControlTextField } from "../../common/component/Form";
import { some } from "../../common/constants";

interface Props {
  profile: some;
  onSubmit?: (profile: some) => void;
}

const ChangePasswordForm = (props: Props) => {
  const { profile, onSubmit } = props;
  const intl = useIntl();
  const history = useHistory();
  const [typeInput, setTypeInput] = useState<some>({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm({
    reValidateMode: "onChange",
    defaultValues: profile,
  });

  useEffect(() => {
    reset();
  }, [profile, reset]);
  console.log("errors", errors);

  return (
    <form
      onSubmit={onSubmit && handleSubmit(onSubmit)}
      className="overflow-auto"
    >
      <input type="hidden" {...register("id")} />
      <Box className={"d-flex d-flex-column align-items-center p-24"}>
        <Controller
          name={"oldPassword"}
          control={control}
          rules={{
            required: intl.formatMessage({ id: "required" }),
            minLength: {
              value: 4,
              message: intl.formatMessage({ id: "minPassWordValid" }),
            },
          }}
          render={({ field: { onChange, value, ref, name } }) => (
            <FormControlTextField
              className={"m-b-4"}
              inputRef={ref}
              label={<FormattedMessage id={"profile.oldPassword"} />}
              fullWidth={true}
              type={typeInput?.[name] ? "text" : "password"}
              name={name}
              value={value}
              onChange={onChange}
              errorMessage={errors[name]?.message}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    tabIndex={-1}
                    onClick={() => {
                      setTypeInput((one) => ({
                        ...one,
                        [name]: !one[name],
                      }));
                    }}
                  >
                    {typeInput?.[name] ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          )}
        />
        <Controller
          name={"newPassword"}
          control={control}
          rules={{
            required: intl.formatMessage({ id: "required" }),
            minLength: {
              value: 4,
              message: intl.formatMessage({ id: "minPassWordValid" }),
            },
            validate: (value) =>
              value === watch("oldPassword")
                ? intl.formatMessage({ id: "profile.newPasswordInvalid" })
                : true,
          }}
          render={({ field: { onChange, value, ref, name } }) => (
            <FormControlTextField
              className={"m-b-4"}
              inputRef={ref}
              label={<FormattedMessage id={"profile.newPassword"} />}
              fullWidth={true}
              type={typeInput?.[name] ? "text" : "password"}
              name={name}
              value={value}
              onChange={onChange}
              errorMessage={errors[name]?.message}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    tabIndex={-1}
                    onClick={() => {
                      setTypeInput((one) => ({
                        ...one,
                        [name]: !one[name],
                      }));
                    }}
                  >
                    {typeInput?.newPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          )}
        />
        <Controller
          name={"rePassword"}
          control={control}
          rules={{
            required: intl.formatMessage({ id: "required" }),
            minLength: {
              value: 4,
              message: intl.formatMessage({ id: "minPassWordValid" }),
            },
            validate: (value) =>
              value !== watch("newPassword")
                ? intl.formatMessage({ id: "rePasswordInvalid" })
                : true,
          }}
          render={({ field: { onChange, value, ref, name } }) => (
            <FormControlTextField
              className={"m-b-4"}
              inputRef={ref}
              label={<FormattedMessage id={"profile.rePassword"} />}
              fullWidth={true}
              type={typeInput?.[name] ? "text" : "password"}
              name={name}
              value={value}
              onChange={onChange}
              errorMessage={errors[name]?.message}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    tabIndex={-1}
                    onClick={() => {
                      setTypeInput((one) => ({
                        ...one,
                        [name]: !one[name],
                      }));
                    }}
                  >
                    {typeInput?.[name] ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          )}
        />
        <Button
          className="m-t-24"
          type="submit"
          variant={"contained"}
          color={"primary"}
          fullWidth
          size={"large"}
        >
          <FormattedMessage id={"save"} />
        </Button>
        <Button
          className="m-t-8"
          variant={"text"}
          color={"inherit"}
          fullWidth
          size={"large"}
          onClick={() => {
            history.goBack();
          }}
          disableRipple
        >
          <Typography color="textSecondary">
            <FormattedMessage id={"cancel"} />
          </Typography>
        </Button>
      </Box>
    </form>
  );
};

export default ChangePasswordForm;