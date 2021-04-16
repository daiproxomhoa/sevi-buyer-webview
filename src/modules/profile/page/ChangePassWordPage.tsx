import { goBack } from "connected-react-router";
import { useSnackbar } from "notistack";
import React from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
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
import { setLoadingBackDrop } from "../../common/redux/commonReducer";
import { fetchThunk } from "../../common/redux/thunk";
import ChangePasswordForm from "../component/ChangePasswordForm";
import HeaderProfile from "../component/HeaderProfile";

interface Props {}

const ChangePassWordPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const intl = useIntl();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const changePassword = async (formData: some) => {
    dispatch(setLoadingBackDrop(true));
    const json = await dispatch(
      fetchThunk(API_PATHS.changePassword, "post", {
        newPassword: formData.newPassword,
        oldPassword: formData.oldPassword,
      })
    );
    dispatch(setLoadingBackDrop(false));
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

  return (
    <PageWrapperNoScroll>
      <HeaderProfile
        title={intl.formatMessage({ id: "profile.changePassword" })}
        action={() => dispatch(goBack())}
      />
      <ChangePasswordForm onSubmit={changePassword} />
    </PageWrapperNoScroll>
  );
};

export default ChangePassWordPage;
