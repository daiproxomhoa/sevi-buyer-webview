import { Dialog, Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import { CardDiv, SlideLeft } from "../../common/component/elements";
import Header from "../../common/component/Header";
import { IRequest } from "../model";

interface Props {
  open: boolean;
  info?: IRequest;
  onClose(): void;
  onExited(): void;
}

const RequestInfoDetail = (props: Props) => {
  const { open, info, onClose, onExited } = props;

  return (
    <Dialog
      open={open}
      TransitionComponent={SlideLeft}
      fullScreen
      style={{
        alignItems: "flex-end",
      }}
      onExited={onExited}
      hideBackdrop
    >
      <Header action={onClose} title={info?.desc} />

      <div
        style={{
          padding: "12px 24px 24px",
        }}
      >
        <CardDiv>
          <Typography variant="caption" color="textSecondary">
            <FormattedMessage id="request.detail.time" />
          </Typography>
          <Typography variant="body2">{info?.date}</Typography>
        </CardDiv>

        <CardDiv>
          <Typography variant="caption" color="textSecondary">
            <FormattedMessage id="request.detail.note" />
          </Typography>
          <Typography variant="body2">{info?.desc}</Typography>
        </CardDiv>

        <Typography variant="subtitle1" style={{ paddingTop: "12px" }}>
          <FormattedMessage id="request.detail.contactInfo" />
        </Typography>

        <CardDiv>
          <Typography variant="caption" color="textSecondary">
            <FormattedMessage id="request.detail.fullName" />
          </Typography>
          <Typography variant="body2">
            {info?.seller.givenName}&nbsp;{info?.seller.familyName}
          </Typography>
        </CardDiv>

        <CardDiv>
          <Typography variant="caption" color="textSecondary">
            <FormattedMessage id="phoneNumber" />
          </Typography>
          <Typography variant="body2">{info?.sellerId}</Typography>
        </CardDiv>
      </div>
    </Dialog>
  );
};

export default RequestInfoDetail;
