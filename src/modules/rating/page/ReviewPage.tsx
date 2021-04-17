import { useSnackbar } from "notistack";
import { useState } from "react";
import { useIntl } from "react-intl";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../redux/reducer";
import ReviewBox from "../component/ReviewBox";

interface Props {
  mode: "rated" | "unrated";
}

const ReviewPage = (props: Props) => {
  const { mode } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const intl = useIntl();
  const [offset, setPageOffset] = useState<number>(0);
  const fuck = useSelector((state: AppState) => state.rating, shallowEqual);
  const { loading, pendingRateData, disableLoadMore } = fuck;
  const location = useLocation();

  // const fetchData = useCallback(async () => {
  //   const json = await dispatch(fetchPendingRateData(offset, mode));
  //   if (json.status !== SUCCESS_CODE) {
  //     enqueueSnackbar(
  //       intl.formatMessage({ id: "getDataFail" }),
  //       snackbarSetting((key) => closeSnackbar(key), { color: "error" })
  //     );
  //   }
  // }, [closeSnackbar, dispatch, enqueueSnackbar, intl, offset, mode]);

  // useEffect(() => {
  //   fetchData();
  // }, [dispatch, fetchData]);

  return <ReviewBox onSubmit={(value) => console.log(value)} />;
};

export default ReviewPage;
