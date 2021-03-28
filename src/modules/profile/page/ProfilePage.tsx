import { AppBar, Box } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PageWrapperNoScroll } from "../../common/component/elements";
import { some } from "../../common/constants";
import HeaderProfile from "../component/HeaderProfile";
import InfoBox from "../component/InfoBox";
import { fakeDataProfile } from "../constants";

interface Props {}

const ProfilePage = (props: Props) => {
  const history = useHistory();

  const [profile, setProfileData] = useState<some>();

  const fetchProfile = useCallback(async () => {
    new Promise((resolve) => setTimeout(resolve, 3000));
    setProfileData(fakeDataProfile);
  }, []);

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!profile) {
    return null;
  }
  return (
    <PageWrapperNoScroll>
      <HeaderProfile title={profile.name} />
      <Box className="p-24 p-t-8 overflow-auto">
        <InfoBox profile={profile} />
      </Box>
    </PageWrapperNoScroll>
  );
};

export default ProfilePage;
