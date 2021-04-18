import { Box, Button, Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import { IRequest } from "../model";
import RequestResult from "./RequestResult";
import ResultItemSkeleton from "./ResultItemSkeleton";

interface Props {
  loading: boolean;
  requestingData: IRequest[];
  showLoadMore: boolean;
  onLoadMore(): void;
}

const RequestingBox = (props: Props) => {
  const { loading, requestingData, showLoadMore, onLoadMore } = props;

  return (
    <div
      style={{
        flex: 1,
        padding: "0 24px 24px",
      }}
    >
      {requestingData.map((one) => (
        <RequestResult key={one.createDate} info={one} />
      ))}

      {loading ? (
        <>
          <ResultItemSkeleton />
          <ResultItemSkeleton />
          <ResultItemSkeleton />
          <ResultItemSkeleton />
          <ResultItemSkeleton />
          <ResultItemSkeleton />
        </>
      ) : (
        <Box
          className="justify-content-center justify-content-center"
          style={{ display: !showLoadMore ? "none" : "flex" }}
        >
          <Button
            variant="outlined"
            color="primary"
            size="small"
            style={{
              marginBottom: 80,
              marginTop: 16,
              padding: "0px 16px",
            }}
            onClick={onLoadMore}
          >
            <Typography variant="caption">
              <FormattedMessage id="loadMore" />
            </Typography>
          </Button>
        </Box>
      )}
    </div>
  );
};

export default RequestingBox;
