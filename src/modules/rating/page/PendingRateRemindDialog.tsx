import { Box, Button, Dialog, Typography } from "@material-ui/core";
import InsertInvitationIcon from "@material-ui/icons/InsertInvitation";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { ROUTES } from "../../../configs/routes";
import { AppState } from "../../../redux/reducer";
import { ReactComponent as IconSchedule } from "../../../svg/schedule.svg";
import { some } from "../../common/constants";

const OPTIONS_DEFER = [
  {
    value: 3,
    title: "day",
  },
  {
    value: 1,
    title: "week",
  },
  {
    value: 2,
    title: "week",
  },
];
interface Props {}
const PendingRateRemindDialog = (props: Props) => {
  const { pendingRateData, disableLoadMore, loading } = useSelector(
    (state: AppState) => state.rating
  );
  const location = useLocation();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname !== ROUTES.rating) {
      setOpen(pendingRateData?.requests?.length > 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingRateData]);

  if (!pendingRateData) {
    return null;
  }
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
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
      <Typography variant="h6">
        <FormattedMessage id="ratingRemind.HELLO" />
      </Typography>
      <Typography variant="body2" className="m-t-24 m-b-12">
        <FormattedMessage id="ratingRemind.REMIND" />
      </Typography>
      <Typography variant="body2" className="m-b-12">
        <FormattedMessage id="ratingRemind.JOB" />
        :&nbsp;
      </Typography>
      <Box className="d-flex">
        <InsertInvitationIcon />
        &emsp;
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
            >
              <Box className="d-flex d-flex-column justify-content-center">
                <Typography
                  variant="subtitle2"
                  color="textPrimary"
                  component="span"
                  style={{ lineHeight: 1 }}
                >
                  {option.value}
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
