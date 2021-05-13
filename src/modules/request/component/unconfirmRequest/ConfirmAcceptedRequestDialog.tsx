import { Dialog, Typography, Button } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
  open: boolean;
  onClose(): void;
  onSubmit(): void;
}

const ConfirmAcceptedRequestDialog = (props: Props) => {
  const { open, onSubmit, onClose } = props;

  return (
    <Dialog PaperProps={{ style: { padding: '48px 32px', textAlign: 'center' } }} open={open} onClose={onClose}>
      <Typography variant="subtitle2">
        <FormattedMessage id="request.confirmRequest" />
      </Typography>

      <Typography variant="body2" color="textSecondary" style={{ paddingTop: '12px', paddingBottom: '24px' }}>
        <FormattedMessage id="request.confirmRequestDes" />
      </Typography>

      <Button variant="contained" color="primary" onClick={onSubmit}>
        <FormattedMessage id="ok" />
      </Button>
    </Dialog>
  );
};

export default ConfirmAcceptedRequestDialog;
