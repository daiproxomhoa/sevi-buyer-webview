import { Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { AppState } from '../../../redux/reducer';
import { PageWrapper } from '../../common/component/elements';
import { RawLink } from '../../common/component/Link';
import { setLoadingBackDrop } from '../../common/redux/commonReducer';
import { fetchThunk } from '../../common/redux/thunk';
import HeaderBox from '../component/HeaderBox';
import LoginForm from '../component/login/LoginForm';
import { ILogin } from '../model';
import { authenIn, setAuthData } from '../redux/authenReducer';

interface ILoginPageProps {
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const { dispatch } = props;
  const { enqueueSnackbar } = useSnackbar();
  const intl = useIntl();

  const onSubmit = React.useCallback(
    async (values: ILogin) => {
      dispatch(setLoadingBackDrop(true));

      const json = await dispatch(fetchThunk(API_PATHS.passwordSignIn, 'post', values));

      dispatch(setLoadingBackDrop(false));

      if (json?.body?.tokenSignature) {
        dispatch(setAuthData({ ...json.body }));
        dispatch(authenIn());
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
        title="welcome"
        caption={
          <Typography variant="body2" color="textSecondary">
            <FormattedMessage id="appBookWork" />
          </Typography>
        }
      />

      <LoginForm onSubmit={onSubmit} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginBottom: '22px',
        }}
      >
        <Typography variant="body2" color="textSecondary">
          <FormattedMessage id="noAccount" />
          &nbsp;
          <RawLink to={ROUTES.signUp}>
            <Typography component="span" variant="body2" color="textPrimary" style={{ fontWeight: 500 }}>
              <FormattedMessage id="register" />
            </Typography>
          </RawLink>
        </Typography>
      </div>
    </PageWrapper>
  );
};

export default connect()(LoginPage);
