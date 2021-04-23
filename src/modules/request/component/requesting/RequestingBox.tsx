import { Box } from '@material-ui/core';
import React from 'react';
import { some } from '../../../common/constants';
import { IRequest } from '../../model';
import LoadMoreRequest from '../LoadMoreRequest';
import ResultItemSkeleton from '../ResultItemSkeleton';
import RequestResult from './RequestResult';

interface Props {
  loading: boolean;
  data?: some[];
  showLoadMore: boolean;
  onLoadMore(): void;
  onViewRequestDetail(data: IRequest): void;
}

const RequestingBox = (props: Props) => {
  const { loading, data, showLoadMore, onLoadMore, onViewRequestDetail } = props;
  return (
    <Box flex={1} padding="0 24px 24px">
      {data?.map((page) =>
        page.requests?.map((one: IRequest) => (
          <RequestResult key={one.createDate} info={one} onViewRequestDetail={() => onViewRequestDetail(one)} />
        )),
      )}

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
        <LoadMoreRequest onLoadMore={onLoadMore} showLoadMore={showLoadMore} />
      )}
    </Box>
  );
};

export default RequestingBox;
