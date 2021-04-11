import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { SUCCESS_CODE } from "../../../constants";
import { AppState } from "../../../redux/reducer";
import {
  PageWrapperNoScroll,
  snackbarSetting,
} from "../../common/component/elements";
import PendingRateBox from "../component/PendingRateBox";
import { fetchPendingRateData } from "../redux/ratingReducer";

interface Props {}

const PendingRatePage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const intl = useIntl();
  const [offset, setPageOffset] = useState<number>(0);
  const { loading, pendingRateData } = useSelector(
    (state: AppState) => state.rating
  );
  const fetchData = useCallback(async () => {
    const json = await dispatch(fetchPendingRateData(offset));
    if (json.status !== SUCCESS_CODE) {
      enqueueSnackbar(
        intl.formatMessage({ id: "getDataFail" }),
        snackbarSetting((key) => closeSnackbar(key), { color: "error" })
      );
    }
  }, [closeSnackbar, dispatch, enqueueSnackbar, intl, offset]);

  useEffect(() => {
    fetchData();
  }, [dispatch, fetchData]);

  return (
    <PageWrapperNoScroll>
      <PendingRateBox
        data={pendingRateData}
        setPage={() => setPageOffset((one) => one + 1)}
        loading={loading}
      />
    </PageWrapperNoScroll>
  );
};

export default PendingRatePage;
