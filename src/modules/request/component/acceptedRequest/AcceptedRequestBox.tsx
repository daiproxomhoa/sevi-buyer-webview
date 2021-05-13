import { Box } from '@material-ui/core';
import React from 'react';
import { some } from '../../../common/constants';
import { IRequest } from '../../model';
import LoadMoreRequest from '../LoadMoreRequest';
import ResultItemInfo from '../ResultItemInfo';
import ResultItemSkeleton from '../ResultItemSkeleton';

interface Props {
  loading: boolean;
  data?: some[];
  showLoadMore: boolean;
  onLoadMore(): void;
  onConfirm(val: IRequest): void;
  onViewRequestDetail(data: IRequest): void;
}

const AcceptedRequestBox = (props: Props) => {
  const { loading, data, showLoadMore, onConfirm, onLoadMore, onViewRequestDetail } = props;

  return (
    <Box padding="0 24px 24px" flex={1}>
      {data?.map((page) =>
        page.requests?.map((info: IRequest) => (
          <ResultItemInfo
            key={info.createDate}
            info={info}
            onConfirm={onConfirm}
            onViewRequestDetail={() => onViewRequestDetail(info)}
          />
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
