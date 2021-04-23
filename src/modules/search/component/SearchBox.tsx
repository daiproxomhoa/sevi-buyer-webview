import {
  ButtonBase,
  CircularProgress,
  fade,
  Input,
  InputAdornment,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import TuneIcon from '@material-ui/icons/Tune';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { debounce } from 'lodash';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { BACKGROUND, BLACK } from '../../../configs/colors';
import { AppState } from '../../../redux/reducer';
import { HeaderDiv } from '../../common/component/elements';
import { WhiteIconButton } from '../../common/component/IconButton';
import { ISellerSearchFilter } from '../model';
import { searchKeyword } from '../redux/searchReducer';

const SearchInput = withStyles((theme: Theme) => ({
  root: {
    borderRadius: 500,
    position: 'relative',
    border: 'none',
    fontSize: theme.typography.body2.fontSize,
    backgroundColor: BACKGROUND,
  },
  input: {
    padding: '10px 8px',
  },
}))(Input);

interface Props {
  filter: ISellerSearchFilter;
  onSellerSearch(search: string): void;
  openFilter(): void;
}

const SearchBox = (props: Props) => {
  const { filter, onSellerSearch, openFilter } = props;
  const intl = useIntl();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [options, setOptions] = React.useState<string[]>([]);

  const [searchString, setSearchString] = React.useState(filter.string);
  const [loading, setLoading] = React.useState(false);

  const loadOptions = debounce(
    async (str: string) => {
      setLoading(true);
      const json = await dispatch(searchKeyword(str));
      setLoading(false);
      setOptions(json);
    },
    300,
    {
      trailing: true,
      leading: false,
    },
  );

  React.useEffect(() => {
    if (filter.string) {
      setSearchString(filter.string);
    }
  }, [filter.string]);

  return (
    <HeaderDiv style={{ display: 'flex' }}>
      <Autocomplete
        fullWidth
        freeSolo
        autoHighlight
        value={searchString}
        options={options}
        onChange={async (e, str: string | null) => {
          setSearchString(str || '');
          if (str) {
            onSellerSearch(str);
          }
        }}
        autoComplete={false}
        onInputChange={(event: object, value: string, reason: string) => loadOptions(value)}
        loading={loading}
        onMouseDownCapture={(e) => !searchString && e.stopPropagation()}
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
        filterOptions={(options) => options}
        noOptionsText={<FormattedMessage id="noOption" />}
        getOptionLabel={(value: string) => value}
        filterSelectedOptions={true}
        getOptionSelected={() => false}
        renderInput={({ InputProps, InputLabelProps, ...params }) => (
          <SearchInput
            {...params}
            ref={InputProps.ref}
            inputProps={params.inputProps}
            fullWidth
            placeholder={intl.formatMessage({ id: 'enterSearchInfo' })}
            disableUnderline
            startAdornment={
              <InputAdornment position="start" style={{ marginLeft: '16px', opacity: 0.6 }}>
                <SearchIcon style={{ width: '20px', height: '20px' }} />
              </InputAdornment>
            }
            endAdornment={
              <>
                {!!searchString && (
                  <InputAdornment position="end">
                    <ButtonBase
                      onClick={() => {
                        setSearchString('');
                      }}
                      style={{
                        borderRadius: '50%',
                        marginRight: '16px',
                        padding: '1px',
                        color: BACKGROUND,
                        backgroundColor: fade(BLACK, 0.34),
                      }}
                    >
                      <ClearIcon style={{ width: '15px', height: '15px' }} />
                    </ButtonBase>
                  </InputAdornment>
                )}
              </>
            }
          />
        )}
        renderOption={(option, { selected }) => (
          <Typography
            variant="body2"
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              flex: 1,
            }}
          >
            {option}
          </Typography>
        )}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginLeft: '12px',
        }}
      >
        <WhiteIconButton onClick={openFilter}>
          <TuneIcon style={{ width: '20px', height: '20px' }} />
        </WhiteIconButton>
      </div>
    </HeaderDiv>
  );
};

export default SearchBox;
