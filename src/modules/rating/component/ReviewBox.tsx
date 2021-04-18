import { Box, Button, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { goBack } from "connected-react-router";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { PageWrapperNoScroll } from "../../common/component/elements";
import Header from "../../common/component/Header";
import { some } from "../../common/constants";

const listReview = [
  {
    title: "review.job",
    name: "rating",
  },
  {
    title: "review.price",
    name: "priceRating",
  },
  {
    title: "review.quality",
    name: "qualityRating",
  },
  {
    title: "review.attitude",
    name: "attitudeRating",
  },
];

interface Props {
  onSubmit?: (profile: some) => void;
}
const ReviewBox = (props: Props) => {
  const { onSubmit } = props;
  const intl = useIntl();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: listReview.reduce((current: some, value: some) => {
      return { ...current, [`${value.name}`]: 1 };
    }, {}) as some,
  });

  useEffect(() => {
    reset();
  }, [reset]);

  console.log("errors", errors);

  return (
    <PageWrapperNoScroll>
      <form onSubmit={handleSubmit((value) => onSubmit && onSubmit(value))}>
        <Header
          action={() => {
            dispatch(goBack());
          }}
          title={<FormattedMessage id="review.title" />}
          endAdornment={
            <Button
              variant="contained"
              color="primary"
              style={{ height: 36, borderRadius: 18 }}
              type="submit"
            >
              <FormattedMessage id="finish" />
            </Button>
          }
        />
        <Box className="overflow-auto p-24">
          {listReview.map((field: some, index: number) => {
            return (
              <Box key={index}>
                <Typography variant="body2">
                  <FormattedMessage id={field.title} />
                </Typography>
                <Controller
                  name={field.name}
                  control={control}
                  rules={{
                    required: intl.formatMessage({ id: "required" }),
                  }}
                  render={({ field: { onChange, value, name } }) => (
                    <Rating
                      className={"m-t-12 m-b-24"}
                      name={name}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                {errors?.[field.name]?.message}
              </Box>
            );
          })}
        </Box>
      </form>
    </PageWrapperNoScroll>
  );
};

export default ReviewBox;
