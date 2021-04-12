import { Divider, Typography } from "@material-ui/core";
import React from "react";

interface Props {
  title?: string;
}

const RatingDetailItem = (props: Props) => {
  const { title } = props;
  if (!title) {
    return null;
  }
  return (
    <>
      <Typography variant="subtitle2">{title}</Typography>
      <Divider style={{ margin: "8px 0" }} />
    </>
  );
};

export default RatingDetailItem;
