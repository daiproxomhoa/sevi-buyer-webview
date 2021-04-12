import { Avatar, fade, ListItem, Typography } from "@material-ui/core";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import React from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { API_PATHS } from "../../../configs/api";
import { LIGHT_GREY, PRIMARY, SECONDARY } from "../../../configs/colors";
import { ISeller } from "../model";

interface Props {
  info: ISeller;
  onSelect(): void;
}

const SearchResultItem = (props: Props) => {
  const { info, onSelect } = props;
  return (
    <ListItem
      button
      style={{
        backgroundColor: LIGHT_GREY,
        display: "flex",
        padding: "12px",
        margin: "0px 0px 12px",
        borderRadius: "12px",
        alignItems: "flex-start",
      }}
      onClick={onSelect}
    >
      <Avatar
        alt={info.givenName}
        src={API_PATHS.renderSellerAvatar(info.id, info.avatar)}
        style={{ width: "40px", height: "40px" }}
      />
      <div
        style={{ display: "flex", flexDirection: "column", marginLeft: "8px" }}
      >
        <Typography variant="body2" style={{ fontWeight: 500 }}>
          {info.givenName}&nbsp;{info.familyName}
        </Typography>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              backgroundColor: fade(PRIMARY, 0.1),
              height: "20px",
              minWidth: "52px",
              borderRadius: "500px",
              display: "flex",
              alignItems: "center",
              marginRight: "4px",
            }}
          >
            <GradeRoundedIcon
              color="primary"
              style={{
                fontSize: "14px",
                marginRight: "3px",
                marginLeft: "8px",
              }}
            />
            <Typography
              variant="body2"
              color="primary"
              style={{ marginRight: "8px" }}
            >
              {info.rating}
            </Typography>
          </div>
          <Typography variant="caption" color="textSecondary">
            <Typography
              component="span"
              variant="caption"
              style={{ color: SECONDARY }}
            >
              <FormattedNumber value={info.ratingCount} />
            </Typography>
            &nbsp;
            <FormattedMessage id="review" />
          </Typography>
        </div>
        <Typography variant="caption" color="textPrimary">
          {info.desc}
        </Typography>
      </div>
    </ListItem>
  );
};

export default SearchResultItem;
