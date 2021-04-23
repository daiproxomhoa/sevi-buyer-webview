import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
  showLoadMore: boolean;
  onLoadMore(): void;
}

const LoadMoreRequest = (props: Props) => {
  const { showLoadMore, onLoadMore } = props;

  return (
    <Box textAlign="center" paddingTop={2} paddingBottom={6}>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        style={{
          padding: '0px 16px',
        }}
        disabled={!showLoadMore}
        onClick={onLoadMore}
      >
        <Typography variant="caption">
          <FormattedMessage id="loadMore" />
        </Typography>
      </Button>
    </Box>
  );
};

export default LoadMoreRequest;
