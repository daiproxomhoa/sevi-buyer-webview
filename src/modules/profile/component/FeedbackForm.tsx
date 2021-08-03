import { Box, Button, Typography } from '@material-ui/core';
import { goBack } from 'connected-react-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { FormControlTextField } from '../../common/component/Form';
import { some } from '../../common/constants';

interface Props {
  onSubmit?: (profile: some) => void;
}

const FeedbackForm = (props: Props) => {
  const { onSubmit } = props;
  const intl = useIntl();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    reValidateMode: 'onChange',
  });

  return (
    <form onSubmit={onSubmit && handleSubmit(onSubmit)} className="overflow-auto">
      <input type="hidden" {...register('id')} />
      <Box className={'d-flex d-flex-column align-items-center p-24'}>
        <Controller
          name={'feedback'}
          control={control}
          rules={{
            required: intl.formatMessage({ id: 'required' }),
          }}
          render={({ field: { onChange, value, ref, name } }) => (
            <FormControlTextField
              className={'m-b-4'}
              inputRef={ref}
              label={<FormattedMessage id={'profile.feedbackContent'} />}
              fullWidth={true}
              name={name}
              value={value}
              onChange={onChange}
              errorMessage={errors[name]?.message}
              multiline
              rows={4}
            />
          )}
        />
        <Button className="m-t-8" type="submit" variant={'contained'} color={'primary'} fullWidth size={'large'}>
          <FormattedMessage id={'send'} />
        </Button>
        <Button
          className="m-t-8"
          variant={'text'}
          color={'inherit'}
          fullWidth
          size={'large'}
          onClick={() => {
            dispatch(goBack());
          }}
          disableRipple
        >
          <Typography color="textSecondary">
            <FormattedMessage id={'cancel'} />
          </Typography>
        </Button>
      </Box>
    </form>
  );
};

export default FeedbackForm;
