import { goBack } from "connected-react-router";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { API_PATHS } from "../../../configs/api";
import { SUCCESS_CODE } from "../../../constants";
import { AppState } from "../../../redux/reducer";
import { snackbarSetting } from "../../common/component/elements";
import { some } from "../../common/constants";
import { setLoadingBackDrop } from "../../common/redux/commonReducer";
import { fetchThunk } from "../../common/redux/thunk";
import RatingSuccessDialog from "../component/RatingSuccessDialog";
import ReviewBox from "../component/ReviewBox";

interface Props {}

const ReviewPage = (props: Props) => {
  const { sellerId, reqDate } = useParams<{
    sellerId: string;
    reqDate: string;
  }>();

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const intl = useIntl();
  const [open, setOpen] = useState<boolean>(false);

  const onSubmit = useCallback(
    async (data: some) => {
      if (!sellerId || !reqDate) {
        return;
      }
      dispatch(setLoadingBackDrop(true));
      const json = await dispatch(
        fetchThunk(API_PATHS.getRating, "post", { ...data, sellerId, reqDate })
      );
      dispatch(setLoadingBackDrop(false));

      if (json.status === SUCCESS_CODE) {
        setOpen(true);
      } else {
        enqueueSnackbar(
          intl.formatMessage({ id: "rating_fail" }),
          snackbarSetting((key) => closeSnackbar(key), { color: "error" })
        );
      }
    },
    [sellerId, reqDate, dispatch, enqueueSnackbar, intl, closeSnackbar]
  );

  useEffect(() => {
    if (!sellerId || !reqDate) {
      dispatch(goBack());
    }
  }, [dispatch, reqDate, sellerId]);

  return (
    <>
      <ReviewBox onSubmit={onSubmit} />
      <RatingSuccessDialog
        open={open}
        onClose={() => {
          dispatch(goBack());
        }}
      />
    </>
  );
};

export default ReviewPage;
