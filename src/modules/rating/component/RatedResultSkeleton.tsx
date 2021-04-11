import { Avatar, Box, Divider } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Rating from "@material-ui/lab/Rating";
import React from "react";
import { CardDiv } from "../../common/component/elements";

interface Props {
  isRated?: boolean;
}

const RatedResultSkeleton = (props: Props) => {
  const { isRated } = props;
  return (
    <CardDiv>
      <Skeleton variant="text" width="50%" style={{ height: 26 }} />
      <Divider className="m-t-8 m-b-8" />
      <Box className="d-flex justify-content-between align-items-center m-t-4 m-b-4">
        <Avatar
          alt=""
          src=""
          style={{ width: "28px", height: "28px", marginRight: "8px" }}
        />
        <Box className="flex-1">
          <Skeleton variant="text" width="50%" />
        </Box>
        {isRated ? (
          <Rating readOnly value={0} size="small" />
        ) : (
          <Skeleton variant="text" width="20%" />
        )}
      </Box>
    </CardDiv>
  );
};

export default RatedResultSkeleton;