import {
  Backdrop,
  BackdropProps,
  Chip,
  createStyles,
  InputAdornment,
  InputBase,
  InputProps,
  makeStyles,
  Slide,
  Theme,
  withStyles,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TransitionProps } from '@material-ui/core/transitions';
import { OptionsObject } from 'notistack';
import React from 'react';
import styled from 'styled-components';
import { BACKGROUND, LIGHT_GREY } from '../../../configs/colors';
import { ReactComponent as HeaderSVG } from '../../../svg/header.svg';
import { ReactComponent as Header2SVG } from '../../../svg/header2.svg';
import { ReactComponent as RectangleIcon } from '../../../svg/ic_rectangle.svg';

export const PageWrapper = styled.div`
  background-size: cover;
  min-height: ${window.innerHeight}px;
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
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: -100,
          bottom: 0,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <HeaderSVG viewBox="0 0 1200 800" preserveAspectRatio="none" width="100%" height="100%" />
      </div>
      {children}
    </HeaderDivCore>
  );
};

export const Header2Div: React.FC<HeaderDivProps> = ({ children, ...rest }) => {
  return (
    <HeaderDivCore {...rest}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: -100,
          bottom: 0,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Header2SVG viewBox="0 0 1200 800" preserveAspectRatio="none" width="100%" height="100%" />
      </div>
      {children}
    </HeaderDivCore>
  );
};

// big in iOS, need 2 svg files so inline gradients won't collide
export const HeaderDiv2: React.FC<HeaderDivProps> = ({ children, ...rest }) => {
  return (
    <HeaderDivCore {...rest}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: -100,
          bottom: 0,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <HeaderSVG viewBox="0 0 1200 800" preserveAspectRatio="none" width="100%" height="100%" />
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
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const SlideRight = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export const SlideLeft = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const CustomInput = withStyles((theme: Theme) => ({
  root: {
    borderRadius: 12,
    position: 'relative',
    backgroundColor: LIGHT_GREY,
    border: 'none',
    fontSize: 16,
  },
  input: {
    padding: '18px 8px',
  },
}))(InputBase);

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
        margin: '4px 0 0 0',
      }}
      fullWidth
      startAdornment={
        !!startAdornmentIcon && (
          <InputAdornment position="start" style={{ marginLeft: '16px', opacity: 0.6 }}>
            {startAdornmentIcon}
            <RectangleIcon style={{ marginLeft: '8px' }} />
          </InputAdornment>
        )
      }
    />
  );
};

export function snackbarSetting(closeSnackbar: (key: string) => void, optionProps?: OptionsObject) {
  return {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
    preventDuplicate: true,
    autoHideDuration: 1000,
    variant: 'success',
    ...optionProps,
  } as OptionsObject;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.modal + 1,
      color: BACKGROUND,
    },
  }),
);

export const LoadingBackDrop: React.FC<BackdropProps> = (props) => {
  const classes = useStyles();

  return (
    <Backdrop unmountOnExit className={classes.backdrop} {...props}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export const CustomChip = withStyles((theme: Theme) => ({
  root: {
    borderRadius: 64,
    backgroundColor: theme.palette.grey[300],
    margin: 6,
    fontSize: theme.typography.body2.fontSize,
  },
}))(Chip);
