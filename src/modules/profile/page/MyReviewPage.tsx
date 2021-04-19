import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../configs/api';
import { SUCCESS_CODE } from '../../../constants';
import { AppState } from '../../../redux/reducer';
import { snackbarSetting } from '../../common/component/elements';
import { some } from '../../common/constants';
import { fetchThunk } from '../../common/redux/thunk';
import MyReviewsBox from '../component/MyReviewsBox';

interface Props {}

const MyReviewPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const intl = useIntl();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [data, setData] = useState<some>();
  const [loading, setLoading] = useState<boolean>(false);
  const [disableLoadMore, setDisableLoadMore] = useState<boolean>(false);
  const [offset, setPageOffset] = useState<number>(0);

  const fetchMyReviews = useCallback(async () => {
    setLoading(true);
    const json = await dispatch(fetchThunk(`${API_PATHS.myRatings}?offset=${offset}`));
    setLoading(false);
    if (json.status === SUCCESS_CODE) {
      setData((one) => ({ ...one, ratings: [...get(one, 'ratings', []), ...get(json, 'body.ratings', [])] }));
      if (!json.body?.ratings?.length) {
        setDisableLoadMore(true);
      }
    } else {
      enqueueSnackbar(
        intl.formatMessage({ id: 'getDataFail' }),
        snackbarSetting((key) => closeSnackbar(key), { color: 'error' }),
      );
    }
  }, [closeSnackbar, dispatch, enqueueSnackbar, intl, offset]);

  useEffect(() => {
    fetchMyReviews();
  }, [fetchMyReviews]);

  return (
    <MyReviewsBox
      data={data}
      loading={loading}
      disableLoadMore={disableLoadMore}
      setPage={() => setPageOffset((one) => one + 1)}
    />
  );
};

export default MyReviewPage;
