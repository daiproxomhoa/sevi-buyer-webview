import { Avatar, Button, Typography } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import FlagIcon from "@material-ui/icons/Flag";
import { Skeleton } from "@material-ui/lab";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { API_PATHS } from "../../../../configs/api";
import { HeaderDiv } from "../../../common/component/elements";
import HeaderTab from "../../../common/component/HeaderTab";
import { WhiteIconButton } from "../../../common/component/IconButton";
import { ISeller } from "../../model";
import SellerInfo from "./SellerInfo";
import SellerRating from "./SellerRating";

interface Props {
  loading: boolean;
  info?: ISeller;
  onClose(): void;
  onSendRequest(): void;
}

const SellerDetailBox = (props: Props) => {
  const { loading, info, onClose, onSendRequest } = props;
  const intl = useIntl();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <HeaderDiv
        style={{
          position: "absolute",
          padding: 0,
          minHeight: "206px",
          right: 0,
          left: 0,
        }}
      />
      <div
        style={{
          zIndex: 2,
          padding: "24px 24px 0",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          flex: 1,
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
            src={
              loading || !info?.avatar
                ? undefined
                : API_PATHS.renderSellerAvatar(info?.id, info?.avatar)
            }
            style={{
              height: 155,
              width: 155,
              borderRadius: 16,
              marginBottom: 16,
              filter: loading ? "blur(2px)" : "none",
              transition: loading ? "none" : "filter 0.3s ease-out",
            }}
            variant="rounded"
          />

          <Typography variant="subtitle2">
            {loading ? (
              <Skeleton style={{ width: "150px" }} />
            ) : (
              <>
                {info?.familyName}&nbsp;{info?.givenName}
              </>
            )}
          </Typography>
        </div>

        <HeaderTab
          style={{ margin: "0px 0px 4px" }}
          tabIndex={tabIndex}
          tabList={[
            intl.formatMessage({ id: "search.rating" }),
            intl.formatMessage({ id: "search.info" }),
          ]}
          onChangeTab={(newIndex) => setTabIndex(newIndex)}
        />

        {loading ? (
          <div
            style={{
              padding: "24px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Skeleton variant="rect" width="100%" height={64} />

            <Skeleton variant="text" width="50%" style={{ margin: "8px 0" }} />

            <Skeleton variant="rect" width="100%" height={180} />
          </div>
        ) : tabIndex === 0 ? (
          <SellerRating info={info} />
        ) : (
          <SellerInfo info={info} />
        )}
      </div>

      <div
        style={{
          padding: "4px 24px 24px",
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
    </>
  );
};

export default SellerDetailBox;
