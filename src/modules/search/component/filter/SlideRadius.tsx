import { Slider, Theme, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import { PRIMARY } from '../../../../configs/colors';
import { slideMarks } from '../../constants';
import { ISellerSearchFilter } from '../../model';

const CustomSlider = withStyles((theme: Theme) => ({
  root: {
    color: PRIMARY,
    height: 8,
    '& .MuiSlider-markLabel[data-index="0"]': {
      transform: 'translateX(0%)',
    },
    '& .MuiSlider-markLabel[data-index="1"]': {
      transform: 'translateX(-100%)',
    },
  },
  thumb: {
    height: 12,
    width: 12,
    border: '2px solid currentColor',
    marginTop: -5,
    marginLeft: -5,
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 12px)',
    top: 20,
    '& *': {
      background: 'transparent',
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
    height: 4,
    borderRadius: 2,
  },
  rail: {
    height: 4,
    borderRadius: 2,
  },
}))(Slider);

interface ValueLabelProps {
  children: React.ReactElement;
  open: boolean;
  value: number;
}

export const ValueLabelComponent: React.FC<ValueLabelProps> = (props) => {
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
      ValueLabelComponent={ValueLabelComponent}
      onChange={(event, newValue) => setFilter({ ...filter, radius: newValue as number })}
    />
  );
};

export default SlideRadius;
