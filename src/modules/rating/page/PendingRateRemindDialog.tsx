import { Badge, Box, Button, Dialog, Typography } from "@material-ui/core";
import InsertInvitationIcon from "@material-ui/icons/InsertInvitation";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useCallback, useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { API_PATHS } from "../../../configs/api";
import { ROUTES } from "../../../configs/routes";
import { DATE_TIME_FORMAT } from "../../../models/moment";
import { AppState } from "../../../redux/reducer";
import { ReactComponent as IconSchedule } from "../../../svg/schedule.svg";
import { snackbarSetting } from "../../common/component/elements";
import { some } from "../../common/constants";
import { fetchThunk } from "../../common/redux/thunk";
import { fetchPendingRateData } from "../redux/ratingReducer";

const OPTIONS_DEFER = [
  {
    value: 3,
    title: "day",
  },
  {
    value: 7,
    title: "week",
  },
  {
    value: 14,
    title: "week",
  },
];
interface Props {}
const PendingRateRemindDialog = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { pendingRateData } = useSelector((state: AppState) => state.rating);
  const location = useLocation();
  const intl = useIntl();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const arrayDeferRating = useMemo(() => {
    return (
      pendingRateData?.requests.filter((item: some) =>
        item.deferRatingTo
          ? moment(item.deferRatingTo, DATE_TIME_FORMAT).isBefore(moment())
          : true
      ) || []
    );
  }, [pendingRateData?.requests]);

  const data = useMemo(() => {
    return arrayDeferRating?.[0];
  }, [arrayDeferRating]);

  const deferRating = useCallback(
    async (deferDay: number) => {
      if (!data) {
        return;
      }
      const json = await dispatch(
        fetchThunk(API_PATHS.deferRating, "post", {
          deferDay,
          otherId: data?.sellerId,
          requestDate: data?.createDate,
          deferTo: moment(data?.createDate, DATE_TIME_FORMAT)
            .add(deferDay, "days")
            .format(DATE_TIME_FORMAT),
        })
      );
      if (json.body) {
        dispatch(fetchPendingRateData(0));
      } else {
        enqueueSnackbar(
          intl.formatMessage({ id: "getDataFail" }),
          snackbarSetting((key) => closeSnackbar(key), { color: "error" })
        );
      }
    },
    [closeSnackbar, data, dispatch, enqueueSnackbar, intl]
  );

  if (
    !pendingRateData ||
    !data ||
    arrayDeferRating?.length === 0 ||
    location.pathname === ROUTES.rating
  ) {
    return null;
  }
  return (
    <Dialog
      open={true}
      PaperProps={{
        style: {
          width: "100%",
          height: "70%",
          position: "relative",
          padding: "42px 24px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          textAlign: "center",
        },
      }}
    >
      <Badge
        badgeContent={
          arrayDeferRating.length > 10 ? "9+" : arrayDeferRating.length
        }
        color="secondary"
        style={{ position: "absolute", top: 20, right: 22 }}
      />
      <Typography variant="h6">
        <FormattedMessage id="ratingRemind.HELLO" />
      </Typography>
      <Typography variant="body2" className="m-t-24 m-b-12">
        <FormattedMessage id="ratingRemind.REMIND" />
      </Typography>
      <Typography variant="body2" className="m-b-12">
        <FormattedMessage id="ratingRemind.JOB" />
        :&nbsp;{data?.desc}
      </Typography>
      <Box className="d-flex align-items-center">
        <InsertInvitationIcon />
        &emsp;{data?.time}&nbsp;-&nbsp;{data?.date}
      </Box>
      <Button
        variant="contained"
        className="m-t-12 m-b-24"
        style={{
          borderRadius: 24,
          padding: "0px 24px",
        }}
        size="small"
      >
        <FormattedMessage id="detail" />
      </Button>
      <IconSchedule />
      <Button
        variant="contained"
        color="primary"
        className="m-t-24"
        style={{ minWidth: 200 }}
      >
        <StarOutlineIcon />
        &nbsp;
        <FormattedMessage id="ratingRemind.REVIEW" />
      </Button>
      <Typography
        variant="body1"
        className="m-t-16 m-b-12"
        color="textSecondary"
      >
        <FormattedMessage id="ratingRemind.REMIND_LETTER" />
      </Typography>
      <Box className="d-flex">
        {OPTIONS_DEFER.map((option: some, index: number) => {
          return (
            <Button
              key={index}
              className="m-4"
              variant="contained"
              style={{
                borderRadius: "50%",
                height: 48,
                width: 48,
                minWidth: 48,
                padding: 0,
              }}
              onClick={() => {
                deferRating(option.value);
              }}
            >
              <Box className="d-flex d-flex-column justify-content-center">
                <Typography
                  variant="subtitle2"
                  color="textPrimary"
                  component="span"
                  style={{ lineHeight: 1 }}
                >
                  {Number(option.value % 7 || option.value / 7).toFixed(0)}
                </Typography>
                <Typography variant="caption" component="span">
                  <FormattedMessage id={option.title} />
                </Typography>
              </Box>
            </Button>
          );
        })}
      </Box>
    </Dialog>
  );
};

export default PendingRateRemindDialog;
