import { Avatar, Box, IconButton } from "@material-ui/core";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import React from "react";
import { useDispatch } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { API_PATHS } from "../../../configs/api";
import { SUCCESS_CODE } from "../../../constants";
import { AppState } from "../../../redux/reducer";
import { fetchThunk } from "../../common/redux/thunk";

interface Props {
  src?: string;
  onChange?: (avatar: string) => void;
}

const AvatarUpload = (props: Props) => {
  const { src, onChange } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const setAvatar = async (files: FileList | null) => {
    const formData = new FormData();
    if (files) {
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
    console.log("json", json);

    if (json.status === SUCCESS_CODE) {
      onChange && onChange(json.body);
    }
  };
  return (
    <Box>
      <IconButton style={{ padding: 0 }} component="label">
        <Avatar src={src} style={{ height: 100, width: 100 }} />
        <input
          accept="image/*"
          hidden
          type="file"
          onChange={(e) => {
            setAvatar(e.target.files);
          }}
        />
        <CameraAltIcon
          className={"svgFillAll"}
          style={{
            height: 16,
            width: 16,
            position: "absolute",
            bottom: 4,
            fill: "white",
          }}
        />
      </IconButton>
    </Box>
  );
};

export default AvatarUpload;
