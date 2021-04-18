import { Avatar, Button, Divider, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { CardDiv } from "../../common/component/elements";

interface Props {
  showButton?: boolean;
}

const ResultItemSkeleton = (props: Props) => {
  const { showButton } = props;

  return (
    <CardDiv>
      <Typography variant="subtitle2">
        <Skeleton width={250} />
      </Typography>
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
            alt=""
            style={{ width: "28px", height: "28px", marginRight: "8px" }}
          />
          <Typography variant="caption">
            <Skeleton width={150} />
          </Typography>
        </div>
        <Typography variant="caption" color="textSecondary">
          <Skeleton width={80} />
        </Typography>
      </div>

      {showButton && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
          }}
        >
          <Button
            fullWidth
            variant="contained"
            size="small"
            style={{ marginRight: "4px" }}
            disabled={true}
          ></Button>

          <Button
            fullWidth
            variant="contained"
            size="small"
            style={{ marginLeft: "4px" }}
            disabled={true}
          ></Button>
        </div>
      )}
    </CardDiv>
  );
};

export default ResultItemSkeleton;
