import { goBack } from 'connected-react-router';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { SUCCESS_CODE } from '../../../constants';
import { AppState } from '../../../redux/reducer';
import { PageWrapperNoScroll, snackbarSetting } from '../../common/component/elements';
import { some } from '../../common/constants';
import EditProfileForm from '../component/EditProfileForm';
import HeaderProfile from '../component/HeaderProfile';
import { fetchProfile, setProfileData, updateProfile } from '../redux/profileReducer';

interface Props {}

const EditProfilePage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { data } = useSelector((state: AppState) => state.profile);
  const intl = useIntl();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onSubmit = async (profile: some) => {
    const json = await dispatch(updateProfile(profile));

    if (json.status === SUCCESS_CODE) {
      enqueueSnackbar(
        intl.formatMessage({ id: 'update_success' }),
        snackbarSetting((key) => closeSnackbar(key), {}),
      );

      dispatch(setProfileData(profile));

      dispatch(goBack());
      return;
    }

    enqueueSnackbar(
      intl.formatMessage({ id: 'update_fail' }),
      snackbarSetting((key) => closeSnackbar(key), { variant: 'error' }),
    );
  };

  useEffect(() => {
    if (!data) {
      dispatch(fetchProfile());
    }
  }, [data, dispatch]);

  if (!data) {
    return null;
  }

  return (
    <PageWrapperNoScroll>
      <HeaderProfile title={`${data.familyName} ${data.givenName}`} action={() => dispatch(goBack())} />

      <EditProfileForm profile={data} onSubmit={onSubmit} />
    </PageWrapperNoScroll>
  );
};

export default EditProfilePage;
