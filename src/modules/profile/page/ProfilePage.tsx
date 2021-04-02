import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { API_PATHS } from "../../../configs/api";
import { AppState } from "../../../redux/reducer";
import { PageWrapperNoScroll } from "../../common/component/elements";
import LoadingIcon from "../../common/component/LoadingIcon";
import HeaderProfile from "../component/HeaderProfile";
import InfoBox from "../component/InfoBox";
import { fetchTicketDataAndInsurancePackage } from "../redux/profileReducer";

interface Props {}

const ProfilePage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { data, loading } = useSelector((state: AppState) => state.profile);

  useEffect(() => {
    if (!data) {
      dispatch(fetchTicketDataAndInsurancePackage());
    }
  }, [dispatch, data]);

  if (loading) {
    return <LoadingIcon />;
  }
  if (!data) {
    return null;
  }
  return (
    <PageWrapperNoScroll>
      <HeaderProfile
        title={`${data.familyName} ${data.givenName}`}
        avatar={API_PATHS.renderAvatar(data.avatar)}
      />
      <Box className="p-24 p-t-8 overflow-auto">
        <InfoBox profile={data} />
      </Box>
    </PageWrapperNoScroll>
  );
};

export default ProfilePage;