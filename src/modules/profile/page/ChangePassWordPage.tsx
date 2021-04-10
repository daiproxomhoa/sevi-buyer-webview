import { goBack } from "connected-react-router";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { API_PATHS } from "../../../configs/api";
import { SUCCESS_CODE } from "../../../constants";
import { AppState } from "../../../redux/reducer";
import {
  LoadingBackDrop,
  PageWrapperNoScroll,
  snackbarSetting,
} from "../../common/component/elements";
import { some } from "../../common/constants";
import { fetchThunk } from "../../common/redux/thunk";
import ChangePasswordForm from "../component/ChangePasswordForm";
import HeaderProfile from "../component/HeaderProfile";
import { fetchProfile } from "../redux/profileReducer";

interface Props {}

const ChangePassWordPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { data } = useSelector((state: AppState) => state.profile);
  const history = useHistory();
  const intl = useIntl();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);

  const changePassword = async (formData: some) => {
    setLoading(true);
    const json = await dispatch(
      fetchThunk(
        API_PATHS.setPassword,
        "post",
        JSON.stringify({ id: formData.id, password: formData.newPassword })
      )
    );
    setLoading(false);
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
      <HeaderProfile
        title={intl.formatMessage({ id: "profile.changePassword" })}
        action={() => history.goBack()}
      />
      <ChangePasswordForm profile={data} onSubmit={changePassword} />
      <LoadingBackDrop open={loading} />
    </PageWrapperNoScroll>
  );
};

export default ChangePassWordPage;
