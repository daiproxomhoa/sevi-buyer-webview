import { Typography, fade, Button, Box } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import { PRIMARY, LIGHT_GREY } from "../../../../configs/colors";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { CustomPopover } from "../../../common/component/elements";

interface Props {}

const SelectAddress = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  return (
    <>
      <Typography variant="subtitle2">
        <FormattedMessage id="search.distance" />
      </Typography>
      <div
        style={{
          display: "flex",
          padding: "16px 0",
          alignItems: "center",
        }}
      >
        <div
          style={{
            borderRadius: "50%",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: fade(PRIMARY, 0.1),
            flexShrink: 0,
            marginRight: "12px",
          }}
        >
          <RadioButtonCheckedIcon
            color="primary"
            style={{ fontSize: "20px" }}
          />
        </div>

        <Button
          fullWidth
          style={{
            backgroundColor: LIGHT_GREY,
            justifyContent: "flex-start",
            padding: "6px 32px 6px 16px",
          }}
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <Typography variant="caption" color="textSecondary">
              <FormattedMessage id="search.yourLocation" />
            </Typography>
            <Typography
              variant="body2"
              style={{
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              123/28 Thụy Phương, Bắc Từ Liêm 123/28 Thụy Phương, Bắc Từ Liêm
            </Typography>
          </div>

          <ChevronLeftIcon
            fontSize="small"
            style={{
              transform: "rotate(270deg)",
            }}
          />
        </Button>
      </div>

      <CustomPopover
        id={id}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
        elevation={1}
        marginThreshold={24}
      >
        <Box p={2}></Box>
      </CustomPopover>
    </>
  );
};

export default SelectAddress;
