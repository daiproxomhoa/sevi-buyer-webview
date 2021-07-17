import { Button, Dialog, Typography } from '@material-ui/core';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import { push } from 'connected-react-router';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from '../../../configs/routes';
import { AppState } from '../../../redux/reducer';

interface Props {}

const UpdateAddressDialogWaring = (props: Props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const openDialog = useSelector((state: AppState) => state.profile.open);
  return (
    <Dialog
      PaperProps={{ style: { padding: '48px 32px 16px', textAlign: 'center', alignItems: 'center' } }}
      open={open && openDialog}
      onClose={() => {
        setOpen(true);
      }}
    >
      <WarningRoundedIcon color="error" style={{ height: 120, width: 120 }} />
      <Typography variant="body2" style={{ paddingTop: '12px', paddingBottom: '24px' }}>
        <FormattedMessage id="profile.updateAddressWaring" />
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        onClick={() => {
          setOpen(false);
          dispatch(push(ROUTES.editProfile));
        }}
      >
        <FormattedMessage id="ok" />
      </Button>
      <Button
        variant="text"
        size="large"
        fullWidth
        onClick={() => {
          setOpen(false);
        }}
      >
        <FormattedMessage id="cancel" />
      </Button>
    </Dialog>
  );
};

export default UpdateAddressDialogWaring;
