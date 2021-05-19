import { Box, Button, Dialog, DialogProps, makeStyles, Typography } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles(() => ({
  paper: {
    minWidth: 250,
    textAlign: 'center',
    padding: '16px 24px',
    alignItems: 'center',
  },
  button: { minWidth: 200 },
}));
interface Props {
  children?: (open: () => void, onClose: () => void) => React.ReactNode;
  title?: React.ReactNode | string;
  content?: React.ReactNode | string;
  dialogProps?: DialogProps;
  ok?: (open: () => void, onClose: () => void) => void;
  cancel?: (open: () => void, onClose: () => void) => void;
  okId?: string;
  cancelId?: string;
}

const ConfirmDialog = (props: Props) => {
  const { children, title, content, dialogProps, ok, cancel, okId, cancelId } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  if (!children) {
    return null;
  }
  return (
    <>
      {children && children(onOpen, onClose)}
      <Dialog
        {...dialogProps}
        open={open}
        onClose={() => setOpen(false)}
        classes={{ paper: classes.paper, ...dialogProps?.classes }}
      >
        {typeof title === 'string' ? (
          <Typography variant="h6">
            <FormattedMessage id={title} />
          </Typography>
        ) : (
          title
        )}
        {typeof content === 'string' ? (
          <Box marginTop={1.5}>
            <Typography variant="body2">
              <FormattedMessage id={content} />
            </Typography>
          </Box>
        ) : (
          content
        )}
        <Box marginTop={3}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            classes={{ root: classes.button }}
            onClick={() => {
              if (ok) {
                ok(onOpen, onClose);
              }
            }}
          >
            <Typography variant="body1">
              <FormattedMessage id={okId || 'ok'} />
            </Typography>
          </Button>
          <Button
            variant="text"
            size="large"
            classes={{ root: classes.button }}
            className={'m-t-8'}
            onClick={() => {
              cancel ? cancel(onOpen, onClose) : setOpen(false);
            }}
          >
            <Typography variant="body1">
              <FormattedMessage id={cancelId || 'cancel'} />
            </Typography>
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default ConfirmDialog;
