import { Avatar, Divider, Typography } from "@material-ui/core";
import React from "react";

interface Props {}

const RequestResultItem = (props: Props) => {
  return (
    <>
      <Typography variant="subtitle2">Sửa điều hòa phòng của Bí Ngô</Typography>
      <Divider style={{ margin: "8px 0" }} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            alt=""
            src=""
            style={{ width: "28px", height: "28px", marginRight: "8px" }}
          />
          <Typography variant="caption">Xuân Hòa</Typography>
        </div>
        <Typography variant="caption" color="textSecondary">
          22/04/2021
        </Typography>
      </div>
    </>
  );
};

export default RequestResultItem;
