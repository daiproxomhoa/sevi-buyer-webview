import { goBack } from 'connected-react-router';
import { useSnackbar } from 'notistack';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { SUCCESS_CODE } from '../../../constants';
import { AppState } from '../../../redux/reducer';
import { PageWrapper, snackbarSetting } from '../../common/component/elements';
import Header from '../../common/component/Header';
import { setLoadingBackDrop } from '../../common/redux/commonReducer';
import AddAddressForm from '../component/AddAddressForm';
import { IAddresses } from '../model';
import { fetchProfile, updateProfile } from '../redux/profileReducer';

interface Props {}

const AddAddressPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { data } = useSelector((state: AppState) => state.profile);
  const intl = useIntl();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onSubmit = async (values: IAddresses[]) => {
    dispatch(setLoadingBackDrop(true));

    const json = await dispatch(
      updateProfile({ ...data, addresses: data?.addresses ? [...data?.addresses, ...values] : [...values] }),
    );

    dispatch(setLoadingBackDrop(false));

    if (json.status === SUCCESS_CODE) {
      enqueueSnackbar(
        intl.formatMessage({ id: 'update_success' }),
        snackbarSetting((key) => closeSnackbar(key), {}),
      );
      dispatch(fetchProfile());
      dispatch(goBack());
      return;
    }

    enqueueSnackbar(
      intl.formatMessage({ id: 'update_fail' }),
      snackbarSetting((key) => closeSnackbar(key), { variant: 'error' }),
    );
  };

  return (
    <PageWrapper>
      <Header action={() => window.history.back()} title={<FormattedMessage id="profile.addMoreAddress" />} />

      <AddAddressForm onSubmit={(values) => onSubmit(values)} />
    </PageWrapper>
  );
};

export default AddAddressPage;
