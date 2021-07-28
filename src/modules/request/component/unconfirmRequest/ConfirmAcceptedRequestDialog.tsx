import { Dialog, Typography, Button } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { DATE_TIME_FORMAT, FE_DATE_TIME_FORMAT } from '../../../../models/moment';
import { some } from '../../../common/constants';
import { getFullName } from '../../../rating/utils';

interface Props {
  open: boolean;
  onClose(): void;
  onSubmit(): void;
  requestDetail?: some;
}

const ConfirmAcceptedRequestDialog = (props: Props) => {
  const { open, onSubmit, onClose, requestDetail } = props;
  console.log('requestDetail', requestDetail);

  return (
    <Dialog PaperProps={{ style: { padding: '48px 32px 16px' } }} open={open} onClose={onClose}>
      <Typography variant="subtitle2">
        <FormattedMessage id="request.confirmRequest" />
      </Typography>
      <Typography variant="body2" style={{ paddingTop: 24, paddingBottom: 8 }}>
        <FormattedMessage id="seller" />
        :&nbsp; {getFullName(requestDetail?.seller)}
      </Typography>
      <Typography variant="body2" style={{ paddingTop: 8, paddingBottom: 8 }}>
        <FormattedMessage id="job" />
        :&nbsp; {requestDetail?.desc}
      </Typography>
      <Typography variant="body2" style={{ paddingTop: 8, paddingBottom: 8 }}>
        <FormattedMessage id="time" />
        :&nbsp; {moment(`${requestDetail?.date} ${requestDetail?.time}`, DATE_TIME_FORMAT).format(FE_DATE_TIME_FORMAT)}
      </Typography>
      <Typography variant="body2" color="textSecondary" style={{ paddingTop: 8, paddingBottom: 8 }}>
        <FormattedMessage id="request.confirmRequestDes" />
      </Typography>
      <Button variant="contained" color="primary" onClick={onSubmit}>
        <FormattedMessage id="ok" />
      </Button>
      <Button variant="text" onClick={onClose} className={'m-t-8'}>
        <FormattedMessage id="cancel" />
      </Button>
    </Dialog>
  );
};

export default ConfirmAcceptedRequestDialog;
