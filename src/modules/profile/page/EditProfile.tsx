import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PageWrapperNoScroll } from "../../common/component/elements";
import { some } from "../../common/constants";
import HeaderProfile from "../component/HeaderProfile";
import { fakeDataProfile } from "../constants";
import AvatarUpload from "../component/AvatarUpload";
import { Box, Button, ButtonBase, TextField } from "@material-ui/core";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import FormControlAutoComplete from "../../common/component/FormControlAutoComplete";
import { useDispatch } from "react-redux";
import { fetchThunk } from "../../common/redux/thunk";
import { API_PATHS } from "../../../configs/api";
import { AppState } from "../../../redux/reducer";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

interface Props {}

const EditProfile = (props: Props) => {
  const history = useHistory();
  const intl = useIntl();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { register, handleSubmit, watch, errors, control, getValues } = useForm(
    {
      reValidateMode: "onChange",
      mode: "onChange",
    }
  );

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "addresses",
    }
  );

  const onSubmit = (data) => console.log(data);

  const [profile, setProfileData] = useState<some>();

  const fetchProfile = useCallback(async () => {
    new Promise((resolve) => setTimeout(resolve, 3000));
    setProfileData(fakeDataProfile);
  }, []);

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("error", getValues(), errors);

  if (!profile) {
    return null;
  }
  return (
    <PageWrapperNoScroll>
      <HeaderProfile title={profile.name} action={() => history.goBack()} />
      <form onSubmit={handleSubmit(onSubmit)} className="overflow-auto">
        <Box className={"d-flex d-flex-column align-items-center p-24"}>
          <AvatarUpload />
          <Box width="100%">
            <TextField
              className={"m-b-16 m-t-24"}
              inputRef={register({
                required: intl.formatMessage({ id: "required" }),
              })}
              name="first_name"
              label={<FormattedMessage id={"firstName"} />}
              placeholder={intl.formatMessage({ id: "firstName_placeholder" })}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth={true}
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
            />

            {/* include validation with required or other standard HTML validation rules */}
            <TextField
              className={"m-b-16"}
              inputRef={register({
                required: intl.formatMessage({ id: "required" }),
              })}
              name="last_name"
              InputLabelProps={{
                shrink: true,
              }}
              label={<FormattedMessage id={"lastName"} />}
              placeholder={intl.formatMessage({ id: "lastName_placeholder" })}
              fullWidth={true}
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
            />
            {fields.map((item: some, index: number) => {
              const helperTextLocation =
                errors.addresses?.[index]?.location?.message;
              const helperTextAddress =
                errors.addresses?.[index]?.address?.message;

              return (
                <Box width="100%">
                  <TextField
                    className={"m-b-16"}
                    inputRef={register({
                      required: intl.formatMessage({ id: "required" }),
                    })}
                    name={`addresses[${index}].location`}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label={<FormattedMessage id={"location"} />}
                    placeholder={intl.formatMessage({
                      id: "location_placeholder",
                    })}
                    fullWidth={true}
                    error={!!helperTextLocation}
                    helperText={helperTextLocation}
                  />
                  <Controller
                    name={`addresses[${index}].address`}
                    control={control}
                    rules={{ required: intl.formatMessage({ id: "required" }) }}
                    render={({ name, value, onChange, ref }, inputState) => (
                      <FormControlAutoComplete
                        className={"m-b-16"}
                        fullWidth
                        innerRef={ref}
                        label={intl.formatMessage({ id: "address" })}
                        placeholder={intl.formatMessage({
                          id: "address_placeholder",
                        })}
                        value={value}
                        onChange={(_, data) => {
                          onChange(data);
                        }}
                        loadOptions={async (str: string) => {
                          const json = await dispatch(
                            fetchThunk(API_PATHS.suggestLocation(str))
                          );
                          return json.data?.locations?.concat(json.data.hotels);
                        }}
                        error={!!helperTextAddress}
                        helperText={helperTextAddress}
                      />
                    )}
                  />
                </Box>
              );
            })}

            <Button
              variant="text"
              onClick={() => {
                append({});
              }}
              className="m-t-4 m-b-24 p-4"
              style={{ height: "unset" }}
            >
              <FormattedMessage id="profile.addMoreAddress" />
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
        </Box>
      </form>
    </PageWrapperNoScroll>
  );
};

export default EditProfile;
