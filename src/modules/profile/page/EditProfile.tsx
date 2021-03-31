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

  const setAvatar = async (files: FileList | null) => {
    const formData = new FormData();
    console.log("files", files);

    if (files) {
      // Object.values(files).forEach((file) => {
      //   formData.append("Data", files);
      // });
      formData.append("data", files[0]);
    }
    const json = await dispatch(
      fetchThunk(
        API_PATHS.setAvatar,
        "post",
        formData,
        undefined,
        "multipart/form-data"
      )
    );
  };

  const updateProfile = (profile: some) => {
    console.log(profile);
  };

  useEffect(() => {
    if (!data) {
      dispatch(fetchTicketDataAndInsurancePackage());
    }
  }, [dispatch]);
  if (!data) {
    return null;
  }

  return (
    <PageWrapperNoScroll>
      <HeaderProfile
        title={`${data.familyName} ${data.givenName}`}
        action={() => history.goBack()}
      />
      <EditProfileForm
        profile={data}
        setAvatar={setAvatar}
        onSubmit={updateProfile}
      />
    </PageWrapperNoScroll>
  );
};

export default EditProfile;
