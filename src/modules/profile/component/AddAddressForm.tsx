import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { some } from '../../common/constants';
import { defaultAddress, IAddresses } from '../model';
import AddressAutoCompleteFormControl from './AddressAutoCompleteFormControl';

interface Props {
  onSubmit: (values: IAddresses[]) => void;
}

const AddAddressForm = (props: Props) => {
  const { onSubmit } = props;

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<{ addresses: IAddresses[] }>({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addresses',
  });

  React.useEffect(() => {
    append(defaultAddress);
  }, [append]);

  return (
    <form onSubmit={handleSubmit((values) => onSubmit(values.addresses))} style={{ padding: '0 24px' }}>
      {fields.map((item: some, index: number) => {
        const helperTextLocation = errors.addresses?.[index]?.name?.message;
        const helperTextAddress = errors.addresses?.[index]?.['address']?.['message'];

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
      <Button type="submit" variant={'contained'} color={'primary'} fullWidth size={'large'}>
        <FormattedMessage id={'save'} />
      </Button>
    </form>
  );
};

export default AddAddressForm;
