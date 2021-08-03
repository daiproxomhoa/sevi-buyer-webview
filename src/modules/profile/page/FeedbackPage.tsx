import { Button, Dialog, Typography } from '@material-ui/core';
import { goBack } from 'connected-react-router';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../configs/api';
import { SUCCESS_CODE } from '../../../constants';
import { AppState } from '../../../redux/reducer';
import { ReactComponent as IconSuccess } from '../../../svg/ic_rate_success.svg';
import { PageWrapper, snackbarSetting } from '../../common/component/elements';
import Header from '../../common/component/Header';
import { some } from '../../common/constants';
import { setLoadingBackDrop } from '../../common/redux/commonReducer';
import { fetchThunk } from '../../common/redux/thunk';
import FeedbackForm from '../component/FeedbackForm';

interface Props {}

const FeedbackPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const intl = useIntl();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const sendFeedback = async (formData: some) => {
    dispatch(setLoadingBackDrop(true));
    const json = await dispatch(
      fetchThunk(API_PATHS.feedback, 'post', {
        content: formData.feedback,
      }),
    );
    dispatch(setLoadingBackDrop(false));
    if (json.status === SUCCESS_CODE && json.body) {
      setOpen(true);
    } else {
      enqueueSnackbar(
        intl.formatMessage({ id: 'profile.sendFeedbackFail' }),
        snackbarSetting((key) => closeSnackbar(key), { variant: 'error' }),
      );
    }
  };

  const onClose = () => {
    setOpen(false);
    dispatch(goBack());
  };
  return (
    <PageWrapper>
      <Header action={() => window.history.back()} title={<FormattedMessage id="profile.feedback" />} />
      <FeedbackForm onSubmit={sendFeedback} />
      <Dialog
        PaperProps={{
          style: { padding: '48px 32px', textAlign: 'center', alignItems: 'center', width: '100%', maxWidth: 300 },
        }}
        maxWidth="lg"
        open={open}
        onClose={onClose}
      >
        <IconSuccess />

        <Typography variant="subtitle2" style={{ paddingTop: '24px' }}>
          <FormattedMessage id="profile.success" />
        </Typography>

        <Typography variant="body2" color="textSecondary" style={{ paddingTop: '12px', paddingBottom: '24px' }}>
          <FormattedMessage id="profile.sendFeedbackSuccess" values={{ br: <br /> }} />
        </Typography>

        <Button variant="contained" color="primary" size="large" fullWidth onClick={onClose}>
          <FormattedMessage id="ok" />
        </Button>
      </Dialog>
    </PageWrapper>
  );
};

export default FeedbackPage;
