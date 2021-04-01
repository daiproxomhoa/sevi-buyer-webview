import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { API_PATHS } from "../../../configs/api";
import { AppState } from "../../../redux/reducer";
import { PageWrapperNoScroll } from "../../common/component/elements";
import { some } from "../../common/constants";
import { fetchThunk } from "../../common/redux/thunk";
import EditProfileForm from "../component/EditProfileForm";
import HeaderProfile from "../component/HeaderProfile";
import { fetchTicketDataAndInsurancePackage } from "../redux/profileReducer";

interface Props {}

const EditProfile = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { data, loading } = useSelector((state: AppState) => state.profile);
  const history = useHistory();

  const updateProfile = (profile: some) => {
    dispatch(fetchTicketDataAndInsurancePackage());
  };

  useEffect(() => {
    if (!data) {
      dispatch(fetchTicketDataAndInsurancePackage());
    }
  }, [data, dispatch]);

  if (!data) {
    return null;
  }

  return (
    <PageWrapperNoScroll>
      <HeaderProfile
        title={`${data.familyName} ${data.givenName}`}
        action={() => history.goBack()}
      />
      <EditProfileForm profile={data} onSubmit={updateProfile} />
    </PageWrapperNoScroll>
  );
};

export default EditProfile;
