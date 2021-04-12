import { Theme, Slider, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import { PRIMARY } from "../../../../configs/colors";
import { slideMarks } from "../../constants";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { ISellerSearchFilter } from "../../model";

const CustomSlider = withStyles((theme: Theme) => ({
  root: {
    color: PRIMARY,
    height: 8,
    '& .MuiSlider-markLabel[data-index="0"]': {
      transform: "translateX(0%)",
    },
    '& .MuiSlider-markLabel[data-index="1"]': {
      transform: "translateX(-100%)",
    },
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
    top: 20,
    "& *": {
      background: "transparent",
    },
  },
  markLabel: {
    top: -8,
  },
  markLabelActive: {
    color: theme.palette.text.secondary,
  },
  mark: {
    width: 0,
    height: 0,
    marginBottom: 8,
  },
  marked: {
    marginBottom: 0,
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
}))(Slider);

interface ValueLabelProps {
  children: React.ReactElement;
  open: boolean;
  value: number;
}

const ValueLabelComponent: React.FC<ValueLabelProps> = (props) => {
  const { children, open, value } = props;

  return (
    <Tooltip
      style={{ zIndex: 99999 }}
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={value}
      arrow
      PopperProps={{
        style: {
          fontSize: 14,
        },
      }}
    >
      {children}
    </Tooltip>
  );
};

const CustomThumbComponent: React.FC = (props: any) => {
  return <FiberManualRecordIcon {...props} />;
};

interface Props {
  filter: ISellerSearchFilter;
  setFilter(filter: ISellerSearchFilter): void;
}

const SlideRadius = (props: Props) => {
  const { filter, setFilter } = props;

  return (
    <CustomSlider
      marks={slideMarks}
      value={filter.radius}
      max={20}
      ThumbComponent={CustomThumbComponent}
      onChange={(event, newValue) =>
        setFilter({ ...filter, radius: newValue as number })
      }
    />
  );
};

export default SlideRadius;
