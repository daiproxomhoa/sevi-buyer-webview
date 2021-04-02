import { goBack } from "connected-react-router";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { API_PATHS } from "../../../configs/api";
import { SUCCESS_CODE } from "../../../constants";
import { AppState } from "../../../redux/reducer";
import {
  PageWrapperNoScroll,
  snackbarSetting,
} from "../../common/component/elements";
import { some } from "../../common/constants";
import { fetchThunk } from "../../common/redux/thunk";
import EditProfileForm from "../component/EditProfileForm";
import HeaderProfile from "../component/HeaderProfile";
import { fetchTicketDataAndInsurancePackage } from "../redux/profileReducer";
import { setData } from "../redux/profileReducer";

interface Props {}

const EditProfile = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { data, loading } = useSelector((state: AppState) => state.profile);
  const history = useHistory();
  const intl = useIntl();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const updateProfile = async (profile: some) => {
    const json = await dispatch(
      fetchThunk(API_PATHS.updateProfile, "post", JSON.stringify(profile))
    );
    if (json.status === SUCCESS_CODE) {
      enqueueSnackbar(
        intl.formatMessage({ id: "update_success" }),
        snackbarSetting((key) => closeSnackbar(key), {})
      );
      dispatch(goBack());
    } else {
      enqueueSnackbar(
        intl.formatMessage({ id: "update_fail" }),
        snackbarSetting((key) => closeSnackbar(key), { color: "error" })
      );
    }
    dispatch(setData(profile));
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
