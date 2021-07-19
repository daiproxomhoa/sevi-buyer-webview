import { Box, IconButton, InputAdornment, InputBase } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../configs/api';
import { DARK_RED } from '../../../configs/colors';
import { AppState } from '../../../redux/reducer';
import FormControlAutoComplete from '../../common/component/FormControlAutoComplete';
import { some } from '../../common/constants';
import { fetchThunk } from '../../common/redux/thunk';
import { IAddresses } from '../model';

interface Props {
  index: number;
  control: Control<{ addresses: IAddresses[] }>;
  helperTextLocation?: string;
  helperTextAddress?: string;
  remove: (index?: number | number[]) => void;
}

const AddressAutoCompleteFormControl = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const { index, control, helperTextLocation, helperTextAddress, remove } = props;

  const intl = useIntl();

  return (
    <Box width="100%" className="d-flex align-items-center">
      <Box className="flex-1">
        <Controller
          name={`addresses.${index}.name` as const}
          control={control}
          rules={{ required: intl.formatMessage({ id: 'required' }) }}
          render={({ field: { onChange, value, ref } }) => {
            return (
              <InputBase
                className={'m-b-4'}
                inputRef={ref}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={intl.formatMessage({ id: 'locationName' })}
                fullWidth={true}
                error={!!helperTextLocation}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        remove(index);
                      }}
                      style={{ padding: 4 }}
                    >
                      <DeleteForeverIcon style={{ color: DARK_RED }} />
                    </IconButton>
                  </InputAdornment>
                }
              />
            );
          }}
        />
        <Controller
          name={`addresses.${index}.address` as const}
          control={control}
          rules={{
            required: intl.formatMessage({ id: 'required' }),
          }}
          render={({ field: { onChange, value, ref } }) => {
            return (
              <FormControlAutoComplete
                className={'m-b-4'}
                fullWidth
                innerRef={ref}
                placeholder={intl.formatMessage({ id: 'address' })}
                value={value}
                onChange={async (_, data) => {
                  if (data) {
                    const json = await dispatch(fetchThunk(API_PATHS.getDetailLocation(data.placeId)));
                    onChange({
                      ...json?.body?.geometry?.location,
                      formattedAddress: data.formattedAddress,
                    });
                  } else {
                    onChange();
                  }
                }}
                loadOptions={async (str: string) => {
                  const json = await dispatch(fetchThunk(API_PATHS.suggestLocation(str)));
                  return json.body?.map((address: some) => ({
                    formattedAddress: address.description,
                    placeId: address.placeId,
                  }));
                }}
                getOptionLabel={(address: some) => {
                  return address?.formattedAddress;
                }}
                getOptionSelected={(option: some, value: some) => {
                  return option?.formattedAddress === value?.formattedAddress;
                }}
                errorMessage={helperTextAddress}
                InputProps={{ rowsMax: 2, multiline: true }}
              />
            );
          }}
        />
      </Box>
    </Box>
  );
};

export default AddressAutoCompleteFormControl;
