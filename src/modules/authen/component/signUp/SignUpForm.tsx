import { Button, FormHelperText } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { MIN_PASSWORD_LENGTH } from '../../../../constants';
import { FreeTextField } from '../../../common/component/elements';
import { defaultSignUpData, ISignUp } from '../../model';

interface Props {
  onSubmit(data: ISignUp): void;
}

const SignUpForm = (props: Props) => {
  const { onSubmit } = props;
  const intl = useIntl();

  const {
    handleSubmit,
    formState: { errors },
    control,
    trigger,
    getValues,
  } = useForm<ISignUp>({
    reValidateMode: 'onChange',
    mode: 'onChange',
    defaultValues: defaultSignUpData,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        margin: '24px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Controller
        name="id"
        control={control}
        rules={{ required: intl.formatMessage({ id: 'required' }) }}
        render={({ field: { onChange, value, ref } }) => (
          <FreeTextField
            inputRef={ref}
            value={value}
            placeholder={intl.formatMessage({ id: 'phoneNumber' })}
            type="tel"
            startAdornmentIcon={<PhoneIphoneIcon style={{ width: '20px', height: '20px' }} />}
            onChange={onChange}
          />
        )}
      />

      <FormHelperText error>{errors?.id?.message || ' '}</FormHelperText>

      <Controller
        name="familyName"
        control={control}
        rules={{ required: intl.formatMessage({ id: 'required' }) }}
        render={({ field: { onChange, value, ref } }) => (
          <FreeTextField
            inputRef={ref}
            value={value}
            placeholder={intl.formatMessage({ id: 'familyName' })}
            startAdornmentIcon={<PersonIcon style={{ width: '20px', height: '20px' }} />}
            onChange={onChange}
          />
        )}
      />

      <FormHelperText error>{errors?.familyName?.message || ' '}</FormHelperText>

      <Controller
        name="givenName"
        control={control}
        rules={{ required: intl.formatMessage({ id: 'required' }) }}
        render={({ field: { onChange, value, ref } }) => (
          <FreeTextField
            inputRef={ref}
            value={value}
            placeholder={intl.formatMessage({ id: 'givenName' })}
            startAdornmentIcon={<PersonIcon style={{ width: '20px', height: '20px' }} />}
            onChange={onChange}
          />
        )}
      />

      <FormHelperText error>{errors?.givenName?.message || ' '}</FormHelperText>

      <Controller
        name="password"
        control={control}
        rules={{
          required: intl.formatMessage({ id: 'required' }),
          minLength: { value: MIN_PASSWORD_LENGTH, message: intl.formatMessage({ id: 'minPassWordValid' }) },
        }}
        render={({ field: { onChange, value, ref } }) => (
          <FreeTextField
            inputRef={ref}
            value={value}
            placeholder={intl.formatMessage({ id: 'password' })}
            type="password"
            startAdornmentIcon={<VpnKeyIcon style={{ width: '20px', height: '20px' }} />}
            onChange={(e) => {
              onChange(e);
              trigger(['confirmPassword', 'password']);
            }}
          />
        )}
      />

      <FormHelperText error>{errors?.password?.message || ' '}</FormHelperText>

      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: intl.formatMessage({ id: 'required' }),
          validate: (value) =>
            value === getValues('password') || intl.formatMessage({ id: 'auth.confirmPasswordNotMatch' }),
        }}
        render={({ field: { onChange, value, ref } }) => (
          <FreeTextField
            inputRef={ref}
            value={value}
            placeholder={intl.formatMessage({ id: 'repeatPassword' })}
            type="password"
            startAdornmentIcon={<VpnKeyIcon style={{ width: '20px', height: '20px' }} />}
            onChange={(e) => {
              onChange(e);
              trigger(['confirmPassword', 'password']);
            }}
          />
        )}
      />

      <FormHelperText error>{errors?.confirmPassword?.message || ' '}</FormHelperText>

      <Button
        style={{ marginTop: '12px', marginBottom: '12px' }}
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        type="submit"
      >
        <FormattedMessage id="continue" />
      </Button>
    </form>
  );
};

export default SignUpForm;
