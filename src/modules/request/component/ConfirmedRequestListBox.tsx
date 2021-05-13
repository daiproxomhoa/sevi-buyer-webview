import { Box, Typography } from '@material-ui/core';
import { push } from 'connected-react-router';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useSWRInfinite } from 'swr';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { SUCCESS_CODE } from '../../../constants';
import { AppState } from '../../../redux/reducer';
import { ReactComponent as IconNodataRated } from '../../../svg/ic_nodata_rated.svg';
import { ReactComponent as IconNodataUnrated } from '../../../svg/ic_nodata_unrated.svg';
import { fetchThunk } from '../../common/redux/thunk';
import RatingCardSkeleton from '../../rating/component/RatingCardSkeleton';
import { setSessionStamp } from '../../search/redux/searchReducer';
import { IRequest } from '../model';
import ConfirmedRequestResultCard from './ConfirmedRequestResultCard';
import LoadMoreRequest from './LoadMoreRequest';

interface Props {
  mode: 'rated' | 'unrated';
}

const PAGE_SIZE = 20;

const ConfirmedRequestListBox = (props: Props) => {
  const { mode } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [showLoadMore, setShowLoadMore] = React.useState(false);

  const { data, size, setSize, isValidating } = useSWRInfinite(
    (pageIndex) => [API_PATHS.getConfirmed, pageIndex, mode],
    async (url, pageIndex, mode) => {
      const res = await dispatch(fetchThunk(url, 'post', { offset: pageIndex * PAGE_SIZE, ratedFilter: mode }));
      if (res.status !== SUCCESS_CODE) {
        throw new Error(res.status);
      }

      if (res.body.requests.length < PAGE_SIZE) {
        setShowLoadMore(false);
      } else {
        setShowLoadMore(true);
      }

      return {
        requests: res.body.requests,
        pageIndex,
      };
    },
  );

  return (
    <Box className="p-24 p-t-8 overflow-auto flex-1">
      {data?.map((page) =>
        page.requests?.map((one: IRequest) => (
          <ConfirmedRequestResultCard
            key={one.createDate}
            request={one}
            mode={mode}
            onRequestAgain={() => {
              dispatch(setSessionStamp());
              dispatch(
                push({
                  pathname: ROUTES.sendRequest,
                  search: `?sellerId=${one?.sellerId}&avatar=${one.seller.avatar}&name=${one.seller.givenName}&requestAgain=true`,
                }),
              );
            }}
          />
        )),
      )}

      {isValidating && (size !== data?.length || !data[0]?.requests?.length) ? (
        <>
          <RatingCardSkeleton mode={mode} />
          <RatingCardSkeleton mode={mode} />
          <RatingCardSkeleton mode={mode} />
          <RatingCardSkeleton mode={mode} />
          <RatingCardSkeleton mode={mode} />
        </>
      ) : data && data[0]?.requests?.length ? (
        <LoadMoreRequest onLoadMore={() => setSize(size + 1)} showLoadMore={showLoadMore} />
      ) : (
        <Box padding="48px 24px" display="flex" flexDirection="column" alignItems="center">
          {mode === 'unrated' ? <IconNodataUnrated /> : <IconNodataRated />}
          <Typography variant="body2" color="textSecondary" style={{ paddingTop: '8px' }}>
            <FormattedMessage
              id={mode === 'unrated' ? 'request.confirmedNoDataUnrated' : 'request.confirmedNoDataRated'}
            />
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ConfirmedRequestListBox;
