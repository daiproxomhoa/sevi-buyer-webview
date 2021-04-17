import { Box, Button, Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import { some } from "../../common/constants";
import PendingRateResultCard from "./PendingRateResultCard";
import RatingCardSkeleton from "./RatingCardSkeleton";

interface Props {
  data?: some;
  loading: boolean;
  disableLoadMore: boolean;
  setPage: () => void;
  mode: "rated" | "unrated";
}
const PendingRateBox = (props: Props) => {
  const { mode, data, loading, setPage, disableLoadMore } = props;

  return (
    <Box className="p-24 p-t-8 overflow-auto flex-1">
      {data?.requests?.map((request: some, index: number) => {
        return (
          <PendingRateResultCard key={index} request={request} mode={mode} />
        );
      })}
      {loading ? (
        <>
          <RatingCardSkeleton mode={mode} />
          <RatingCardSkeleton mode={mode} />
        </>
      ) : (
        <Box className="d-flex justify-content-center justify-content-center">
          <Button
            variant="outlined"
            color="primary"
            size="small"
            style={{
              marginBottom: 80,
              marginTop: 16,
              padding: "0px 16px",
            }}
            onClick={setPage}
            disabled={disableLoadMore}
          >
            <Typography variant="caption">
              <FormattedMessage id="loadMore" />
            </Typography>
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PendingRateBox;
