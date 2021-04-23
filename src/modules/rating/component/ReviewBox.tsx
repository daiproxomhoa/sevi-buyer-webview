import { Box, Button, FormHelperText, Typography } from '@material-ui/core';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import StarIcon from '@material-ui/icons/Star';
import { Rating } from '@material-ui/lab';
import { goBack } from 'connected-react-router';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { PageWrapper } from '../../common/component/elements';
import { FormControlTextField } from '../../common/component/Form';
import Header from '../../common/component/Header';
import { some } from '../../common/constants';

const customIcons = (value?: number) => {
  return {
    1: {
      icon: <ErrorOutlineOutlinedIcon color={value === 0 ? 'error' : 'disabled'} className="m-r-8" />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <StarIcon />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <StarIcon />,
      label: 'Neutral',
    },
    4: {
      icon: <StarIcon />,
      label: 'Satisfied',
    },
    5: {
      icon: <StarIcon />,
      label: 'Very Satisfied',
    },
    6: {
      icon: <StarIcon />,
      label: 'Excellent',
    },
  };
};

const listReview = [
  {
    title: 'review.job',
    name: 'rating',
  },
  {
    title: 'review.price',
    name: 'priceRating',
  },
  {
    title: 'review.quality',
    name: 'qualityRating',
  },
  {
    title: 'review.attitude',
    name: 'attitudeRating',
  },
];
function IconContainer(props, val) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons(val)[value].icon}</span>;
}

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
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    reset();
  }, [reset]);

  console.log('errors', errors);

  return (
    <PageWrapper>
      <form
        onSubmit={handleSubmit((value: some) => {
          onSubmit && onSubmit(value);
        })}
      >
        <Header
          action={() => {
            dispatch(goBack());
          }}
          title={<FormattedMessage id="review.title" />}
          endAdornment={
            <Button variant="contained" color="primary" style={{ height: 36, borderRadius: 18 }} type="submit">
              <FormattedMessage id="review.finish" />
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
                    required: field.name === 'rating' ? intl.formatMessage({ id: 'rating.REQUIRED' }) : false,
                  }}
                  render={({ field: { onChange, value, name } }) => (
                    <>
                      {name === 'rating' ? (
                        <>
                          <Box className={'d-flex align-items-center m-t-12'}>
                            <Rating
                              name={name}
                              onChange={(e, value) => {
                                onChange(value ? value - 1 : value);
                              }}
                              value={value + 1}
                              getLabelText={(value) => customIcons()[value].label}
                              IconContainerComponent={(rest) => IconContainer(rest, value)}
                              max={6}
                            />
                            <Typography className="m-l-24" component="span" variant={'body1'} color="primary">
                              {value}
                            </Typography>
                          </Box>
                          <FormHelperText style={{ minHeight: 20, marginBottom: 2 }} error>
                            {errors?.[field.name]?.message}
                          </FormHelperText>
                        </>
                      ) : (
                        <Rating
                          className={'m-t-12 m-b-24'}
                          name={name}
                          onChange={(e, value) => {
                            onChange(value);
                          }}
                          value={value}
                        />
                      )}
                    </>
                  )}
                />
              </Box>
            );
          })}
          <Controller
            name={'content'}
            control={control}
            rules={{
              required: intl.formatMessage({ id: 'review.comment_required' }),
            }}
            render={({ field: { onChange, value, ref, name } }) => (
              <FormControlTextField
                className={'m-b-4'}
                inputRef={ref}
                fullWidth={true}
                name={name}
                label={intl.formatMessage({ id: 'review.comment' })}
                value={value}
                onChange={onChange}
                multiline
                rowsMax={5}
                errorMessage={errors?.[name]?.message}
              />
            )}
          />
        </Box>
      </form>
    </PageWrapper>
  );
};

export default ReviewBox;
