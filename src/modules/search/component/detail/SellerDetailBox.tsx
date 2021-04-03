import { Avatar, Button, Dialog, Typography } from "@material-ui/core";
import React, { useState } from "react";
import CardHeader from "../../../common/component/CardHeader";
import { SlideLeft } from "../../../common/component/elements";
import { WhiteIconButton } from "../../../common/component/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { FormattedMessage, useIntl } from "react-intl";
import FlagIcon from "@material-ui/icons/Flag";
import { some } from "../../../common/constants";
import HeaderTab from "../../../common/component/HeaderTab";

interface Props {
  open: boolean;
  info?: some;
  onClose(): void;
  onSendRequest(): void;
}

const SellerDetailBox = (props: Props) => {
  const { open, info, onClose, onSendRequest } = props;
  const intl = useIntl();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Dialog
      open={open}
      TransitionComponent={SlideLeft}
      style={{
        alignItems: "flex-end",
      }}
      fullScreen
      PaperProps={{
        style: {
          margin: 0,
          width: "100%",
        },
      }}
      onBackdropClick={onClose}
    >
      <div
        style={{
          top: 0,
          left: 0,
          right: 0,
          position: "absolute",
        }}
      >
        <CardHeader />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "24px 24px 0",
        }}
      >
        <div style={{ padding: "12px 0" }}>
          <WhiteIconButton onClick={onClose}>
            <ChevronLeftIcon style={{ width: "20px", height: "20px" }} />
          </WhiteIconButton>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src={"https://avatarfiles.alphacoders.com/252/thumb-252266.jpg"}
            style={{
              height: 155,
              width: 155,
              borderRadius: 16,
              marginBottom: 16,
            }}
            variant="rounded"
          />
          <Typography variant="subtitle2">
            {info?.familyName}&nbsp;{info?.givenName}
          </Typography>
        </div>
      </div>

      <HeaderTab
        tabIndex={tabIndex}
        tabList={[
          intl.formatMessage({ id: "search.rating" }),
          intl.formatMessage({ id: "search.info" }),
        ]}
        onChangeTab={(newIndex) => setTabIndex(newIndex)}
      />

      <div
        style={{
          position: "fixed",
          bottom: 10,
          left: 0,
          right: 0,
          zIndex: 5001,
          padding: 24,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={onSendRequest}
        >
          <FlagIcon fontSize="small" />
          &nbsp;
          <FormattedMessage id="search.sendRequest" />
        </Button>
      </div>
    </Dialog>
  );
};

export default SellerDetailBox;
