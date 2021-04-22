import { Box } from '@material-ui/core';
import React from 'react';
import { some } from '../../../common/constants';
import { IAccept } from '../../model';
import LoadMoreRequest from '../LoadMoreRequest';
import ResultItemSkeleton from '../ResultItemSkeleton';
import ReceivedResult from './ReceivedResult';

interface Props {
  loading: boolean;
  data?: some[];
  showLoadMore: boolean;
  onLoadMore(): void;
}

const ReceivedBox = (props: Props) => {
  const { loading, data, showLoadMore, onLoadMore } = props;

  return (
    <Box padding="0 24px 24px" flex={1}>
      {data?.map((arr) => arr?.map((info: IAccept) => <ReceivedResult key={info.createDate} info={info} />))}

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

export default ReceivedBox;
