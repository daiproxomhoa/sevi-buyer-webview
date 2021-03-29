import { Divider, Typography } from "@material-ui/core";
import React from "react";

interface Props {}

const RatingDetailItem = (props: Props) => {
  return (
    <>
      <Typography variant="subtitle2">Sửa điều hòa phòng của Bí Ngô</Typography>
      <Divider style={{ margin: "8px 0" }} />
    </>
  );
};

export default RatingDetailItem;
