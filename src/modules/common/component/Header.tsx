import { AppBar, AppBarProps, Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React, { ReactNode } from 'react';
import { ReactComponent as BackIcon } from '../../../svg/chevron-back.svg';
import { CssIconButton } from './IconButton';

interface Props {
  action?: () => void;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  title?: ReactNode;
  appBarProps?: AppBarProps;
}

const Header = (props: Props) => {
  const { action, title, endAdornment, startAdornment, appBarProps } = props;

  return (
    <AppBar
      position={'sticky'}
      color="inherit"
      elevation={0}
      {...appBarProps}
      style={{
        paddingTop: '16px',
        minHeight: '48px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        ...appBarProps?.style,
      }}
    >
      {startAdornment ? (
        startAdornment
      ) : (
        <CssIconButton color="inherit" onClick={action}>
          <BackIcon />
        </CssIconButton>
      )}
      <Box flex={1} className="overflow-hidden">
        {title ? (
          <Typography variant="subtitle2" className="text-ellipsis">
            {title}
          </Typography>
        ) : (
          <Skeleton variant="text" height={32} />
        )}
      </Box>

      {endAdornment}
    </AppBar>
  );
};

export default Header;
