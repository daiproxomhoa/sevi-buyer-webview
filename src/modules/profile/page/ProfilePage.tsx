import { Box } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../configs/api';
import { AppState } from '../../../redux/reducer';
import { PageWrapper } from '../../common/component/elements';
import HeaderProfile from '../component/HeaderProfile';
import InfoBox from '../component/InfoBox';
import { fetchProfile } from '../redux/profileReducer';
import MyReviewPage from './MyReviewPage';

interface Props {}

const ProfilePage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { data, loading } = useSelector((state: AppState) => state.profile);

  useEffect(() => {
    if (!data) {
      dispatch(fetchProfile());
    }
  }, [dispatch, data]);

  return (
    <PageWrapper>
      <HeaderProfile
        title={data && `${data.familyName} ${data.givenName}`}
        avatar={API_PATHS.renderAvatar(data?.id, data?.avatar)}
      />
      <Box className="p-24 p-t-8 overflow-auto">
        <InfoBox profile={data} loading={loading} />
        <MyReviewPage />
      </Box>
    </PageWrapper>
  );
};

export default ProfilePage;
