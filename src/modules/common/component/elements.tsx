import {
  Backdrop,
  BackdropProps,
  createStyles,
  Input,
  InputAdornment,
  InputBase,
  InputProps,
  makeStyles,
  Slide,
  Theme,
  Typography,
  withStyles,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import { Alert, AlertProps, AlertTitle } from "@material-ui/lab";
import { OptionsObject, SnackbarMessage } from "notistack";
import React from "react";
import styled from "styled-components";
import {
  BACKGROUND,
  GREY_100,
  GREY_400,
  GREY_500,
  LIGHT_GREY,
} from "../../../configs/colors";
import { ReactComponent as RectangleIcon } from "../../../svg/ic_rectangle.svg";
import { ReactComponent as HeaderSVG } from "../../../svg/header.svg";
import CircularProgress from "@material-ui/core/CircularProgress";

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

interface HeaderDivProps extends React.HTMLAttributes<HTMLDivElement> {}

export const HeaderDiv: React.FC<HeaderDivProps> = ({ children, ...rest }) => {
  return (
    <HeaderDivCore {...rest}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: -100,
          bottom: 0,
          overflow: "hidden",
        }}
      >
        <HeaderSVG />
      </div>
      {children}
    </HeaderDivCore>
  );
};

const HeaderDivCore = styled.div`
  top: 0;
  position: sticky;
  position: -webkit-sticky;
  border-radius: 0px 0px 32px 32px;
  padding: 28px 24px 24px 24px;
  background: linear-gradient(
    96deg,
    rgb(255, 174, 70) -31.54%,
    rgb(255, 151, 85) -2.71%,
    rgb(202, 30, 120) 59.37%,
    rgb(192, 15, 167) 98.43%
  );
  z-index: 1;
  overflow: hidden;
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

export const SlideRight = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export const SlideLeft = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const CustomInput = withStyles((theme: Theme) => ({
  root: {
    borderRadius: 12,
    position: "relative",
    backgroundColor: LIGHT_GREY,
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

export const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: 32,
      padding: 0,
      borderBottom: `1px solid ${GREY_400}`,
      position: "relative",
      backgroundColor: theme.palette.common.white,
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      overflow: "hidden",
      "&:hover": {
        borderColor: theme.palette.primary.main,
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      fontSize: theme.typography.body2.fontSize,
      padding: "8px",
    },
    focused: {
      borderColor: theme.palette.primary.main,
    },
    error: {
      borderColor: theme.palette.error.main,
    },
    disabled: {
      backgroundColor: GREY_100,
      color: GREY_500,
    },
  })
)(InputBase);

export function snackbarSetting(
  closeSnackbar: (key: string) => void,
  alertProps?: AlertProps,
  alertTitle?: React.ReactNode
) {
  return {
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    preventDuplicate: true,
    autoHideDuration: 1000,
    style: { width: "100%" },
    // persist: true,
    content: (key: string, msg: SnackbarMessage) => (
      <Alert
        // onClose={() => closeSnackbar(key)}
        severity={alertProps?.color}
        {...alertProps}
      >
        {alertTitle && <AlertTitle>{alertTitle}</AlertTitle>}
        <Typography variant="body2" color="inherit">
          {msg}
        </Typography>
      </Alert>
    ),
  } as OptionsObject;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.modal + 1,
      color: BACKGROUND,
    },
  })
);

export const LoadingBackDrop: React.FC<BackdropProps> = (props) => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} {...props}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
