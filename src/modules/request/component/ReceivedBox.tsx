import { Box, Button, Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import { IAccept } from "../model";
import ReceivedResult from "./ReceivedResult";
import ResultItemSkeleton from "./ResultItemSkeleton";

interface Props {
  loading: boolean;
  acceptedData: IAccept[];
  showLoadMore: boolean;
  onLoadMore(): void;
}

const ReceivedBox = (props: Props) => {
  const { loading, acceptedData, showLoadMore, onLoadMore } = props;

  return (
    <div
      style={{
        flex: 1,
        padding: "0 24px 24px",
      }}
    >
      {acceptedData.map((one) => (
        <ReceivedResult key={one.createDate} info={one} />
      ))}

      {loading ? (
        <>
          <ResultItemSkeleton showButton />
          <ResultItemSkeleton showButton />
          <ResultItemSkeleton showButton />
          <ResultItemSkeleton showButton />
          <ResultItemSkeleton showButton />
          <ResultItemSkeleton showButton />
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

export default ReceivedBox;
