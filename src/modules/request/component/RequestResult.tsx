import { Avatar, Divider, fade, Typography } from "@material-ui/core";
import React from "react";
import { BLACK_TEXT, LIGHT_GREY } from "../../../configs/colors";

interface Props {}

const RequestResult = (props: Props) => {
  return (
    <div
      style={{
        borderRadius: "12px",
        backgroundColor: LIGHT_GREY,
        padding: "12px",
        marginTop: "12px",
      }}
    >
      <Typography variant="subtitle2">Sửa điều hòa phòng của Bí Ngô</Typography>
      <Typography variant="body2" style={{ color: fade(BLACK_TEXT, 0.64) }}>
        Điều hòa phòng của bé đã lâu ngày không vệ sinh công suất bị giảm.
      </Typography>
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
    </div>
  );
};

export default RequestResult;
