import { CircularProgress, ListItem, makeStyles, OutlinedInputProps, TextField, Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { Autocomplete, AutocompleteProps, AutocompleteRenderInputParams } from '@material-ui/lab';
import { debounce, isEqual } from 'lodash';
import React, { Ref, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { BLUE } from '../../../configs/colors';
import { some } from '../constants';

const autocompleteCS = makeStyles(() => ({
  endAdornment: {
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
  },
  option: {
    padding: 0,
  },
  paper: {
    padding: 2,
  },
}));

export interface FormControlAutoCompletePropsBase<T> {
  id?: string;
  label?: React.ReactNode;
  formControlStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  errorMessage?: string;
  placeholder?: string;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
  required?: boolean;
  loadOptions?: (input: string) => Promise<T[]>;
  onChangeInput?: any;
  options?: T[];
  firstLoadString?: string;
  InputProps?: OutlinedInputProps;
}

export interface FormControlAutoCompleteProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> extends Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput' | 'options'>,
    FormControlAutoCompletePropsBase<T> {
  innerRef?: Ref<any>;
}

function usePrevious(value: any) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const FormControlAutoComplete: <
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(
  prop: FormControlAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>,
) => React.ReactElement<FormControlAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>> = (props) => {
  const classesComplete = autocompleteCS(props);
  const {
    id,
    label,
    placeholder,
    formControlStyle,
    required,
    renderInput,
    options = [],
    loadOptions,
    getOptionLabel,
    labelStyle,
    innerRef,
    onChangeInput,
    errorMessage,
    firstLoadString,
    getOptionSelected,
    InputProps,
    ...rest
  } = props;

  const [firstOption, setFirstOption] = useState<typeof options>(options);
  const [optionsTmp, setOption] = useState<typeof options>(options);
  const previous = usePrevious(optionsTmp);
  const [loading, setLoading] = useState<boolean>(false);

  const onLoadOptions = debounce(
    async (input: string) => {
      if (loadOptions) {
        if (input) {
          setLoading(true);
          const data = await loadOptions(input);
          setLoading(false);
          if (data && data.length > 0) {
            setOption(data);
            return;
          }
        }
        setOption(firstOption);
      }
    },
    500,
    {
      trailing: true,
      leading: false,
    },
  );

  const onFirstLoadOptions = debounce(
    async () => {
      if (loadOptions && typeof firstLoadString === 'string') {
        const data = await loadOptions(firstLoadString);
        if (data && data.length > 0) {
          setOption(data);
          setFirstOption(data);
        }
      }
    },
    500,
    {
      trailing: true,
      leading: false,
    },
  );

  React.useEffect(() => {
    if (loadOptions && options.length === 0) {
      onFirstLoadOptions();
    } else {
      setOption(options);
    }
  }, [firstLoadString, loadOptions, onFirstLoadOptions, options]);

  React.useEffect(() => {
    if (!loadOptions && previous !== options) {
      setOption(options);
    }
  }, [loadOptions, options, previous]);

  return (
    <Autocomplete
      id={id}
      classes={{
        endAdornment: classesComplete.endAdornment,
        option: classesComplete.option,
        paper: classesComplete.paper,
      }}
      size="small"
      options={optionsTmp}
      onInputChange={(event: object, value: string, reason: string) => {
        reason === 'input' && loadOptions && onLoadOptions(value);
        (reason === 'clear' || value === '') && loadOptions && setOption(options.length ? options : firstOption);
      }}
      onMouseDownCapture={(e) => e.stopPropagation()}
      noOptionsText={<FormattedMessage id="noOption" />}
      loadingText={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FormattedMessage id="search.loading" />
          &nbsp;
          <CircularProgress color="inherit" size={16} />
        </div>
      }
      loading={loading}
      renderInput={
        renderInput ||
        ((params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'off',
              style: { padding: '6px 0px' },
            }}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              ...InputProps,
              ...params.InputProps,
              inputRef: innerRef,
              startAdornment: (
                <>
                  {InputProps?.startAdornment}
                  {params.InputProps.startAdornment}
                </>
              ),
              endAdornment: (
                <>
                  {params.InputProps.endAdornment}
                  {InputProps?.endAdornment}
                </>
              ),
            }}
            label={label}
            onChange={onChangeInput}
            error={!!errorMessage}
            helperText={errorMessage || ' '}
          />
        ))
      }
      getOptionLabel={(option: any) => (getOptionLabel ? getOptionLabel(option) : option.label)}
      getOptionSelected={(option, value) =>
        getOptionSelected ? getOptionSelected(option, value) : isEqual(option, value)
      }
      renderOption={(option, { selected }) => (
        <ListItem
          key={getOptionLabel && getOptionLabel(option)}
          role={undefined}
          dense
          button
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            minHeight: 48,
          }}
        >
          <Typography
            variant="body2"
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              flex: 1,
            }}
          >
            {getOptionLabel ? getOptionLabel(option) : (option as some).label}
          </Typography>
          <DoneIcon
            style={{
              opacity: 0.6,
              width: 18,
              height: 18,
              visibility: selected ? 'visible' : 'hidden',
              color: BLUE,
              justifySelf: 'flex-end',
            }}
          />
        </ListItem>
      )}
      autoComplete
      {...(loadOptions && {
        filterOptions: (options) => options,
      })}
      {...rest}
    />
  );
};

export default FormControlAutoComplete;
