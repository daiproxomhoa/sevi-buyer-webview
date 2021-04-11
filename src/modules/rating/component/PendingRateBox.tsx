import { Box, Button, Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import { some } from "../../common/constants";
import PendingRateBoxSkeleton from "./PendingRateBoxSkeleton";
import PendingRateResult from "./PendingRateResult";

interface Props {
  data?: some;
  loading: boolean;
  setPage: () => void;
}
const PendingRateBox = (props: Props) => {
  const { data = {}, loading, setPage } = props;
  return (
    <Box className="p-24 p-t-8 overflow-auto flex-1">
      <PendingRateResult />
      <PendingRateBoxSkeleton />
      {loading ? (
        <>
          <PendingRateBoxSkeleton />
          <PendingRateBoxSkeleton />
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
