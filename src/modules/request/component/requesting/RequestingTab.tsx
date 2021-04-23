import { push } from 'connected-react-router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useSWRInfinite } from 'swr';
import { API_PATHS } from '../../../../configs/api';
import { ROUTES } from '../../../../configs/routes';
import { SUCCESS_CODE } from '../../../../constants';
import { AppState } from '../../../../redux/reducer';
import { fetchThunk } from '../../../common/redux/thunk';
import RequestingBox from './RequestingBox';

interface Props {}

const RequestingPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [showLoadMore, setShowLoadMore] = React.useState(true);

  const { data, size, setSize, isValidating } = useSWRInfinite(
    (index, prevData) => [API_PATHS.getUnconfirmed, JSON.stringify({ accept: false, offset: prevData?.offset || 0 })],
    async (url, body) => {
      const res = await dispatch(fetchThunk(url, 'post', body));
      if (res.status !== SUCCESS_CODE) {
        throw new Error(res.status);
      }

      if (res.body.requests.length < 20) {
        setShowLoadMore(false);
      }

      return {
        requests: res.body.requests,
        offset: JSON.parse(body).offset + res.body.requests.length,
      };
    },
  );

  return (
    <RequestingBox
      loading={isValidating}
      data={data}
      showLoadMore={showLoadMore}
      onLoadMore={() => setSize(size + 1)}
      onViewRequestDetail={(data) => dispatch(push(ROUTES.requestDetail, { detail: data }))}
    />
  );
};

export default RequestingPage;
