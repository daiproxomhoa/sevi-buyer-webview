import { Typography } from '@material-ui/core';
import { push } from 'connected-react-router';
import { useSnackbar } from 'notistack';
import queryString from 'query-string';
import React, { useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { AppState } from '../../../redux/reducer';
import { PageWrapper } from '../../common/component/elements';
import { RESPONSE_STATUS } from '../../common/constants';
import { setLoadingBackDrop } from '../../common/redux/commonReducer';
import { fetchThunk } from '../../common/redux/thunk';
import HeaderBox from '../component/HeaderBox';
import Footer from '../component/signUp/Footer';
import SignUpForm from '../component/signUp/SignUpForm';
import { ISignUp } from '../model';

interface ISignUpPageProps {}

const SignUpPage: React.FunctionComponent<ISignUpPageProps> = (props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { enqueueSnackbar } = useSnackbar();
  const intl = useIntl();

  const onSubmit = useCallback(
    async (values: ISignUp) => {
      dispatch(setLoadingBackDrop(true));
      const json = await dispatch(fetchThunk(`${API_PATHS.otp}?id=${values.id}`, 'post'));
      dispatch(setLoadingBackDrop(false));
      if (json?.status === RESPONSE_STATUS.SUCCESS) {
        dispatch(
          push({
            pathname: ROUTES.verifyOtp,
            search: queryString.stringify(values),
          }),
        );
        return;
      }

      enqueueSnackbar(intl.formatMessage({ id: `auth.${json?.body?.status}` }), {
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
        variant: 'error',
      });
    },
    [dispatch, enqueueSnackbar, intl],
  );

  return (
    <PageWrapper>
      <HeaderBox
        title="registerAccount"
        caption={
          <Typography variant="body2" color="textSecondary">
            <FormattedMessage id="registerNow" />
          </Typography>
        }
      />

      <SignUpForm onSubmit={onSubmit} />

      <Footer />
    </PageWrapper>
  );
};

export default SignUpPage;
