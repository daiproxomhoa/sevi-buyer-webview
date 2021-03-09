import { FormControl, FormHelperText } from "@material-ui/core";
import React from "react";
import { FreeTextField, WVInputProps } from "./elements";

interface FormControlTextFieldProps extends WVInputProps {
  id: string;
  formControlStyle?: React.CSSProperties;
  errorMessage?: string;
  optional?: boolean;
}

export const FormControlTextField = (props: FormControlTextFieldProps) => {
  const { id, formControlStyle, errorMessage, optional, ...rest } = props;

  return (
    <FormControl style={formControlStyle} error={!!errorMessage}>
      <FreeTextField id={id} {...rest} />
      {errorMessage && <FormHelperText id={id}>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};
