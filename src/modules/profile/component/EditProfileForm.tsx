import { Box, Button, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { FormControlTextField } from '../../common/component/Form';
import { some } from '../../common/constants';
import AddressAutoCompleteFormControl from './AddressAutoCompleteFormControl';
import AvatarUpload from './AvatarUpload';

interface Props {
  profile: some;
  onSubmit?: (profile: some) => void;
}

const EditProfileForm = (props: Props) => {
  const { profile, onSubmit } = props;
  const intl = useIntl();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm<any>({
    reValidateMode: 'onChange',
    mode: 'onChange',
    defaultValues: profile,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addresses',
  });

  useEffect(() => {
    reset();
  }, [profile, reset]);

  return (
    <form onSubmit={onSubmit && handleSubmit(onSubmit)} className="overflow-auto">
      <input type="hidden" {...register('id')} />
      <Box className={'d-flex d-flex-column align-items-center p-24 p-b-0'}>
        <Controller
          name={'avatar'}
          control={control}
          rules={{ required: intl.formatMessage({ id: 'required' }) }}
          render={({ field: { onChange, value } }) => <AvatarUpload id={watch('id')} src={value} onChange={onChange} />}
        />
        <Box width="100%">
          <Controller
            name={'givenName'}
            control={control}
            rules={{ required: intl.formatMessage({ id: 'required' }) }}
            render={({ field: { onChange, value, ref, name } }) => (
              <FormControlTextField
                className={'m-b-4 m-t-24'}
                inputRef={ref}
                label={<FormattedMessage id={'givenName'} />}
                fullWidth={true}
                name={name}
                value={value}
                onChange={onChange}
                errorMessage={errors.givenName?.message}
              />
            )}
          />
          <Controller
            name={'familyName'}
            control={control}
            rules={{ required: intl.formatMessage({ id: 'required' }) }}
            render={({ field: { onChange, value, ref } }) => (
              <FormControlTextField
                className={'m-b-4'}
                inputRef={ref}
                label={<FormattedMessage id={'familyName'} />}
                fullWidth={true}
                value={value}
                onChange={onChange}
                errorMessage={errors.familyName?.message}
              />
            )}
          />
        </Box>
        {fields?.map((item: some, index: number) => {
          const helperTextLocation = errors.addresses?.[index]?.name?.message;
          const helperTextAddress = errors.addresses?.[index]?.address?.message;
          return (
            <AddressAutoCompleteFormControl
              key={item.id}
              index={index}
              helperTextAddress={helperTextAddress}
              helperTextLocation={helperTextLocation}
              control={control}
              remove={remove}
            />
          );
        })}
      </Box>
      <Box className={'p-24 p-t-0'}>
        <Button
          variant="text"
          onClick={() => {
            append({});
          }}
          className="m-t-4 m-b-24 p-4"
          style={{ height: 'unset' }}
        >
          <Typography color="primary">
            +&nbsp;
            <FormattedMessage id="profile.addMoreAddress" />
          </Typography>
        </Button>
        {errors.exampleRequired && <span>This field is required</span>}

        <Button type="submit" variant={'contained'} color={'primary'} fullWidth size={'large'}>
          <FormattedMessage id={'save'} />
        </Button>
      </Box>
    </form>
  );
};

export default EditProfileForm;
