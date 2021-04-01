import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PageWrapperNoScroll } from "../../common/component/elements";
import { some } from "../../common/constants";
import HeaderProfile from "./HeaderProfile";
import { fakeDataProfile } from "../constants";
import AvatarUpload from "./AvatarUpload";
import {
  Box,
  Button,
  ButtonBase,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import FormControlAutoComplete from "../../common/component/FormControlAutoComplete";
import { useDispatch } from "react-redux";
import { fetchThunk } from "../../common/redux/thunk";
import { API_PATHS } from "../../../configs/api";
import { AppState } from "../../../redux/reducer";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { FormControlTextField } from "../../common/component/Form";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

interface Props {
  profile: some;
  onSubmit?: (profile: some) => void;
}

const EditProfileForm = (props: Props) => {
  const { profile, onSubmit } = props;
  const history = useHistory();
  const intl = useIntl();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { register, handleSubmit, errors, control, reset, watch } = useForm({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: profile,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  useEffect(() => {
    reset();
  }, [profile, reset]);

  return (
    <form
      onSubmit={onSubmit && handleSubmit(onSubmit)}
      className="overflow-auto"
    >
      <Box className={"d-flex d-flex-column align-items-center p-24 p-b-0"}>
        <Controller
          name={"avatar"}
          control={control}
          rules={{ required: intl.formatMessage({ id: "required" }) }}
          render={({ value, onChange }) => (
            <AvatarUpload src={value} onChange={onChange} />
          )}
        />
        <Box width="100%">
          <FormControlTextField
            className={"m-b-4 m-t-24"}
            inputRef={register({
              required: intl.formatMessage({ id: "required" }),
            })}
            name="givenName"
            label={<FormattedMessage id={"givenName"} />}
            fullWidth={true}
            errorMessage={errors.givenName?.message}
          />

          <FormControlTextField
            className={"m-b-4"}
            inputRef={register({
              required: intl.formatMessage({ id: "required" }),
            })}
            name="familyName"
            label={<FormattedMessage id={"familyName"} />}
            fullWidth={true}
            errorMessage={errors.familyName?.message}
          />
        </Box>
      </Box>
      <Box className={" p-l-24 p-b-0"}>
        {fields.map((item: some, index: number) => {
          const helperTextLocation =
            errors.addresses?.[index]?.location?.message;
          const helperTextAddress = errors.addresses?.[index]?.address?.message;
          return (
            <Box
              key={item.id}
              width="100%"
              className="d-flex align-items-center"
            >
              <Box className="flex-1">
                <FormControlTextField
                  className={"m-b-4"}
                  inputRef={register({
                    required: intl.formatMessage({ id: "required" }),
                  })}
                  name={`addresses[${index}].location`}
                  label={<FormattedMessage id={"locationName"} />}
                  fullWidth={true}
                  errorMessage={helperTextLocation}
                />
                <Controller
                  name={`addresses[${index}].address`}
                  control={control}
                  rules={{ required: intl.formatMessage({ id: "required" }) }}
                  render={({ name, value, onChange, ref }, inputState) => {
                    return (
                      <FormControlAutoComplete
                        className={"m-b-4"}
                        fullWidth
                        innerRef={ref}
                        label={intl.formatMessage({ id: "address" })}
                        value={value}
                        onChange={async (_, data) => {
                          if (data) {
                            const json = await dispatch(
                              fetchThunk(
                                API_PATHS.getDetailLocation(data.placeId)
                              )
                            );
                            onChange({
                              ...json?.body?.geometry?.location,
                              name: data.description,
                            });
                          } else {
                            onChange();
                          }
                        }}
                        loadOptions={async (str: string) => {
                          const json = await dispatch(
                            fetchThunk(API_PATHS.suggestLocation(str))
                          );
                          return json.body;
                        }}
                        getOptionLabel={(one: some) => {
                          return one.description;
                        }}
                        errorMessage={helperTextAddress}
                      />
                    );
                  }}
                />
              </Box>
              <IconButton
                onClick={() => {
                  remove(index);
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Box>
          );
        })}
      </Box>
      <Box className={"p-24 p-t-0"}>
        <Button
          variant="text"
          onClick={() => {
            append({});
          }}
          className="m-t-4 m-b-24 p-4"
          style={{ height: "unset" }}
        >
          <Typography color="primary">
            +&nbsp;
            <FormattedMessage id="profile.addMoreAddress" />
          </Typography>
        </Button>
        {errors.exampleRequired && <span>This field is required</span>}

        <Button
          type="submit"
          variant={"contained"}
          color={"primary"}
          fullWidth
          size={"large"}
        >
          <FormattedMessage id={"save"} />
        </Button>
      </Box>
    </form>
  );
};

export default EditProfileForm;
