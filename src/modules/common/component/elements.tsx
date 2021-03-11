import {
  Input,
  InputAdornment,
  InputProps,
  Slide,
  Theme,
  withStyles,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import React from "react";
import styled from "styled-components";
import { LIGHT_GREY } from "../../../configs/colors";
import { ReactComponent as RectangleIcon } from "../../../svg/ic_rectangle.svg";

export const PageWrapper = styled.div`
  background-size: cover;
  min-height: ${window.innerHeight}px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const PageWrapperNoScroll = styled.div`
  background-size: cover;
  height: ${window.innerHeight}px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const CardDiv = styled.div`
  border-radius: 12px;
  background-color: ${LIGHT_GREY};
  padding: 12px;
  margin-top: 12px;
`;

export const SlideUp = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CustomInput = withStyles((theme: Theme) => ({
  root: {
    borderRadius: 12,
    position: "relative",
    backgroundColor: "#F5F6F9",
    border: "none",
    fontSize: 16,
  },
  input: {
    padding: "18px 8px",
  },
}))(Input);

export interface WVInputProps extends InputProps {
  regex?: RegExp;
  clear?: boolean;
  startAdornmentIcon?: React.ReactNode;
}

export const FreeTextField: React.FC<WVInputProps> = (props) => {
  const { regex, clear, startAdornmentIcon, ...rest } = props;

  return (
    <CustomInput
      {...rest}
      style={{
        margin: "8px 0",
      }}
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
  );
};
