import { Button, Checkbox, Dialog, FormControlLabel, Typography } from '@material-ui/core';
import { KeyboardTimePicker } from '@material-ui/pickers';
import moment, { Moment } from 'moment';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { TIME_FORMAT } from '../../../../models/moment';

interface Props {
  open: boolean;
  date: string;
  onClose(): void;
  onChooseTime(date: Moment | null, isAnyDate: boolean): void;
}

const ChooseTimeDialog = (props: Props) => {
  const { open, date, onClose, onChooseTime } = props;
  const [isAnyTime, setIsAnyTime] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState<Moment | null>(moment());

  const onExited = () => {
    const inputDate = moment(date, TIME_FORMAT);

    if (inputDate.isValid()) {
      setSelectedDate(inputDate);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} onExited={onExited}>
      <KeyboardTimePicker
        variant="static"
        openTo="hours"
        minutesStep={5}
        value={selectedDate}
        onChange={(date: Moment | null) => setSelectedDate(date)}
      />

      <div style={{ padding: '0 24px 24px' }}>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={isAnyTime}
              onChange={(e, checked) => setIsAnyTime(checked)}
              name="checkedA"
            />
          }
          label={
            <Typography variant="body2">
              <FormattedMessage id="request.anyTime" />
            </Typography>
          }
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Button onClick={onClose} size="small">
            <Typography variant="body1" color="primary" style={{ fontWeight: 500, padding: 6, margin: '0 8px' }}>
              <FormattedMessage id="cancel" />
            </Typography>
          </Button>
          <Button onClick={() => onChooseTime(selectedDate, isAnyTime)} size="small">
            <Typography variant="body1" color="primary" style={{ fontWeight: 500, padding: 6 }}>
              <FormattedMessage id="ok" />
            </Typography>
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ChooseTimeDialog;
