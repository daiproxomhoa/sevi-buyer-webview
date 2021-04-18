import { Avatar, Divider, Typography } from "@material-ui/core";
import React from "react";
import { API_PATHS } from "../../../configs/api";
import { IRequest } from "../model";

interface Props {
  info: IRequest;
}

const ResultItemInfo = (props: Props) => {
  const { info } = props;

  return (
    <>
      <Typography variant="subtitle2">{info.desc}</Typography>
      <Divider style={{ margin: "8px 0", width: "100%" }} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Avatar
            alt={info.seller.givenName}
            src={API_PATHS.renderSellerAvatar(
              info.seller.id,
              info.seller.avatar
            )}
            style={{ width: "28px", height: "28px", marginRight: "8px" }}
          />
          <Typography variant="caption">
            {info.seller.givenName}&nbsp;{info.seller.familyName}
          </Typography>
        </div>
        <Typography variant="caption" color="textSecondary">
          {info.date}
        </Typography>
      </div>
    </>
  );
};

export default ResultItemInfo;
