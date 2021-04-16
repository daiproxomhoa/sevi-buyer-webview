import {
  Box,
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  Typography,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment, { Moment } from "moment";
import React from "react";
import { FormattedMessage } from "react-intl";
import { PRIMARY } from "../../../../configs/colors";
import { DATE_FORMAT } from "../../../../models/moment";

interface Props {
  open: boolean;
  date: string;
  onClose(): void;
  onChooseDate(date: Moment | null, isAnyDate: boolean): void;
}

const ChooseDateDialog = (props: Props) => {
  const { open, date, onClose, onChooseDate } = props;

  const [isAnyDate, setIsAnyDate] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState<Moment | null>(
    moment()
  );

  const onExited = () => {
    const inputDate = moment(date, DATE_FORMAT);

    if (inputDate.isValid()) {
      setSelectedDate(inputDate);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} onExited={onExited}>
      <KeyboardDatePicker
        variant="static"
        disablePast
        value={selectedDate}
        onChange={(date: Moment | null) => setSelectedDate(date)}
        ToolbarComponent={({ date }) => (
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textTransform: "capitalize",
              background: PRIMARY,
              color: "white",
            }}
            paddingBottom="8px"
          >
            <Typography
              variant="body2"
              style={{
                background: "#A503CB",
                width: "100%",
                textAlign: "center",
                padding: "8px 0",
              }}
            >
              {date?.format("dddd")}
            </Typography>
            <Typography variant="subtitle1">{date?.format("MMMM")}</Typography>
            <Typography variant="h2">{date?.format("DD")}</Typography>
            <Typography variant="subtitle1" style={{ fontWeight: "normal" }}>
              {date?.format("YYYY")}
            </Typography>
          </Box>
        )}
      />

      <div style={{ padding: "0 24px 24px" }}>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={isAnyDate}
              onChange={(e, checked) => setIsAnyDate(checked)}
              name="checkedA"
            />
          }
          label={
            <Typography variant="body2" color="textSecondary">
              <FormattedMessage id="request.anyDay" />
            </Typography>
          }
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button onClick={onClose} size="small">
            <Typography
              variant="body1"
              color="primary"
              style={{ fontWeight: 500, padding: 6, margin: "0 8px" }}
            >
              <FormattedMessage id="cancel" />
            </Typography>
          </Button>
          <Button
            onClick={() => onChooseDate(selectedDate, isAnyDate)}
            size="small"
          >
            <Typography
              variant="body1"
              color="primary"
              style={{ fontWeight: 500, padding: 6 }}
            >
              <FormattedMessage id="ok" />
            </Typography>
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ChooseDateDialog;
