import { Button, Dialog, Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import { ReactComponent as IconRatingSuccess } from "../../../svg/rating_success.svg";
interface Props {
  open: boolean;
  onClose: () => void;
}
const RatingSuccessDialog = (props: Props) => {
  const { open, onClose } = props;
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          width: "100%",
          position: "relative",
          padding: "42px 24px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          textAlign: "center",
        },
      }}
    >
      <IconRatingSuccess />
      <Typography variant="h6" className="m-t-24 m-b-12">
        <FormattedMessage id="rating.SUCCESS" />
      </Typography>{" "}
      <Typography variant="body2" className="m-b-24">
        <FormattedMessage id="rating.SUCCESS_NOTE" />
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ width: 200 }}
        onClick={onClose}
      >
        <FormattedMessage id="ok" />
      </Button>
    </Dialog>
  );
};

export default RatingSuccessDialog;
