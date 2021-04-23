import { Box } from '@material-ui/core';
import React from 'react';
import { some } from '../../../common/constants';
import { IAcceptRequest } from '../../model';
import LoadMoreRequest from '../LoadMoreRequest';
import ResultItemSkeleton from '../ResultItemSkeleton';
import AcceptedRequestResult from './AcceptedRequestResult';

interface Props {
  loading: boolean;
  data?: some[];
  showLoadMore: boolean;
  onLoadMore(): void;
  onConfirm(val: IAcceptRequest): void;
}

const AcceptedRequestBox = (props: Props) => {
  const { loading, data, showLoadMore, onConfirm, onLoadMore } = props;

  return (
    <Box padding="0 24px 24px" flex={1}>
      {data?.map((page) =>
        page.requests?.map((info: IAcceptRequest) => (
          <AcceptedRequestResult key={info.createDate} info={info} onConfirm={onConfirm} />
        )),
      )}

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
        <LoadMoreRequest onLoadMore={onLoadMore} showLoadMore={showLoadMore} />
      )}
    </Box>
  );
};

export default AcceptedRequestBox;
