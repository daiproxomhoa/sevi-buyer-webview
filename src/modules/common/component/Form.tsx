import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@material-ui/core";
import React, { ReactNode } from "react";
import { WVInputProps } from "./elements";

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
