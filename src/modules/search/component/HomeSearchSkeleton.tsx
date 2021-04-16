import { Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

interface Props {}

const HomeSearchSkeleton = (props: Props) => {
  return (
    <div
      style={{
        margin: "0px 24px 10px",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <Typography variant="h5" style={{ marginRight: "16px" }}>
        <Skeleton width={100} />
      </Typography>

      <Typography variant="h5" style={{ marginRight: "16px" }}>
        <Skeleton width={150} />
      </Typography>

      <Typography variant="h5" style={{ marginRight: "16px" }}>
        <Skeleton width={80} />
      </Typography>

      <Typography variant="h5" style={{ marginRight: "16px" }}>
        <Skeleton width={50} />
      </Typography>

      <Typography variant="h5" style={{ marginRight: "16px" }}>
        <Skeleton width={60} />
      </Typography>

      <Typography variant="h5" style={{ marginRight: "16px" }}>
        <Skeleton width={200} />
      </Typography>
    </div>
  );
};

export default HomeSearchSkeleton;
