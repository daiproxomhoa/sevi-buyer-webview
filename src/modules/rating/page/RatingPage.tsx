import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { SUCCESS_CODE } from '../../../constants';
import { PAGE_OFFSET } from '../../../models/paginations';
import { AppState } from '../../../redux/reducer';
import { PageWrapperNoScroll, snackbarSetting } from '../../common/component/elements';
import PendingRateBox from '../component/RatingBox';
import { fetchPendingRateData } from '../redux/ratingReducer';

interface Props {
  mode: 'rated' | 'unrated';
}

const RatingPage = (props: Props) => {
  const { mode } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const intl = useIntl();
  const [offset, setPageOffset] = useState<number>(0);
  const { loading, pendingRateData, disableLoadMore } = useSelector((state: AppState) => state.rating, shallowEqual);

  const fetchData = useCallback(async () => {
    const json = await dispatch(fetchPendingRateData(offset, mode));
    if (json.status !== SUCCESS_CODE) {
      enqueueSnackbar(
        intl.formatMessage({ id: 'getDataFail' }),
        snackbarSetting((key) => closeSnackbar(key), {
          variant: 'error',
        }),
      );
    }
  }, [closeSnackbar, dispatch, enqueueSnackbar, intl, offset, mode]);

  useEffect(() => {
    fetchData();
  }, [dispatch, fetchData]);

  return (
    <PageWrapperNoScroll>
      <PendingRateBox
        data={pendingRateData}
        setPage={() => setPageOffset((one) => one + PAGE_OFFSET)}
        loading={loading}
        disableLoadMore={disableLoadMore}
        mode={mode}
      />
    </PageWrapperNoScroll>
  );
};

export default RatingPage;
