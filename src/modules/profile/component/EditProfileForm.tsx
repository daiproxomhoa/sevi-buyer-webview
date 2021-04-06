import { Box, Button, IconButton, Typography } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import React, { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { API_PATHS } from "../../../configs/api";
import { AppState } from "../../../redux/reducer";
import { FormControlTextField } from "../../common/component/Form";
import FormControlAutoComplete from "../../common/component/FormControlAutoComplete";
import { some } from "../../common/constants";
import { fetchThunk } from "../../common/redux/thunk";
import AvatarUpload from "./AvatarUpload";

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
      <input type="hidden" ref={register} name="id" />
      <Box className={"d-flex d-flex-column align-items-center p-24 p-b-0"}>
        <Controller
          name={"avatar"}
          control={control}
          rules={{ required: intl.formatMessage({ id: "required" }) }}
          render={({ value, onChange }) => (
            <AvatarUpload id={watch("id")} src={value} onChange={onChange} />
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
          const helperTextLocation = errors.addresses?.[index]?.name?.message;
          const helperTextAddress = errors.addresses?.[index]?.address?.message;
          return (
            <Box
              key={item.id}
              width="100%"
              className="d-flex align-items-center"
            >
              <Box className="flex-1">
                <Controller
                  name={`addresses[${index}].name`}
                  control={control}
                  rules={{ required: intl.formatMessage({ id: "required" }) }}
                  render={({ value, onChange, ref }) => {
                    return (
                      <FormControlTextField
                        className={"m-b-4"}
                        inputRef={ref}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        label={<FormattedMessage id={"locationName"} />}
                        fullWidth={true}
                        errorMessage={helperTextLocation}
                      />
                    );
                  }}
                />
                <Controller
                  name={`addresses[${index}].address`}
                  control={control}
                  rules={{
                    required: intl.formatMessage({ id: "required" }),
                  }}
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
                              formattedAddress: data.formattedAddress,
                            });
                          } else {
                            onChange();
                          }
                        }}
                        loadOptions={async (str: string) => {
                          const json = await dispatch(
                            fetchThunk(API_PATHS.suggestLocation(str))
                          );
                          return json.body?.map((address: some) => ({
                            formattedAddress: address.description,
                            placeId: address.placeId,
                          }));
                        }}
                        getOptionLabel={(address: some) => {
                          return address?.formattedAddress;
                        }}
                        getOptionSelected={(option: some, value: some) => {
                          return (
                            option?.formattedAddress === value?.formattedAddress
                          );
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
