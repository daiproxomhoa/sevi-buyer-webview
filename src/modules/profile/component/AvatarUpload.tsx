import { Avatar, Box, IconButton } from "@material-ui/core";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import React from "react";
import { useDispatch } from "react-redux";

interface Props {
  src?: string;
  onChange?: (files: FileList | null) => void;
}

const AvatarUpload = (props: Props) => {
  const { src, onChange } = props;
  const dispatch = useDispatch();

  return (
    <Box>
      <IconButton style={{ padding: 0 }} component="label">
        <Avatar src={src} style={{ height: 100, width: 100 }} />
        <input
          accept="image/*"
          hidden
          type="file"
          onChange={(e) => {
            onChange && onChange(e.target.files);
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
