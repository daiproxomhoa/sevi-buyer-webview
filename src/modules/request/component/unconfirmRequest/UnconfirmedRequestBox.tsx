import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { some } from '../../../common/constants';
import { IRequest } from '../../model';
import LoadMoreRequest from '../LoadMoreRequest';
import ResultItemInfo from '../ResultItemInfo';
import ResultItemSkeleton from '../ResultItemSkeleton';
import { ReactComponent as IconNodataRequesting } from '../../../../svg/ic_nodata_requesting.svg';
import { ReactComponent as IconNodataAccepted } from '../../../../svg/ic_nodata_accepted.svg';

interface Props {
  isValidating: boolean;
  size: number;
  accept: boolean;
  data?: some[];
  showLoadMore: boolean;
  onLoadMore(): void;
  onConfirm(val: IRequest): void;
  onViewRequestDetail(data: IRequest): void;
}

const UnconfirmedRequestBox = (props: Props) => {
  const { isValidating, size, accept, data, showLoadMore, onConfirm, onLoadMore, onViewRequestDetail } = props;

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

      {isValidating && (size !== data?.length || !data[0]?.requests?.length) ? (
        <>
          <ResultItemSkeleton showButton />
          <ResultItemSkeleton showButton />
          <ResultItemSkeleton showButton />
          <ResultItemSkeleton showButton />
          <ResultItemSkeleton showButton />
          <ResultItemSkeleton showButton />
        </>
      ) : data && data[0]?.requests?.length ? (
        <LoadMoreRequest onLoadMore={onLoadMore} showLoadMore={showLoadMore} />
      ) : (
        <Box padding="48px 24px" display="flex" flexDirection="column" alignItems="center">
          {accept ? <IconNodataAccepted /> : <IconNodataRequesting />}
          <Typography variant="body2" color="textSecondary" style={{ paddingTop: '8px' }}>
            <FormattedMessage
              id={accept ? 'request.unconfirmedNoDataAccepted' : 'request.unconfirmedNoDataRequesting'}
            />
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default UnconfirmedRequestBox;
