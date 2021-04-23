import React from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useSWRInfinite } from 'swr';
import { API_PATHS } from '../../../../configs/api';
import { SUCCESS_CODE } from '../../../../constants';
import { AppState } from '../../../../redux/reducer';
import { fetchThunk } from '../../../common/redux/thunk';
import ReceivedBox from './ReceivedBox';

interface Props {}

const AcceptedRequestPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [showLoadMore, setShowLoadMore] = React.useState(true);
  const { data, size, setSize, isValidating } = useSWRInfinite(
    (index, prevData) => [API_PATHS.getUnconfirmed, JSON.stringify({ accept: true, offset: prevData?.offset || 0 })],
    async (...args) => {
      const res = await dispatch(fetchThunk(args[0], 'post', args[1]));
      if (res.status !== SUCCESS_CODE) {
        throw new Error(res.status);
      }

      if (res.body.requests.length < 20) {
        setShowLoadMore(false);
      }

      return {
        requests: res.body.requests,
        offset: JSON.parse(args[1]).offset + res.body.requests.length,
      };
    },
  );

  return (
    <ReceivedBox loading={isValidating} data={data} showLoadMore={showLoadMore} onLoadMore={() => setSize(size + 1)} />
  );
};

export default AcceptedRequestPage;
