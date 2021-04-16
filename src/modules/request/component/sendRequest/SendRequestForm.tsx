import DateMomentUtils from "@date-io/moment";
import {
  Button,
  FormHelperText,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import AlarmOnIcon from "@material-ui/icons/AlarmOn";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment, { Moment } from "moment";
import "moment/locale/en-gb";
import "moment/locale/vi";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { GREY_300 } from "../../../../configs/colors";
import { DATE_FORMAT, TIME_FORMAT } from "../../../../models/moment";
import { some } from "../../../common/constants";
import { ICreateRequestForm } from "../../model";
import ChooseDateDialog from "./ChooseDateDialog";
import ChooseTimeDialog from "./ChooseTimeDialog";

interface Props {
  profile?: some;
  locale: string;
  description: string;
  onUpdateDescription(str: string): void;
  onSubmit(values: ICreateRequestForm): void;
}

const SendRequestForm = (props: Props) => {
  const { profile, locale, description, onUpdateDescription, onSubmit } = props;

  const intl = useIntl();
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const [openTimePicker, setOpenTimePicker] = React.useState(false);

  moment.locale(locale);

  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
  } = useForm<ICreateRequestForm>({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      date: "",
      time: "",
      desc: intl.formatMessage(
        { id: "request.iWantFind" },
        { text: description }
      ),
      location: profile?.addresses[0]?.address?.formattedAddress || "",
    },
  });

  const onChooseDate = (date: Moment | null, isAnyDate: boolean) => {
    setOpenDatePicker(false);
    if (isAnyDate) {
      setValue("date", intl.formatMessage({ id: "request.anyDay" }));
      return;
    }

    setValue("date", date ? date.format(DATE_FORMAT) : "");
  };

  const onChooseTime = (date: Moment | null, isAnyTime: boolean) => {
    setOpenTimePicker(false);
    if (isAnyTime) {
      setValue("time", intl.formatMessage({ id: "request.anyTime" }));
      return;
    }

    setValue("time", date ? date.format(TIME_FORMAT) : "");
  };

  return (
    <div>
      <form
        style={{
          alignSelf: "stretch",
          padding: "24px",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="desc"
          control={control}
          rules={{ required: intl.formatMessage({ id: "required" }) }}
          render={({ field }) => (
            <TextField
              {...field}
              label={intl.formatMessage({ id: "request.jobDesc" })}
              placeholder={intl.formatMessage({ id: "request.jobDesc" })}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                style: { paddingBottom: "6px", fontSize: "14px" },
              }}
              onBlur={() => onUpdateDescription(field.value)}
            />
          )}
        />

        <FormHelperText error>{errors?.desc?.message || " "}</FormHelperText>

        <Controller
          name="date"
          control={control}
          rules={{ required: intl.formatMessage({ id: "chooseRequired" }) }}
          render={({ field }) => (
            <TextField
              {...field}
              label={intl.formatMessage({ id: "request.date" })}
              placeholder={intl.formatMessage({ id: "request.chooseDate" })}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                style: { paddingBottom: "6px", fontSize: "14px" },
                readOnly: true,
                endAdornment: (
                  <CalendarTodayIcon
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                  />
                ),
              }}
              onClick={() => setOpenDatePicker(true)}
            />
          )}
        />

        <FormHelperText error>{errors?.date?.message || " "}</FormHelperText>

        <Controller
          name="time"
          control={control}
          rules={{ required: intl.formatMessage({ id: "chooseRequired" }) }}
          render={({ field }) => (
            <TextField
              {...field}
              label={intl.formatMessage({ id: "request.time" })}
              placeholder={intl.formatMessage({ id: "request.chooseTime" })}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                style: { paddingBottom: "6px", fontSize: "14px" },
                readOnly: true,
                endAdornment: (
                  <AlarmOnIcon
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                  />
                ),
              }}
              onClick={() => setOpenTimePicker(true)}
            />
          )}
        />

        <FormHelperText error>{errors?.time?.message || " "}</FormHelperText>

        <Controller
          name="location"
          control={control}
          rules={{ required: intl.formatMessage({ id: "chooseRequired" }) }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label={<FormattedMessage id="address" />}
              placeholder="Chọn giờ"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                style: { paddingBottom: "6px", fontSize: "14px" },
              }}
              SelectProps={{
                IconComponent: () => (
                  <KeyboardArrowDownIcon
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                  />
                ),
              }}
            >
              {profile?.addresses.map((option, index: number) => (
                <MenuItem
                  key={option.address?.formattedAddress}
                  value={option.address?.formattedAddress}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "12px 16px",
                    borderTop: index ? `1px solid ${GREY_300}` : "none",
                  }}
                >
                  <Typography
                    variant="body2"
                    style={{
                      width: "100%",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {option?.address?.formattedAddress}
                  </Typography>
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <FormHelperText error>{errors?.time?.message || " "}</FormHelperText>

        <Button
          style={{ margin: "64px 0px 12px" }}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          type="submit"
        >
          <FormattedMessage id="request.sendRequest" />
        </Button>
      </form>

      <MuiPickersUtilsProvider utils={DateMomentUtils}>
        <ChooseDateDialog
          open={openDatePicker}
          date={getValues("date")}
          onClose={() => setOpenDatePicker(false)}
          onChooseDate={onChooseDate}
        />

        <ChooseTimeDialog
          open={openTimePicker}
          onClose={() => setOpenTimePicker(false)}
          date={getValues("time")}
          onChooseTime={onChooseTime}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default SendRequestForm;
