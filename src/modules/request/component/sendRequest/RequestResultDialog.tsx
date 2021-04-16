import { Button, ButtonBase, Dialog, Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { ICreateRequestResult } from "../../model";
import { ReactComponent as IconSuccess } from "../../../../svg/icon-request-success.svg";
import { ReactComponent as IconError } from "../../../../svg/icon-request-error.svg";

interface Props {
  open: boolean;
  onClose(): void;
  result?: ICreateRequestResult;
  backToSearch(): void;
}

const RequestResultDialog = (props: Props) => {
  const { result, open, onClose, backToSearch } = props;

  if (!result) {
    return <></>;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ style: { padding: "24px", alignItems: "center" } }}
    >
      <Typography
        variant="subtitle1"
        color={result.result === "success" ? "textPrimary" : "error"}
      >
        <FormattedMessage
          id={result.result === "success" ? "request.success" : "request.error"}
        />
      </Typography>

      <Typography
        variant="body2"
        style={{ paddingTop: "36px", textAlign: "center" }}
      >
        <FormattedMessage id={`request.response.${result.result}`} />
      </Typography>

      <Typography
        variant="body2"
        style={{ padding: "12px 0" }}
        color="textSecondary"
      >
        <FormattedMessage
          id="request.remaining"
          values={{
            num: (
              <Typography variant="body2" component="span" color="textPrimary">
                <FormattedNumber value={result.remaining} />
              </Typography>
            ),
          }}
        />
      </Typography>

      {result.result === "success" ? (
        <>
          <IconSuccess />
          <Button
            style={{ margin: "24px 0px 16px", minWidth: "200px" }}
            variant="contained"
            color="primary"
            size="large"
          >
            <FormattedMessage id="sendMessage" />
          </Button>

          <ButtonBase disableRipple onClick={backToSearch}>
            <Typography variant="body1" color="textSecondary">
              <FormattedMessage id="request.backSearchPage" />
            </Typography>
          </ButtonBase>
        </>
      ) : (
        <>
          <IconError />
          <Button
            style={{ margin: "24px 0px 16px", minWidth: "200px" }}
            variant="contained"
            color="primary"
            size="large"
            onClick={onClose}
          >
            <FormattedMessage id="ok" />
          </Button>
        </>
      )}
    </Dialog>
  );
};

export default RequestResultDialog;
