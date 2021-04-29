import { Box } from '@material-ui/core';
import { push } from 'connected-react-router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useSWRInfinite } from 'swr';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { SUCCESS_CODE } from '../../../constants';
import { AppState } from '../../../redux/reducer';
import { some } from '../../common/constants';
import { fetchThunk } from '../../common/redux/thunk';
import RatingCardSkeleton from '../../rating/component/RatingCardSkeleton';
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
      const res = await dispatch(fetchThunk(url, 'post', { offset: pageIndex * PAGE_SIZE, ratingFilter: mode }));
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
        page.requests?.map((one: some) => (
          <ConfirmedRequestResultCard
            key={one.createDate}
            request={one}
            mode={mode}
            onRequestAgain={() =>
              dispatch(
                push({
                  pathname: ROUTES.sendRequest,
                  search: `?id=${one?.sellerId}`,
                }),
              )
            }
          />
        )),
      )}
      {isValidating && size !== data?.length ? (
        <>
          <RatingCardSkeleton mode={mode} />
          <RatingCardSkeleton mode={mode} />
          <RatingCardSkeleton mode={mode} />
          <RatingCardSkeleton mode={mode} />
          <RatingCardSkeleton mode={mode} />
        </>
      ) : (
        <LoadMoreRequest onLoadMore={() => setSize(size + 1)} showLoadMore={showLoadMore} />
      )}
    </Box>
  );
};

export default ConfirmedRequestListBox;
