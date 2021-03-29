import {
  Button,
  Dialog,
  Divider,
  fade,
  Slider,
  Theme,
  Tooltip,
  Typography,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import { withStyles } from "@material-ui/styles";
import React from "react";
import { FormattedMessage } from "react-intl";
import { LIGHT_GREY, PRIMARY } from "../../../configs/colors";
import { SlideUp } from "../../common/component/elements";

const FilterDialog = withStyles((theme: Theme) => ({
  root: {
    zIndex: 9999,
  },
  scrollPaper: {
    alignItems: "flex-end",
  },
}))(Dialog);

const PrettoSlider = withStyles({
  root: {
    color: PRIMARY,
    height: 8,
  },
  thumb: {
    height: 32,
    width: 32,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -12,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 12px)",
    top: -22,
    "& *": {
      background: "transparent",
      color: "#000",
    },
  },
  markLabel: {
    top: -8,
  },
  mark: {
    width: 0,
    height: 0,
    marginBottom: 8,
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const marks = [
  {
    value: 0,
    label: "0 km",
  },
  {
    value: 20,
    label: "20 km",
  },
];

interface ValueLabelProps {
  children: React.ReactElement;
  open: boolean;
  value: number;
}

function ValueLabelComponent(props: ValueLabelProps) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

function AirbnbThumbComponent(props: any) {
  return <FiberManualRecordIcon {...props} />;
}

interface Props {
  open: boolean;
  onClose(): void;
}

const FilterBox = (props: Props) => {
  const { open, onClose } = props;

  return (
    <FilterDialog
      open={open}
      TransitionComponent={SlideUp}
      style={{
        alignItems: "flex-end",
      }}
      PaperProps={{
        style: {
          padding: "24px",
          margin: 0,
          width: "100%",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
      }}
      onBackdropClick={onClose}
    >
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

      <PrettoSlider
        valueLabelDisplay="on"
        marks={marks}
        defaultValue={0}
        max={20}
        ValueLabelComponent={ValueLabelComponent}
        ThumbComponent={AirbnbThumbComponent}
      />

      <Divider />

      <Button
        fullWidth
        style={{
          marginTop: "16px",
          backgroundColor: LIGHT_GREY,
          justifyContent: "flex-start",
          padding: "6px 32px 6px 16px",
          height: "56px",
        }}
        size="large"
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
    </FilterDialog>
  );
};

export default FilterBox;
