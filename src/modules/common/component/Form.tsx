import {
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
  InputLabel,
} from "@material-ui/core";
import React, { ReactNode } from "react";
import { CustomInput, WVInputProps } from "./elements";
import { ReactComponent as RectangleIcon } from "../../../svg/ic_rectangle.svg";

interface FormControlTextFieldProps extends WVInputProps {
  formControlStyle?: React.CSSProperties;
  errorMessage?: string;
  label?: ReactNode;
  disabledHelper?: boolean;
  fullWidth?: boolean;
}

export const FormControlTextField = (props: FormControlTextFieldProps) => {
  const {
    formControlStyle,
    errorMessage,
    className,
    label,
    disabledHelper,
    fullWidth,
    ...rest
  } = props;

  return (
    <FormControl
      style={formControlStyle}
      error={!!errorMessage}
      className={className}
      fullWidth={fullWidth}
    >
      {label && (
        <InputLabel shrink htmlFor="component-disabled">
          {label}
        </InputLabel>
      )}
      <Input {...rest} />
      {!disabledHelper && (
        <FormHelperText style={{ minHeight: 20 }}>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export const FormControlFreeTextField = (props: FormControlTextFieldProps) => {
  const {
    errorMessage,
    className,
    disabledHelper,
    fullWidth,
    startAdornmentIcon,
    ...rest
  } = props;

  return (
    <FormControl error={!!errorMessage} fullWidth={fullWidth}>
      <CustomInput
        {...rest}
        fullWidth
        disableUnderline
        startAdornment={
          !!startAdornmentIcon && (
            <InputAdornment
              position="start"
              style={{ marginLeft: "16px", opacity: 0.6 }}
            >
              {startAdornmentIcon}
              <RectangleIcon style={{ marginLeft: "8px" }} />
            </InputAdornment>
          )
        }
      />
      {!disabledHelper && (
        <FormHelperText style={{ minHeight: 20 }}>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};
