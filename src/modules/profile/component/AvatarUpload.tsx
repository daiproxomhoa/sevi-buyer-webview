import { Avatar, Box, IconButton } from "@material-ui/core";
import React, { useRef, useState } from "react";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { ThunkAction } from "redux-thunk";
import { some } from "../../common/constants";
import { AppState } from "../../../redux/reducer";
import { Action } from "redux";
import { fetchThunk } from "../../common/redux/thunk";
import { API_PATHS } from "../../../configs/api";
import { useDispatch } from "react-redux";

interface Props {
  src?: string;
  onChange?: (value: string) => void;
}

const AvatarUpload = (props: Props) => {
  const { src, onChange } = props;
  const dispatch = useDispatch();

  const setAvatar = (files: FileList | null) => {
    const formData = new FormData();
    if (files) {
      Object.values(files).forEach((file) => {
        formData.append("files", file);
      });
    }
    const json = dispatch(fetchThunk(API_PATHS.setAvatar, "post", formData));
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
